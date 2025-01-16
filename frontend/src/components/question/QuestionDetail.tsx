"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
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
type Company = { company_id: number; company_name: string };

const QuestionDetail = () => {
    const { id } = useParams();
    const [question, setQuestion] = useState<Question | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [languages, setLanguages] = useState<Language[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [companies, setCompanies] = useState<Company[]>([]);

    useEffect(() => {
        if (!id) return;

        const numericId = parseInt(Array.isArray(id) ? id[0] : id, 10);

        const fetchQuestion = async () => {
            try {
                const response = await fetcher<{
                    data: Question;
                    error: unknown | null;
                }>({
                    url: `/get-one-question/${numericId}`,
                    method: "GET",
                });
                console.log(response.data);
                if (response?.data) {
                    setQuestion(response.data);
                } else {
                    setQuestion(null);
                    throw new Error("Question not found");
                }
            } catch (error) {
                console.error("Failed to fetch question:", error);
                setError("Failed to load question details.");
            }
        };

        const fetchData = async () => {
            try {
                const [companiesRes, languagesRes, categoriesRes] = await Promise.all([
                    fetcher<Company[]>({
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

                // 各レスポンスのデータ部分にアクセス
                setCompanies(companiesRes.data || []);
                setLanguages(languagesRes.data || []);
                setCategories(categoriesRes.data || []);

                console.log('Companies:', companiesRes.data);
                console.log('Languages:', languagesRes.data);
                console.log('Categories:', categoriesRes.data);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

        fetchData();
        fetchQuestion();
    }, [id]);

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!question) {
        return <p>Loading...</p>;
    }

    const getNameById = <T extends { [key: string]: any }>(
        items: T[] | { data: T[] },
        idKey: keyof T,
        nameKey: keyof T,
        id: number | null
    ) => {
        if (!Array.isArray(items)) {
            console.error("Expected items to be an array, but got:", items);
            return "Invalid data";
        }
        if (id === null) return "None";
        const item = items.find((item) => item[idKey] === id);
        return item ? item[nameKey] : `ID: ${id}`;
    };

    const companyName = getNameById(companies, "company_id", "company_name", question.company_id);
    const categoryName = getNameById(categories, "category_id", "category_name", question.category_id);
    const languageName = getNameById(languages, "language_id", "language_name", question.language_id);

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
            <p><strong>Company:</strong> {companyName}</p>
            <p><strong>Category:</strong> {categoryName}</p>
            <p><strong>Language:</strong> {languageName}</p>
            <p><strong>Question Text:</strong> {question.question_text}</p>
            <p><strong>Created At:</strong> {new Date(question.created_at).toLocaleString()}</p>
            <p><strong>Updated At:</strong> {new Date(question.updated_at).toLocaleString()}</p>
            <a
                href={`/company/question/${question.question_id}/edit`}
                style={{ color: "blue", textDecoration: "underline" }}
            >
                Edit Question
            </a>
        </div>
    );
};

export default QuestionDetail;
