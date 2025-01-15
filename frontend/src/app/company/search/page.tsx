"use client";

import React, { useState } from "react";
import SearchForm from "@/components/search/SearchForm";
import SearchResults from "@/components/search/SearchResults";
import fetcher from "@/lib/fetcher";

interface User {
    user_id: string;
    name: string;
    language_name: string;
    language_level: number;
    category_name: string;
    category_level: number;
}

const SearchPage = () => {
    const [results, setResults] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async (filters: {
        languageId: string;
        languageLevelMin: string;
        languageLevelMax: string;
        categoryId: string;
        categoryLevelMin: string;
        categoryLevelMax: string;
    }) => {
        setLoading(true);
        setError(null);
        try {
            const queryParams = new URLSearchParams();

            if (filters.languageId) queryParams.append("language_id", filters.languageId);
            if (filters.languageLevelMin) queryParams.append("language_level_min", filters.languageLevelMin);
            if (filters.languageLevelMax) queryParams.append("language_level_max", filters.languageLevelMax);
            if (filters.categoryId) queryParams.append("category_id", filters.categoryId);
            if (filters.categoryLevelMin) queryParams.append("category_level_min", filters.categoryLevelMin);
            if (filters.categoryLevelMax) queryParams.append("category_level_max", filters.categoryLevelMax);

            const { data, error } = await fetcher<any[]>({
                url: `search?${queryParams.toString()}`,
                method: "GET",
            });

            if (data) {
                // 重複削除処理を追加
                const uniqueResults = Array.from(new Set(data.map(item => item.user_id)))
                    .map(id => data.find(item => item.user_id === id));

                // 整形して状態を更新
                setResults(
                    uniqueResults.map(item => ({
                        user_id: item!.user_id,
                        name: item!.name,
                        language_name: item!.language_name,
                        language_level: item!.language_level,
                        category_name: item!.category_name,
                        category_level: item!.category_level,
                    }))
                );
            } else {
                throw new Error("データが見つかりませんでした");
            }
        } catch (err: any) {
            console.error("検索中にエラーが発生しました:", err);
            setError(err.message || "検索に失敗しました");
            setResults([]);
        } finally {
            setLoading(false);
        }
    };




    return (
        <div className="flex flex-col justify-center items-center h-[90vh]">
            <h1 className="text-2xl mb-4">ユーザー検索</h1>
            <SearchForm onSearch={handleSearch} />
            {loading && <p className="text-blue-500">Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <SearchResults results={results} />
        </div>
    );
};

export default SearchPage;
