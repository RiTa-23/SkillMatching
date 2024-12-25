import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import ProjectDetail from "@/components/answer/project/ProjectDetail";
import type { Project } from "@/types/Project";

const ProjectList = () => {
  const dummyProjects: Project[] = [
    {
      id: 1,
      name: "Project 1",
      description: "Project 1 description",
      startDate: "2021-01-01",
      endDate: "2021-12-31",
      status: "完了",
    },
    {
      id: 2,
      name: "Project 2",
      description: "Project 2 description",
      startDate: "2021-01-01",
      endDate: "2021-12-31",
      status: "進行中",
    },
    {
      id: 3,
      name: "Project 3",
      description: "Project 3 description",
      startDate: "2021-01-01",
      endDate: "2021-12-31",
      status: "未着手",
    },
    {
      id: 4,
      name: "Project 4",
      description: "Project 4 description",
      startDate: "2021-01-01",
      endDate: "2021-12-31",
      status: "完了",
    },
    {
      id: 5,
      name: "Project 5",
      description: "Project 5 description",
      startDate: "2021-01-01",
      endDate: "2021-12-31",
      status: "進行中",
    },
  ];

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
              {dummyProjects.map((project) => (
                <ProjectDetail key={project.id} project={project} />
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

export default ProjectList;
