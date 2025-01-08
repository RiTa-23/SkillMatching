"use client";

import { Card } from '@/components/ui/card';
import React, { useEffect, useState } from 'react';

interface Project {
  id: number;
  companyName: string;
  projectName: string;
}

const mockData: Project[] = [
  { id: 1, companyName: "会社A", projectName: "プロジェクト1" },
  { id: 2, companyName: "会社B", projectName: "プロジェクト2" },
  { id: 3, companyName: "会社C", projectName: "プロジェクト3" },
  // 他のモックデータを追加
];

const ProjectPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    // 初回レンダリング時にモックデータを設定
    setProjects(mockData);
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">案件一覧</h1>
      <div className="mt-6">
        {projects.map((project) => (
          <div key={project.id} className="p-2 border-b">
            {project.companyName} - {project.projectName}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectPage;