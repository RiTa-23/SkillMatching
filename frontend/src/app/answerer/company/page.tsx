"use client";

import { useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import CompanyList from "@/components/answer/company/CompanyList";

import Cookies from "js-cookie";
import fetcher from "@/lib/fetcher";
import type { Company } from "@/types/company";

const CompanyPage = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);

  useEffect(() => {
    const token = Cookies.get("token");
    const fetchData = async () => {
      const { data, error } = await fetcher<Company[]>({
        url: "company",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data) {
        setCompanies(data);
        setFilteredCompanies(data);
        console.log(data);
      }
      if (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    console.log("query", query);
    const filteredCompanies = companies.filter((company) =>
      company.company_name.toLowerCase().includes(query.toLowerCase())
    );
    console.log("filteredCompanies", filteredCompanies);
    setFilteredCompanies(filteredCompanies);
  };

  return (
    <div className="flex flex-col items-center h-[90vh]">
      <Card className="w-[80%] max-w-[700px] p-8 mt-10">
        <CardContent className="pb-0">
          <Input type="text" placeholder="Search..." onChange={handleChange} />
          <CompanyList companies={filteredCompanies} />
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyPage;
