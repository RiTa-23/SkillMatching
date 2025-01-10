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

import ProjectDetail from "@/components/answer/project/ProjectDetail";

import Cookies from "js-cookie";
import fetcher from "@/lib/fetcher";
import type { Project } from "@/types/Project";

const ProjectList = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const token = Cookies.get("token");
    const fetchData = async () => {
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
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Card className="w-[80%] max-w-[800px] p-8 mt-10">
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">No.</TableHead>
                <TableHead>案件</TableHead>
                <TableHead>進捗</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <ProjectDetail key={project.project_id} project={project} />
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

export default ProjectList;
