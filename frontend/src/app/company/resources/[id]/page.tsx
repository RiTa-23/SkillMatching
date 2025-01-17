"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Cog, CircleUser } from "lucide-react";

interface Resource {
  id: number;
  name: string;
  language: string;
  proficiency: string;
  communication: string;
  problemSolving: string;
}

const mockData: Resource[] = [
  // ここにモックデータを追加するか、実際のデータを取得するロジックを追加する
  {
    id: 1,
    name: "エンジニア 1",
    language: "JavaScript",
    proficiency: "中級",
    communication: "4",
    problemSolving: "3",
  },
  {
    id: 2,
    name: "エンジニア 2",
    language: "Python",
    proficiency: "上級",
    communication: "5",
    problemSolving: "4",
  },
  {
    id: 3,
    name: "エンジニア 3",
    language: "Java",
    proficiency: "初級",
    communication: "3",
    problemSolving: "2",
  },
];

const ResourceDetail: React.FC = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [resource, setResource] = useState<Resource | null>(null);

  // useEffect(() => {
  //   if (id) {
  //     const foundResource = mockData.find((res) => res.id === Number(id));
  //     setResource(foundResource || null);
  //   }
  // }, [id]);

  useEffect(() => {
    // テスト用に適当なデータを設定
    setResource({
      id: 999,
      name: "テスト エンジニア",
      language: "TypeScript",
      proficiency: "上級",
      communication: "5",
      problemSolving: "5",
    });
  }, []);

  if (!resource) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">人材詳細</h1>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>{resource.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>ID: {resource.id}</p>
          <p>言語: {resource.language}</p>
          <p>熟練度: {resource.proficiency}</p>
          <p>コミュニケーション: {resource.communication}</p>
          <p>問題解決: {resource.problemSolving}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourceDetail;
