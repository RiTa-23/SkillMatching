"use client";

import { useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import SearchHopeLanguage from "@/components/project/matching";

import Cookies from "js-cookie";
import fetcher from "@/lib/fetcher";
import type { Project } from "@/types/Project";

export default function Page() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    const fetchData = async () => {
      setLoading(true);
      const { data, error } = await fetcher<Project[]>({
        url: "project",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data) {
        setProjects(data);
        console.log("プロジェクト情報取得成功", data);
      }
      if (error) {
        console.error("Error fetching projects:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center h-[90vh]">
      <Card className="w-[80%] max-w-[700px] p-8 mt-10">
        <CardContent className="pb-0">
          {loading ? (
            <p className="pt-4">Loading...</p>
          ) : (
            <SearchHopeLanguage />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
