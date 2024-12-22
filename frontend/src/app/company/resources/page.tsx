"use client";

import React, { useState, useEffect } from "react";
import SearchForm from "@/components/search/SearchForm";

interface Resource {
  id: number;
  name: string;
  language: string;
  proficiency: string;
  communication: string;
  problemSolving: string;
}

const languages = ["JavaScript", "Python", "Java", "C++", "Ruby"];
const levels = ["初学者", "初級", "中級", "上級", "プロ"];
const ratings = ["1", "2", "3", "4", "5"];

// モックデータをランダムに生成する関数
const generateMockData = (count: number): Resource[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `エンジニア ${index + 1}`,
    language: languages[Math.floor(Math.random() * languages.length)],
    proficiency: levels[Math.floor(Math.random() * levels.length)],
    communication: ratings[Math.floor(Math.random() * ratings.length)],
    problemSolving: ratings[Math.floor(Math.random() * ratings.length)],
  }));
};

const ResourcesSearch: React.FC = () => {
  const [filters, setFilters] = useState({
    language: null,
    proficiency: null,
    communication: null,
    problemSolving: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [mockData, setMockData] = useState<Resource[]>([]);

  const resultsPerPage = 50;

  // 初回レンダリング時にモックデータを生成
  useEffect(() => {
    setMockData(generateMockData(200));
  }, []);

  // フィルタリングロジック
  const filteredData = mockData.filter((item) => {
    return (
      (!filters.language || item.language === filters.language) &&
      (!filters.proficiency || item.proficiency === filters.proficiency) &&
      (!filters.communication || item.communication === filters.communication) &&
      (!filters.problemSolving || item.problemSolving === filters.problemSolving)
    );
  });

  // ページネーション
  const paginatedData = filteredData.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage
  );

  const handleSearch = (filters: typeof filters) => {
    setFilters(filters);
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">人材検索</h1>
      <SearchForm onSearch={handleSearch} />
      <div className="mt-6">
        {paginatedData.map((resource) => (
          <div key={resource.id} className="p-2 border-b">
            {resource.name} - {resource.language} - 熟練度: {resource.proficiency} -
            コミュニケーション: {resource.communication} - 問題解決: {resource.problemSolving}
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          前へ
        </button>
        <span>
          {currentPage} / {Math.ceil(filteredData.length / resultsPerPage)}
        </span>
        <button
          disabled={currentPage === Math.ceil(filteredData.length / resultsPerPage)}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(filteredData.length / resultsPerPage)))}
        >
          次へ
        </button>
      </div>
    </div>
  );
};

export default ResourcesSearch;
