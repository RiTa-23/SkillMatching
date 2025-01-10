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
    <Dialog key={project.project_id}>
      <TableRow key={project.project_id} className="hover:bg-gray-100">
        <TableCell>
          <DialogTrigger>{project.project_id}</DialogTrigger>
        </TableCell>
        <TableCell>
          <DialogTrigger>{project.title}</DialogTrigger>
        </TableCell>
        <TableCell>
          <DialogTrigger>{project.status}</DialogTrigger>
        </TableCell>
      </TableRow>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{project.title}</DialogTitle>
        </DialogHeader>
        <div>
          {/* <p>開始日: {project.start_date}</p>
          <p>終了日: {project.end_date}</p>
          <p>ステータス: {project.status}</p>
          <p>説明: {project.contents}</p> */}
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
