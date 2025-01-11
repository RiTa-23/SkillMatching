"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import ProjectEvaluation from "@/components/answer/project/ProjectEvaluation";

import Cookies from "js-cookie";
import fetcher from "@/lib/fetcher";
import type { ProjectDetail } from "@/types/Project";

const ProjectEvaluationPage = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState<ProjectDetail>();

  useEffect(() => {
    const token = Cookies.get("token");
    const fetchData = async () => {
      const { data, error } = await fetcher<ProjectDetail>({
        url: `project/${projectId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data) {
        setProject(data);
      }
      if (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center h-[90vh]">
      {project && <ProjectEvaluation project={project} />}
    </div>
  );
};

export default ProjectEvaluationPage;
