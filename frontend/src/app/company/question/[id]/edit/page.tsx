"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation"; // useParams と useRouter をインポート
import fetcher from "@/lib/fetcher";

type Question = {
  question_id: number;
  company_id: number;
  category_id: number | null;
  language_id: number | null;
  question_text: string;
  created_at: string;
  updated_at: string;
};

type Language = { language_id: number; language_name: string };
type Category = { category_id: number; category_name: string };

const EditQuestion = () => {
  const { id } = useParams(); // useParams で id を取得
  const [question, setQuestion] = useState<Question | null>(null);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [questionText, setQuestionText] = useState<string>(""); // 質問テキストを管理
  const [selectedLanguage, setSelectedLanguage] = useState<number | null>(null); // 選択された言語
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null); // 選択されたカテゴリー
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  // 初期データ（言語、カテゴリー）を取得
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [languagesRes, categoriesRes] = await Promise.all([
          fetcher<Language[]>({ url: "/language", method: "GET" }),
          fetcher<Category[]>({ url: "/category", method: "GET" }),
        ]);
        setLanguages(languagesRes.data || []);
        setCategories(categoriesRes.data || []);
      } catch (error) {
        setError("Failed to fetch languages or categories.");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!id) return; // id がない場合は処理しない

    const numericId = parseInt(Array.isArray(id) ? id[0] : id, 10); // id を数値に変換

    const fetchQuestion = async () => {
      try {
        const response = await fetcher<{ data: Question[]; error: unknown | null }>({
          url: `/get-one-question/${numericId}`,
          method: "GET",
        });
        console.log(response);
        if (response?.data) {
          const questionData = response.data;
          setQuestion(questionData);
          setQuestionText(questionData.question_text);
          setSelectedLanguage(questionData.language_id);
          setSelectedCategory(questionData.category_id);
        } else {
          setError("Question not found.");
        }
      } catch (error) {
        setError("Failed to fetch question.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [id]); // id が変更された場合にデータを再取得

  const handleUpdate = async () => {
    if (!question) return;

    // selectedLanguage と selectedCategory が null か空文字の場合に null に変換
    const updatedQuestion = {
      ...question,
      question_text: questionText, // 編集した質問テキスト
      language_id: selectedLanguage === null || selectedLanguage === "" ? null : selectedLanguage,
      category_id: selectedCategory === null || selectedCategory === "" ? null : selectedCategory,
    };
    console.log(selectedLanguage);
    console.log(selectedCategory);
    try {
      const response = await fetcher({
        url: `/update-question/${question.question_id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: updatedQuestion,
      });
      console.log(response);
      if (response?.data) {
        router.push(`/company/question/${question.question_id}`); // 編集後にリダイレクト
      } else {
        setError("Failed to update question.");
      }
    } catch (error) {
      setError("Failed to update question.");
    }
  };



  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {question && (
        <div>
          <h2>Edit Question</h2>
          <p><strong>Question ID:</strong> {question.question_id}</p>
          <label>
            Question Text:
            <textarea
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              rows={4}
              cols={50}
            />
          </label>

          {/* 言語選択 */}
          <div>
            <label>
              Language:
              <select
                value={selectedLanguage ?? ""}
                onChange={(e) => setSelectedLanguage(e.target.value === "" ? null : Number(e.target.value))}
              >
                <option value="">Select Language</option>
                {languages.map((language) => (
                  <option key={language.language_id} value={language.language_id}>
                    {language.language_name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* カテゴリー選択 */}
          <div>
            <label>
              Category:
              <select
                value={selectedCategory ?? ""}
                onChange={(e) => setSelectedCategory(e.target.value === "" ? null : Number(e.target.value))}
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.category_id} value={category.category_id}>
                    {category.category_name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <br />
          <button onClick={handleUpdate}>Save Changes</button>
        </div>
      )}
    </div>
  );
};

export default EditQuestion;
