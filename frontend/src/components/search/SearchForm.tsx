"use client";

import React, { useState, useEffect } from "react";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import fetcher from "@/lib/fetcher"; // fetcher のインポート

interface Language {
    language_id: number;
    language_name: string;
}

interface SearchFormProps {
    onSearch: (filters: { languageId: string; level: string }) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
    const [languages, setLanguages] = useState<Language[]>([]);
    const [languageId, setLanguageId] = useState<string>("");
    const [level, setLevel] = useState("");

    useEffect(() => {
        // APIからlanguagesを取得
        const fetchLanguages = async () => {
            const { data, error } = await fetcher<Language[]>({
                url: "language", // エンドポイントURL
                method: "GET",
            });

            if (data) {
                setLanguages(data);
            }

            if (error) {
                console.error("Error fetching languages:", error);
            }
        };

        fetchLanguages();
    }, []);

    const handleSubmit = () => {
        onSearch({ languageId, level });
        console.log(languageId, level);
    };

    return (
        <div className="flex flex-col space-y-4 w-full max-w-md">
            {/* 言語選択 */}
            <Select onValueChange={(value) => setLanguageId(value)}>
                <SelectTrigger>
                    <span>
                        {languages.find((lang) => lang.language_id.toString() === languageId)?.language_name ||
                            "言語を選択"}
                    </span>
                </SelectTrigger>
                <SelectContent>
                    {languages.map((language) => (
                        <SelectItem key={language.language_id} value={language.language_id.toString()}>
                            {language.language_name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* レベル入力 */}
            <input
                type="number"
                placeholder="Level (1-5)"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="border p-2 rounded"
            />

            <Button onClick={handleSubmit}>検索</Button>
        </div>
    );
};

export default SearchForm;
