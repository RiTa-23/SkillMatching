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
import type { Skill } from "@/types/Skill";

const MySkill = () => {
  const [user, setUser] = useState<User>();
  const [skills, setSkills] = useState<Skill[]>([]);

  const getProfile = async (token: string | undefined): Promise<void> => {
    const { data, error } = await fetcher<User>({
      url: "user",
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data) {
      setUser(data as User);
    }
    if (error) {
      console.error(error);
    }
  };

  const getSkills = async (token: string | undefined): Promise<void> => {
    const { data, error } = await fetcher<Skill[]>({
      url: "skill",
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data) {
      setSkills(data as Skill[]);
    }
    if (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");
    getProfile(token);
    getSkills(token);
  }, []);

  return (
    <Card className="w-[80%] max-w-[800px] p-2">
      <CardHeader>
        <CardTitle>マイスキル</CardTitle>
      </CardHeader>
      <CardContent className="pb-0">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>氏名</TableCell>
              <TableCell>{user?.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>生年月日</TableCell>
              <TableCell>{user?.birthday}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>メールアドレス</TableCell>
              <TableCell>{user?.email}</TableCell>
            </TableRow>
            <TableRow></TableRow>
          </TableBody>
        </Table>
        <div className="p-4">
          <p>使用可能言語</p>
          <div className="space-x-2 mt-4">
            {skills?.map((skill) => (
              <HoverCard key={skill.language_id}>
                <HoverCardTrigger>
                  <Badge variant="outline" className="py-1 px-4 mb-3">
                    {skill.language_name}
                  </Badge>
                </HoverCardTrigger>
                <HoverCardContent>
                  {skill.level === 1 && "初心者"}
                  {skill.level === 2 && "初級"}
                  {skill.level === 3 && "中級"}
                  {skill.level === 4 && "上級"}
                  {skill.level === 5 && "プロ"}
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
