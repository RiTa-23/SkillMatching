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
          <div>
            <p>開始日: {project.startDate}</p>
            <p>終了日: {project.endDate}</p>
            <p>ステータス: {project.status}</p>
            <p>説明: {project.description}</p>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetail;
