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

const EditQuestion = () => {
  const { id } = useParams(); // useParams で id を取得
  const [question, setQuestion] = useState<Question | null>(null);
  const [questionText, setQuestionText] = useState<string>(""); // 質問テキストを管理
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    if (!id) return; // id がない場合は処理しない

    const numericId = parseInt(Array.isArray(id) ? id[0] : id, 10); // id を数値に変換

    const fetchQuestion = async () => {
      try {
        const response = await fetcher<{ data: Question[]; error: unknown | null }>({
          url: `/get-one-question/${numericId}`,
          method: "GET",
        });
        console.log(response.data);
        if (response?.data) {
          setQuestion(response.data);
          setQuestionText(response.data.question_text); // 質問テキストをセット
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

    const updatedQuestion = {
      ...question,
      question_text: questionText, // 編集した質問テキスト
    };

    try {
      const response = await fetcher({
        url: `/update-question/${question.question_id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: updatedQuestion, // 修正：オブジェクトをそのまま渡す
      });

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
          <br />
          <button onClick={handleUpdate}>Save Changes</button>
        </div>
      )}
    </div>
  );
};

export default EditQuestion;
