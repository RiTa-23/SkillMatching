import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

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
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-4">案件詳細</h1>
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>案件元会社名</CardTitle>
          </CardHeader>
          <CardContent>
            {project.companyName}
          </CardContent>
        </Card>
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>案件名</CardTitle>
          </CardHeader>
          <CardContent>
            {project.projectName}
          </CardContent>
        </Card>
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>案件の詳細</CardTitle>
          </CardHeader>
          <CardContent>
            {project.projectDetail}
          </CardContent>
        </Card>
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>担当者</CardTitle>
          </CardHeader>
          <CardContent>
            {project.members.map((member, index) => (
              <Card key={index} className="mb-2 bg-blue-100 inline-block">
                <CardContent>{member}</CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>使用技術</CardTitle>
          </CardHeader>
          <CardContent>
            {project.technologies.map((tech, index) => (
              <Card key={index} className="mb-2 bg-green-100 inline-block">
                <CardContent>{tech}</CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      </Card>
    </div>
  );
};

export default ProjectDetailPage;