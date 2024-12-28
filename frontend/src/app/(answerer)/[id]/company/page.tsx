"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

import CompanyList from "@/components/answer/company/CompanyList";

const CompanyPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex flex-col items-center h-[90vh]">
      <Card className="w-[80%] max-w-[800px] p-8 mt-10">
        <CardContent className="pb-0">
          <Input
            type="text"
            placeholder="会社を検索"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <CompanyList searchQuery={searchQuery} />
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyPage;
