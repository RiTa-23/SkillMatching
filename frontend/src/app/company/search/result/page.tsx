"use client";

import React, { useEffect, useState } from "react";

interface User {
    user_id: string;
    name: string;
    language_name: string;
    language_level: number;
    category_name: string;
    category_level: number;
}

const SearchResultsPage = () => {
    const [results, setResults] = useState<User[]>([]);

    useEffect(() => {
        // クエリパラメータから検索結果を取得
        const searchParams = new URLSearchParams(window.location.search);
        const resultsParam = searchParams.get("results");

        if (resultsParam) {
            try {
                const parsedResults = JSON.parse(resultsParam) as User[];
                setResults(parsedResults);
            } catch (error) {
                console.error("結果のパース中にエラーが発生しました:", error);
            }
        }
    }, []);

    return (
        <div className="flex flex-col justify-center items-center h-[90vh]">
            <h1 className="text-2xl mb-4">検索結果</h1>
            {results.length === 0 ? (
                <p>検索結果がありません。</p>
            ) : (
                <ul className="w-full max-w-md">
                    {results.map(user => (
                        <li key={user.user_id} className="p-2 border rounded mb-2">
                            <strong>{user.name}</strong>
                            <p>User ID: {user.user_id}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchResultsPage;
