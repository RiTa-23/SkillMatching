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

import Cookies from "js-cookie";
import fetcher from "@/lib/fetcher";
import type { AnswerHistory } from "@/types/Answer";

const AnswerHistory = () => {
  const [answerHistory, setAnswerHistory] = useState<AnswerHistory[]>([]);

  useEffect(() => {
    const token = Cookies.get("token");
    const fetchData = async () => {
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
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Card className="w-[80%] max-w-[800px] p-2">
      <CardHeader>
        <CardTitle>回答履歴</CardTitle>
      </CardHeader>
      <CardContent>
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
                <TableCell>{answer.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AnswerHistory;
