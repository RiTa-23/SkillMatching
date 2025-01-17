"use client";

import React, { useState, useEffect } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import fetcher from "@/lib/fetcher";

interface Language {
  language_id: number;
  language_name: string;
}

const SearchHopeForm: React.FC = () => {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [languageId, setLanguageId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // loadingステートはコンポーネントのトップレベルに
  const [results, setResults] = useState<any[]>([]); // 検索結果
  const [error, setError] = useState<string | null>(null); // エラーステートもトップレベルに

  useEffect(() => {
    const fetchLanguages = async () => {
      const { data, error } = await fetcher<Language[]>({
        url: "language", // 必要に応じて正しいエンドポイントに変更
        method: "GET",
      });
      if (data) {
        setLanguages(data);
      }
      if (error) {
        console.error("Error fetching languages:", error);
        toast.error("技術データの取得中にエラーが発生しました");
      }
    };

    fetchLanguages();
  }, []);

  const handleSearch = async () => {
    if (!languageId) {
      toast.error("技術を選択してください");
      return;
    }

    setLoading(true);
    setError(null); // 検索開始時にエラーをリセット
    console.log("Sending language_id:", languageId); // リクエストの内容を確認

    try {
      // URLSearchParamsを使ってクエリパラメータを手動で組み立てる
      const queryParams = new URLSearchParams();
      queryParams.append("language_id", languageId.toString());
      console.log(queryParams);
      const { data, error } = await fetcher<any[]>({
        url: `searchhope?${queryParams.toString()}`, // 正しいURLを指定
        method: "GET",
      });
      if (data) {
        if (Array.isArray(data)) {
          // ユーザーIDで一意の結果を作成
          const uniqueResults = Array.from(
            new Set(data.map((item) => item.user_id))
          ).map((id) => data.find((item) => item.user_id === id));

          // 必要な形式に整形
          const formattedResults = uniqueResults.map((item) => ({
            user_id: item!.user_id,
            name: item!.name,
          }));

          setResults(formattedResults);
          if (formattedResults.length === 0) {
            toast.info("該当するユーザーが見つかりませんでした");
          }
        } else {
          console.error("Unexpected response format:", data);
          toast.error("不正なレスポンス形式です");
        }
      }

      if (error) {
        console.error("Error during search:", error);
        toast.error("検索中にエラーが発生しました");
      }
    } catch (err: any) {
      console.error("検索中にエラーが発生しました:", err);
      setError(err.message || "検索に失敗しました");
    } finally {
      setLoading(false);
    }
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

      <Button onClick={handleSearch} disabled={loading}>
        {loading ? "検索中..." : "検索"}
      </Button>

      {/* 結果表示 */}
      <div className="mt-4">
        {results.length > 0 ? (
          <ul className="space-y-2">
            {results.map((result, index) => (
              <li key={index} className="border p-2 rounded">
                {result.name} {/* 結果の形式に応じて適宜変更 */}
              </li>
            ))}
          </ul>
        ) : (
          <p>検索結果がここに表示されます</p>
        )}
      </div>

      {/* エラーメッセージ表示 */}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default SearchHopeForm;
