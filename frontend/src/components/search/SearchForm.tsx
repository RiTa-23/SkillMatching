"use client";

import React, { useState } from "react";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";

const languages = ["未選択", "JavaScript", "Python", "Java", "C++", "Ruby"];
const ratings = ["未選択", "1", "2", "3", "4", "5"];

interface SearchFormProps {
    onSearch: (filters: {
        language: string | null;
        proficiency: string | null;
        communication: string | null;
        problemSolving: string | null;
    }) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
    const [language, setLanguage] = useState<string | null>("未選択");
    const [proficiency, setProficiency] = useState<string | null>("未選択");
    const [communication, setCommunication] = useState<string | null>("未選択");
    const [problemSolving, setProblemSolving] = useState<string | null>("未選択");

    const handleSubmit = () => {
        onSearch({
            language: language === "未選択" ? null : language,
            proficiency: proficiency === "未選択" ? null : proficiency,
            communication: communication === "未選択" ? null : communication,
            problemSolving: problemSolving === "未選択" ? null : problemSolving,
        });
    };

    return (
        <div className="p-4 border rounded-lg shadow">
            <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">使用言語</label>
                <Select onValueChange={(value) => setLanguage(value)}>
                    <SelectTrigger>{language || "未選択"}</SelectTrigger>
                    <SelectContent>
                        {languages.map((option, index) => (
                            <SelectItem key={index} value={option}>
                                {option}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">熟練度</label>
                <Select onValueChange={(value) => setProficiency(value)}>
                    <SelectTrigger>{proficiency || "未選択"}</SelectTrigger>
                    <SelectContent>
                        {ratings.map((option, index) => (
                            <SelectItem key={index} value={option}>
                                {option}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">コミュニケーション能力</label>
                <Select onValueChange={(value) => setCommunication(value)}>
                    <SelectTrigger>{communication || "未選択"}</SelectTrigger>
                    <SelectContent>
                        {ratings.map((option, index) => (
                            <SelectItem key={index} value={option}>
                                {option}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">問題解決能力</label>
                <Select onValueChange={(value) => setProblemSolving(value)}>
                    <SelectTrigger>{problemSolving || "未選択"}</SelectTrigger>
                    <SelectContent>
                        {ratings.map((option, index) => (
                            <SelectItem key={index} value={option}>
                                {option}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                onClick={handleSubmit}
            >
                検索
            </button>
        </div>
    );
};

export default SearchForm;
