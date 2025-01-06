import React from 'react';

const ProjectDetailPage = () => {
  const project = {
    companyName: '株式会社H',
    projectName: 'スキル可視化システムの開発',
    projectDetail: '人によって言語の「できる」の基準が違うため、それを具体化するシステムの開発を行う',
    members: ['u5', 'rita', 'えのっきー'],
    technologies: ['Laravel', 'next.js']
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>案件詳細</h1>
      <div style={{ marginBottom: '10px' }}>
        <strong>案件元会社名:</strong> {project.companyName}
      </div>
      <div style={{ marginBottom: '10px' }}>
        <strong>案件名:</strong> {project.projectName}
      </div>
      <div style={{ marginBottom: '10px' }}>
        <strong>案件の詳細:</strong> {project.projectDetail}
      </div>
      <div style={{ marginBottom: '10px' }}>
        <strong>担当者:</strong> {project.members.join('・')}
      </div>
      <div style={{ marginBottom: '10px' }}>
        <strong>使用技術:</strong> {project.technologies.join('・')}
      </div>
    </div>
  );
};

export default ProjectDetailPage;