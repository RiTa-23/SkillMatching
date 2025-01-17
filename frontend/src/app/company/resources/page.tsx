"use client";

import React, { useState, useEffect } from "react";
import SearchForm from "@/components/search/SearchForm";
import Link from "next/link";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Resource {
  id: number;
  name: string;
  language: string;
  proficiency: string;
  communication: string;
  problemSolving: string;
}

interface Filters {
  language: string | null;
  proficiency: [number, number] | null;
  communication: [number, number] | null;
  problemSolving: [number, number] | null;
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

const Page = () => {
  const [filters, setFilters] = useState<Filters>({
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
      (!filters.proficiency ||
        (levels.indexOf(item.proficiency) >= filters.proficiency[0] &&
          levels.indexOf(item.proficiency) <= filters.proficiency[1])) &&
      (!filters.communication ||
        (parseInt(item.communication) >= filters.communication[0] &&
          parseInt(item.communication) <= filters.communication[1])) &&
      (!filters.problemSolving ||
        (parseInt(item.problemSolving) >= filters.problemSolving[0] &&
          parseInt(item.problemSolving) <= filters.problemSolving[1]))
    );
  });

  // ページネーション
  const paginatedData = filteredData.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage
  );

  const handleSearch = (filters: Filters) => {
    setFilters(filters);
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col items-center">
      <Card className="w-[80%] max-w-[800px] p-6 mt-6">
        <CardTitle>人材検索</CardTitle>
        <br></br>
        <CardContent className="flex items-center justify-center">
          <SearchForm onSearch={handleSearch} />
        </CardContent>
      </Card>

      <div className="w-[80%] max-w-[800px] mt-6">
        {paginatedData.map((resource) => (
          <Link key={resource.id} href={`/company/resources/${resource.id}`}>
            <Card className="cursor-pointer hover:shadow-lg transition duration-300 p-4 mb-4">
              <CardContent>
                <h6>{resource.name}</h6>
                <p>{resource.language}</p>
                <p>熟練度: {resource.proficiency}</p>
                <p>コミュニケーション: {resource.communication}</p>
                <p>問題解決: {resource.problemSolving}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      <div className="flex justify-between items-center mt-4">
        <Button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          前へ
        </Button>
        <span>
          {currentPage} / {Math.ceil(filteredData.length / resultsPerPage)}
        </span>
        <Button
          disabled={
            currentPage === Math.ceil(filteredData.length / resultsPerPage)
          }
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          次へ
        </Button>
      </div>
    </div>
  );
};

export default Page;
