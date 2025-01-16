"use client";

import { useEffect, useState } from "react";
import fetcher from "@/lib/fetcher";
import Link from "next/link";

// 型定義
type Question = {
  question_id: number;
  company_id: number;
  question_text: string;
};

type Company = {
  company_id: number;
  company_name: string;
};

const QuestionsList = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]); // 会社のリスト
  const [selectedCompany, setSelectedCompany] = useState<number | null>(null); // 選択された会社ID

  useEffect(() => {
    // 質問データと会社データの取得
    const fetchData = async () => {
      try {
        // 会社リストの取得
        const companiesRes = await fetcher<{ company_id: number; company_name: string }[]>({
          url: "/company",
          method: "GET",
        });

        // 質問データの取得
        const questionsRes: {
          data: { data: Question[] } | null;
          error: unknown | null;
        } = await fetcher({
          url: "/get-questions",
          method: "GET",
        });

        // 会社データのセット
        setCompanies(companiesRes.data || []);

        // 質問データの整形とセット
        if (questionsRes.data && questionsRes.data.data) {
          setQuestions(questionsRes.data.data); // ネストされた data を展開
        } else {
          throw new Error("Invalid response structure");
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setError("Failed to fetch data.");
      }
    };

    fetchData();
  }, []);

  // 会社フィルタリング
  const filteredQuestions = selectedCompany
    ? questions.filter((question) => question.company_id === selectedCompany)
    : questions;

  // company_id から会社名を取得
  const getCompanyName = (companyId: number) => {
    const company = companies.find((c) => c.company_id === companyId);
    return company ? company.company_name : "Unknown Company"; // 会社が見つからない場合のフォールバック
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Questions List</h1>

      {/* 会社選択 */}
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <label
          htmlFor="company-select"
          style={{
            marginRight: "10px",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          Select Company:
        </label>
        <select
          id="company-select"
          value={selectedCompany || ""}
          onChange={(e) => setSelectedCompany(Number(e.target.value))}
          style={{
            padding: "8px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        >
          <option value="">All Companies</option>
          {companies.map((company) => (
            <option key={company.company_id} value={company.company_id}>
              {company.company_name}
            </option>
          ))}
        </select>
      </div>

      {/* 質問リスト */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {filteredQuestions.map((question) => (
          <div
            key={question.question_id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "15px",
              backgroundColor: "#f9f9f9",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3 style={{ margin: "0 0 10px", fontSize: "18px", color: "#333" }}>
              <Link href={`/company/question/${question.question_id}`}>
                {question.question_text}
              </Link>
            </h3>
            <p style={{ margin: "5px 0", fontSize: "14px", color: "#555" }}>
              <strong>Company:</strong> {getCompanyName(question.company_id)}
            </p>
            <p style={{ margin: "5px 0", fontSize: "14px", color: "#555" }}>
              <strong>Question ID:</strong> {question.question_id}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionsList;
