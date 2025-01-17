"use client";

import React, { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import fetcher from "@/lib/fetcher";

type Language = { language_id: number; language_name: string };
type Category = { category_id: number; category_name: string };

const QuestionForm: React.FC = () => {
  const [step, setStep] = useState<"language" | "category" | null>(null);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [companies, setCompanies] = useState<
    { company_id: number; company_name: string }[]
  >([]);
  const [relatedOptions, setRelatedOptions] = useState<
    { id: number; name: string }[]
  >([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [questionText, setQuestionText] = useState("");

  // 初期ロードで会社、技術、カテゴリーを取得
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [companiesRes, languagesRes, categoriesRes] = await Promise.all([
          fetcher<{ company_id: number; company_name: string }[]>({
            url: "/company",
            method: "GET",
          }),
          fetcher<Language[]>({
            url: "/language",
            method: "GET",
          }),
          fetcher<Category[]>({
            url: "/category",
            method: "GET",
          }),
        ]);
        setCompanies(companiesRes.data || []);
        setLanguages(languagesRes.data || []);
        setCategories(categoriesRes.data || []);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  // 関連オプションを取得
  const fetchRelatedOptions = async (
    type: "language" | "category",
    id: string
  ) => {
    try {
      console.log(type, id);
      const response = await fetcher<{ id: number; name: string }[]>({
        url: "get-related-options",
        method: "POST",
        body: { type, id: parseInt(id) }, // idを整数に変換
      });
      setRelatedOptions(response.data || []);
    } catch (error) {
      console.error("Failed to fetch related options:", error);
    }
  };

  const handleStepChange = (selectedStep: "language" | "category") => {
    setStep(selectedStep);
    setSelectedOption(""); // 初期化
    setRelatedOptions([]); // 初期化
  };

  const handlePrimarySelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setSelectedOption(id);
    fetchRelatedOptions(step!, id); // 関連する選択肢を取得
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // selectedOptionを数値型に変換
    const payload = {
      company_id: selectedCompany,
      step,
      selectedOption: Number(selectedOption), // ここで明示的に型変換
      question_text: questionText,
    };

    try {
      console.log(payload);
      const response = await fetcher({
        url: "/questions",
        method: "POST",
        body: payload,
      });

      if (response.data) {
        console.log("Question submitted successfully:", response.data);
        setStep(null);
        setSelectedOption("");
        setSelectedCompany("");
        setQuestionText("");
      }
    } catch (error) {
      console.error("Error submitting question:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 会社の選択 */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Select Company
        </label>
        <select
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        >
          <option value="">Select a company</option>
          {companies.map((company) => (
            <option key={company.company_id} value={company.company_id}>
              {company.company_name}
            </option>
          ))}
        </select>
      </div>

      {/* 技術またはカテゴリーの選択 */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Select Step
        </label>
        <div className="flex space-x-4">
          <Button
            type="button"
            onClick={() => handleStepChange("language")}
            className={step === "language" ? "bg-indigo-600 text-white" : ""}
          >
            Language
          </Button>
          <Button
            type="button"
            onClick={() => handleStepChange("category")}
            className={step === "category" ? "bg-indigo-600 text-white" : ""}
          >
            Category
          </Button>
        </div>
      </div>

      {/* 技術またはカテゴリーの選択肢 */}
      {step && (
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Select {step === "language" ? "Language" : "Category"}
          </label>
          <select
            value={selectedOption}
            onChange={handlePrimarySelection}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          >
            <option value="">Select an option</option>
            {step === "language"
              ? languages.map((language) => (
                  <option
                    key={language.language_id}
                    value={language.language_id}
                  >
                    {language.language_name}
                  </option>
                ))
              : categories.map((category) => (
                  <option
                    key={category.category_id}
                    value={category.category_id}
                  >
                    {category.category_name}
                  </option>
                ))}
          </select>
        </div>
      )}

      {/* 関連するオプション */}
      {relatedOptions.length > 0 && (
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Related Options
          </label>
          <select
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          >
            <option value="">Select an option</option>
            {relatedOptions.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* 質問テキスト */}
      <div className="space-y-4">
        <label
          htmlFor="question-text"
          className="block text-sm font-medium text-gray-700"
        >
          Question
        </label>
        <Textarea
          id="question-text"
          placeholder="Write your question here..."
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          required
        />
      </div>

      {/* 送信ボタン */}
      <Button
        type="submit"
        className="w-full bg-indigo-600 text-white hover:bg-indigo-700"
      >
        Submit Question
      </Button>
    </form>
  );
};

export default QuestionForm;
