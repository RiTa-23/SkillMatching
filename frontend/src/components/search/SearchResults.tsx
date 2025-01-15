"use client";

import React from "react";

interface SearchResultsProps {
    results: Array<{
        user_id: string;
        name: string;
    }>;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
    return (
        <div className="mt-8 w-full max-w-md">
            <h2 className="text-xl mb-4">検索結果</h2>
            <ul className="space-y-2">
                {results.map((user) => (
                    <li key={user.user_id} className="p-2 border rounded">
                        <strong>{user.name}</strong>
                        <p>User ID: {user.user_id}</p> {/* ユーザーIDを表示 */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchResults;
