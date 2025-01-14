"use client";

import { useEffect, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

import Cookies from "js-cookie";
import fetcher from "@/lib/fetcher";
import type { AnswerHistory } from "@/types/Answer";
import { formatDate } from "@/lib/formatDate";

const AnswerHistory = () => {
  const [answerHistory, setAnswerHistory] = useState<AnswerHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const token = Cookies.get("token");
    const fetchData = async () => {
      setLoading(true);
      const { data, error } = await fetcher<AnswerHistory[]>({
        url: "/answer/history",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data) {
        setAnswerHistory(data);
      }
      if (error) {
        toast.error("回答履歴の取得に失敗しました", { position: "top-center" });
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <Card className="w-[80%] max-w-[800px] p-2">
      <CardHeader>
        <CardTitle>回答履歴</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="">loading...</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>会社名</TableHead>
                <TableHead>回答日</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {answerHistory.map((answer) => (
                <TableRow key={answer.company}>
                  <TableCell>{answer.company}</TableCell>
                  <TableCell>{formatDate(answer.date)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default AnswerHistory;
