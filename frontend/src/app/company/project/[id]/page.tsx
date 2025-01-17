"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cog, CircleUser } from "lucide-react";

import Cookies from "js-cookie";
import fetcher from "@/lib/fetcher";
import type { ProjectDetail } from "@/types/Project";

const ProjectDetailPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState<ProjectDetail>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");
    const fetchData = async () => {
      setLoading(true);
      const { data, error } = await fetcher<ProjectDetail>({
        url: `project/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data) {
        console.log("プロジェクト情報取得成功", data);
        setProject(data);
      }
      if (error) {
        console.error("Error fetching project:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const dummyProjectMembers = ["U5", "Rita", "エノッキー"];
  const dummyProjectSkills = ["React", "TypeScript", "Tailwind CSS"];

  return (
    <div className="container mx-auto p-6">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-4">案件詳細</h1>
        {loading && <p>Loading...</p> ? (
          <p className="pt-4">Loading...</p>
        ) : (
          <>
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>案件名</CardTitle>
              </CardHeader>
              <CardContent>{project?.title}</CardContent>
            </Card>
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>案件の詳細</CardTitle>
              </CardHeader>
              <CardContent>{project?.contents}</CardContent>
            </Card>
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>
                  <div className="flex items-center">
                    <CircleUser className="mr-2" />
                    担当者
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {dummyProjectMembers.map((member, index) => (
                  <Badge key={index} className="mr-2">
                    {member}
                  </Badge>
                ))}
              </CardContent>
            </Card>
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>
                  <div className="flex items-center">
                    <Cog className="mr-2" />
                    使用技術
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {dummyProjectSkills.map((skill, index) => (
                  <Badge key={index} className="mr-2">
                    {skill}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          </>
        )}
      </Card>
    </div>
  );
};

export default ProjectDetailPage;
