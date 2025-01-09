"use client";

import React, { useState } from "react";
import SearchForm from "@/components/search/SearchForm";
import SearchResults from "@/components/search/SearchResults";
import fetcher from "@/lib/fetcher";

interface User {
    user_id: string;
    name: string;
    language_name: string;
    level: number;
}

const SearchPage = () => {
    const [results, setResults] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (filters: { languageId: string; level: string }) => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams({
                language_id: filters.languageId,
                level: filters.level,
            });

            const { data, error } = await fetcher<User[]>({
                url: `search?${queryParams.toString()}`,
                method: "GET",
            });

            if (data) {
                console.log("検索成功: 以下のデータを取得しました", data); // 成功時のログ
                setResults(Array.isArray(data) ? data : []); // 配列かどうか確認
            } else {
                console.error("No data found:", error);
                setResults([]);
            }
        } catch (err) {
            console.error("検索中にエラーが発生しました:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-[90vh]">
            <h1 className="text-2xl mb-4">ユーザー検索</h1>
            <SearchForm onSearch={handleSearch} />
            {loading && <p>Loading...</p>}
            <SearchResults results={results} />
        </div>
    );
};

export default SearchPage;
