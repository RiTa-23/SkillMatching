"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Pencil } from "lucide-react";

import Cookies from "js-cookie";
import fetcher from "@/lib/fetcher";
import type { User } from "@/types/user";
import type { Skill } from "@/types/Skill";
import type { HopeLanguage } from "@/types/Language";

const MySkill = () => {
  const [user, setUser] = useState<User>();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [hopeLanguages, setHopeLanguages] = useState<HopeLanguage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getProfile = async (token: string | undefined): Promise<void> => {
    setLoading(true);
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
      toast.error("ユーザー情報の取得に失敗しました", {
        position: "top-center",
      });
    }
    setLoading(false);
  };

  const getSkills = async (token: string | undefined): Promise<void> => {
    setLoading(true);
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
      toast.error("スキル情報の取得に失敗しました", { position: "top-center" });
    }
    setLoading(false);
  };

  const getHopeLanguages = async (token: string | undefined): Promise<void> => {
    setLoading(true);
    const { data, error } = await fetcher<HopeLanguage[]>({
      url: "hope-language",
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data) {
      setHopeLanguages(data as HopeLanguage[]);
    }
    if (error) {
      toast.error("希望言語の取得に失敗しました", {
        position: "top-center",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    const token = Cookies.get("token");
    getProfile(token);
    getSkills(token);
    // getHopeLanguages(token);
    setHopeLanguages([
      { language_id: 1, language_name: "Python" },
      { language_id: 2, language_name: "PHP" },
      { language_id: 3, language_name: "JavaScript" },
    ]);
  }, []);

  return (
    <Card className="relative w-[80%] max-w-[800px] p-2">
      <CardHeader>
        <CardTitle>マイスキル</CardTitle>
      </CardHeader>
      <CardContent className="pb-0">
        {loading ? (
          <p className="pb-4">loading...</p>
        ) : (
          <>
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
            <div className="p-4">
              <p>希望言語</p>
              <div className="space-x-2 mt-4">
                {hopeLanguages.map((language) => (
                  <Badge
                    key={language.language_id}
                    variant="outline"
                    className="py-1 px-4 mb-3"
                  >
                    {language.language_name}
                  </Badge>
                ))}
              </div>
            </div>
          </>
        )}
        {!loading && (
          <Link
            href="/answerer/edit"
            className="absolute top-4 right-4 border rounded p-2"
          >
            <Pencil className="w-6 h-6 cursor-pointer" />
          </Link>
        )}
      </CardContent>
    </Card>
  );
};

export default MySkill;
