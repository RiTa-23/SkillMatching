"use client";

import { useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

import ProjectDetail from "@/components/project/ProjectDetail";

import Cookies from "js-cookie";
import fetcher from "@/lib/fetcher";
import type { Project } from "@/types/Project";

const ProjectList = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

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
      }
      if (error) {
        toast.error("案件の取得に失敗しました", { position: "top-center" });
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      <Card className="w-[80%] max-w-[800px] p-8 mt-10">
        <CardContent>
          {loading ? (
            <p className="pt-4">Loading...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">No.</TableHead>
                  <TableHead>案件</TableHead>
                  <TableHead>進捗</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <ProjectDetail
                    key={project.project_id}
                    project={project}
                    status={project.status}
                  />
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default ProjectList;
