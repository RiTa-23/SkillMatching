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
        languageLevel: string;
        categoryId: string;
        categoryLevel: string;
    }) => {
        setLoading(true);
        setError(null);
        try {
            const queryParams = new URLSearchParams();

            if (filters.languageId) queryParams.append("language_id", filters.languageId);
            if (filters.languageLevel) queryParams.append("language_level", filters.languageLevel);
            if (filters.categoryId) queryParams.append("category_id", filters.categoryId);
            if (filters.categoryLevel) queryParams.append("category_level", filters.categoryLevel);

            const { data, error } = await fetcher<any[]>({
                url: `search?${queryParams.toString()}`,
                method: "GET",
            });

            if (data) {
                console.log("検索成功: 以下のデータを取得しました", data);

                // レスポンスを User 型に整形
                const processedData: User[] = data.map(item => ({
                    user_id: item.user_id,
                    name: item.name,
                    language_name: item.language_name,
                    language_level: item.language_level || 0, // language_levelが0やundefinedの場合は0を使う
                    category_name: item.category_name,
                    category_level: item.category_level || 0, // category_levelが0やundefinedの場合は0を使う
                }));

                setResults(processedData);
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
