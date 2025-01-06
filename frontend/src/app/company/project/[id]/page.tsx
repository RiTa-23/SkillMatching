import React from 'react';
import Box from "@/components/project/box";

const ProjectDetailPage = () => {
  const project = {
    companyName: '株式会社H',
    projectName: 'スキル可視化システムの開発',
    projectDetail: '人によって言語の「できる」の基準が違うため、それを具体化するシステムの開発を行う',
    members: ['u5', 'rita', 'えのっきー'],
    technologies: ['Laravel', 'next.js']
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">案件詳細</h1>
      <div style={{ marginBottom: '10px' }}>
        <strong>案件元会社名:</strong> {project.companyName}
      </div>
      <div style={{ marginBottom: '10px' }}>
        <strong>案件名:</strong> {project.projectName}
      </div>
      <div style={{ marginBottom: '10px' }}>
        <strong>案件の詳細:</strong> {project.projectDetail}
      </div>
      <Box title="担当者" content={project.members} />
      <Box title="使用技術" content={project.technologies} />
    </div>
  );
};

export default ProjectDetailPage;