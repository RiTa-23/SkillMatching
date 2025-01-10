import Link from "next/link";

import { TableCell, TableRow } from "@/components/ui/table";

import type { Project } from "@/types/Project";

interface ProjectProps {
  project: Project;
}

const ProjectDetail = ({ project }: ProjectProps) => {
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
    </TableRow>
  );
};

export default ProjectDetail;
