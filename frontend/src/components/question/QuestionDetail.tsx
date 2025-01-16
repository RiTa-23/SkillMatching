"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // useParams をインポート
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

const QuestionDetail = () => {
    const { id } = useParams(); // useParams で id を取得
    const [question, setQuestion] = useState<Question | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return; // id がない場合は処理しない

        const numericId = parseInt(Array.isArray(id) ? id[0] : id, 10);
        // 配列チェックを外して、id を直接数値に変換
        console.log(numericId);
        console.log(typeof numericId);
        const fetchQuestion = async () => {
            try {
                const response = await fetcher<{
                    data: Question[];
                    error: unknown | null;
                }>({
                    url: `/get-one-question/${numericId}`,
                    method: "GET",
                });

                console.log(response.data); // レスポンスをログ出力

                if (response?.data) {
                    setQuestion(response.data); // データがある場合は最初の要素をセット
                } else {
                    setQuestion(null); // データが見つからない場合はnullをセット
                    throw new Error("Question not found");
                }
            } catch (error) {
                console.error("Failed to fetch question:", error);
                setError("Failed to load question details.");
            }
        };

        fetchQuestion();
    }, [id]); // id が変更された場合にデータを再取得

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!question) {
        return <p>Loading...</p>;
    }

    return (
        <div
            style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "20px",
                backgroundColor: "#f9f9f9",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                maxWidth: "600px",
                margin: "0 auto",
            }}
        >
            <p><strong>Question ID:</strong> {question.question_id}</p>
            <p><strong>Company ID:</strong> {question.company_id}</p>
            <p><strong>Category ID:</strong> {question.category_id || "None"}</p>
            <p><strong>Language ID:</strong> {question.language_id || "None"}</p>
            <p><strong>Question Text:</strong> {question.question_text}</p>
            <p><strong>Created At:</strong> {new Date(question.created_at).toLocaleString()}</p>
            <p><strong>Updated At:</strong> {new Date(question.updated_at).toLocaleString()}</p>
            <a href={`/company/question/${question.question_id}/edit`} style={{ color: "blue", textDecoration: "underline" }}>
                Edit Question
            </a>
        </div>
    );
};

export default QuestionDetail;
