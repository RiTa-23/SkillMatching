import Link from "next/link";

import { TableCell, TableRow } from "@/components/ui/table";
import MatchingDialog from "@/components/project/MatchingDialog";
import type { Project } from "@/types/Project";

interface ProjectProps {
  project: Project;
  status: string;
}

const ProjectDetail = ({ project }: ProjectProps) => {
  const { status } = project;
  return (
    <TableRow className="hover:bg-gray-100">
      <TableCell>
        <Link href={`./project/${project.project_id}`}>
          {project.project_id}
        </Link>
      </TableCell>
      <TableCell>
        <Link href={`./project/${project.project_id}`}>{project.title}</Link>
      </TableCell>
      <TableCell>
        <Link href={`./project/${project.project_id}`}>{project.status}</Link>
      </TableCell>
      {status === "未着手" ? (
        <TableCell>
          <MatchingDialog projectId={project.project_id} />
        </TableCell>
      ) : (
        <TableCell></TableCell>
      )}
    </TableRow>
  );
};

export default ProjectDetail;
