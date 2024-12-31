"use client";

import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import Cookies from "js-cookie";
import fetcher from "@/lib/fetcher";
import type { User } from "@/types/user";

const MySkill = () => {
  const [data, setData] = useState<User>({
    user_id: 0,
    name: "",
    birthday: "",
    email: "",
    role_id: 0,
  });
  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("token");
      const { data, error } = await fetcher({
        url: "user",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data) {
        setData(data as User);
        console.log(data);
      }
      if (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const dummyLanguages = [
    { id: 1, name: "JavaScript", level: 5 },
    { id: 2, name: "TypeScript", level: 5 },
    { id: 3, name: "Python", level: 4 },
    { id: 4, name: "Ruby", level: 3 },
    { id: 5, name: "Go", level: 5 },
    { id: 6, name: "Java", level: 4 },
  ];

  return (
    <Card className="w-[80%] max-w-[800px] p-2">
      <CardHeader>
        <CardTitle>マイスキル</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>氏名</TableCell>
              <TableCell className="text-xl">{data.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>生年月日</TableCell>
              <TableCell className="text-xl">{data.birthday}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>メールアドレス</TableCell>
              <TableCell className="text-xl">{data.email}</TableCell>
            </TableRow>
            <TableRow></TableRow>
          </TableBody>
        </Table>
        <div className="p-4">
          <p>使用可能言語</p>
          <div className="space-x-2 mt-4">
            {dummyLanguages.map((language) => (
              <HoverCard key={language.id}>
                <HoverCardTrigger>
                  <Badge variant="outline" className="text-lg py-1 px-4 mb-4">
                    {language.name}
                  </Badge>
                </HoverCardTrigger>
                <HoverCardContent>
                  <div>
                    {language.level === 1 && "初心者"}
                    {language.level === 2 && "初級"}
                    {language.level === 3 && "中級"}
                    {language.level === 4 && "上級"}
                    {language.level === 5 && "プロ"}
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MySkill;
