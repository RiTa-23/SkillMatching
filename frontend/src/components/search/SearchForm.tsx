"use client";

import React, { useState, useEffect } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import fetcher from "@/lib/fetcher";

interface Language {
  language_id: number;
  language_name: string;
}

interface Category {
  category_id: number;
  category_name: string;
}

interface SearchFormProps {
  onSearch: (filters: {
    languageId: string;
    languageLevelMin: string;
    languageLevelMax: string;
    categoryId: string;
    categoryLevelMin: string;
    categoryLevelMax: string;
  }) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [languageId, setLanguageId] = useState<string>("");
  const [languageLevelMin, setLanguageLevelMin] = useState<string>("");
  const [languageLevelMax, setLanguageLevelMax] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [categoryLevelMin, setCategoryLevelMin] = useState<string>("");
  const [categoryLevelMax, setCategoryLevelMax] = useState<string>("");

  useEffect(() => {
    const fetchLanguages = async () => {
      const { data, error } = await fetcher<Language[]>({
        url: "language",
        method: "GET",
      });
      if (data) setLanguages(data);
      if (error) console.error("Error fetching languages:", error);
    };
    const fetchCategories = async () => {
      const { data, error } = await fetcher<Category[]>({
        url: "category",
        method: "GET",
      });
      if (data) setCategories(data);
      if (error) console.error("Error fetching categories:", error);
    };
    fetchLanguages();
    fetchCategories();
  }, []);

  const handleSubmit = () => {
    onSearch({
      languageId,
      languageLevelMin,
      languageLevelMax,
      categoryId,
      categoryLevelMin,
      categoryLevelMax,
    });
  };

  return (
    <div className="flex flex-col space-y-4 w-full max-w-md">
      {/* 技術選択 */}
      <Select onValueChange={(value) => setLanguageId(value)}>
        <SelectTrigger>
          <span>
            {languages.find(
              (lang) => lang.language_id.toString() === languageId
            )?.language_name || "技術を選択"}
          </span>
        </SelectTrigger>
        <SelectContent>
          {languages.map((language) => (
            <SelectItem
              key={language.language_id}
              value={language.language_id.toString()}
            >
              {language.language_name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* 技術レベルの範囲入力 */}
      <div className="flex space-x-2">
        <input
          type="number"
          placeholder="技術レベル最小値 (1-5)"
          value={languageLevelMin}
          onChange={(e) => setLanguageLevelMin(e.target.value)}
          className="border p-2 rounded w-1/2"
        />
        <input
          type="number"
          placeholder="技術レベル最大値 (1-5)"
          value={languageLevelMax}
          onChange={(e) => setLanguageLevelMax(e.target.value)}
          className="border p-2 rounded w-1/2"
        />
      </div>

      {/* カテゴリー選択 */}
      <Select onValueChange={(value) => setCategoryId(value)}>
        <SelectTrigger>
          <span>
            {categories.find((cat) => cat.category_id.toString() === categoryId)
              ?.category_name || "カテゴリーを選択"}
          </span>
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem
              key={category.category_id}
              value={category.category_id.toString()}
            >
              {category.category_name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* カテゴリーレベルの範囲入力 */}
      <div className="flex space-x-2">
        <input
          type="number"
          placeholder="カテゴリーレベル最小値 (1-5)"
          value={categoryLevelMin}
          onChange={(e) => setCategoryLevelMin(e.target.value)}
          className="border p-2 rounded w-1/2"
        />
        <input
          type="number"
          placeholder="カテゴリーレベル最大値 (1-5)"
          value={categoryLevelMax}
          onChange={(e) => setCategoryLevelMax(e.target.value)}
          className="border p-2 rounded w-1/2"
        />
      </div>

      <Button onClick={handleSubmit}>検索</Button>
    </div>
  );
};

export default SearchForm;
