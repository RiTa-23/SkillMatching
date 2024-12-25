import Link from "next/link";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";

import type { Project } from "@/types/Project";

interface ProjectProps {
  project: Project;
}

const ProjectDetail = (props: ProjectProps) => {
  const { project } = props;

  return (
    <Dialog key={project.id}>
      <TableRow key={project.id} className="hover:bg-gray-100">
        <TableCell>
          <DialogTrigger>{project.id}</DialogTrigger>
        </TableCell>
        <TableCell>
          <DialogTrigger>{project.name}</DialogTrigger>
        </TableCell>
        <TableCell>
          <DialogTrigger>{project.status}</DialogTrigger>
        </TableCell>
      </TableRow>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{project.name}</DialogTitle>
        </DialogHeader>
        <div>
          <p>開始日: {project.startDate}</p>
          <p>終了日: {project.endDate}</p>
          <p>ステータス: {project.status}</p>
          <p>説明: {project.description}</p>
          <Link href={`./project/${project.id}/`}>
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
