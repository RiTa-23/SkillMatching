"use client";

import { useState } from "react";
import Link from "next/link";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";

import Cookies from "js-cookie";
import fetcher from "@/lib/fetcher";
import type { Project } from "@/types/Project";
import type { ProjectDetail } from "@/types/Project";

interface ProjectProps {
  project: Project;
}

const ProjectDetail = (props: ProjectProps) => {
  const { project } = props;
  const [projectDetail, setProjectDetail] = useState<ProjectDetail | null>(
    null
  );

  const fetchData = async (token: string) => {
    const { data, error } = await fetcher<ProjectDetail>({
      url: `project/${project.project_id}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data) {
      setProjectDetail(data);
    }
    if (error) {
      console.error(error);
    }
  };

  const getProjectDetail = () => {
    const token = Cookies.get("token");
    if (token) {
      fetchData(token);
    }
  };

  return (
    <Dialog>
      <TableRow key={project.project_id} className="hover:bg-gray-100">
        <TableCell>
          <DialogTrigger onClick={getProjectDetail}>
            {project.project_id}
          </DialogTrigger>
        </TableCell>
        <TableCell>
          <DialogTrigger onClick={getProjectDetail}>
            {project.title}
          </DialogTrigger>
        </TableCell>
        <TableCell>
          <DialogTrigger onClick={getProjectDetail}>
            {project.status}
          </DialogTrigger>
        </TableCell>
      </TableRow>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{project.title}</DialogTitle>
        </DialogHeader>
        <div>
          <p>開始日: {projectDetail?.start_date}</p>
          <p>終了日: {projectDetail?.end_date}</p>
          <p>ステータス: {projectDetail?.status}</p>
          <p>説明: {projectDetail?.contents}</p>
          <Link href={`./project/${project.project_id}/`}>
            <div
              role="button"
              className="inline-flex items-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 mt-2"
            >
              評価
            </div>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetail;
