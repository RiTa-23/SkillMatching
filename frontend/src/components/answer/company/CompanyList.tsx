"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useEffect } from "react";

type props = {
  searchQuery: string;
};

const CompanyList = (props: props) => {
  const { searchQuery } = props;
  const data = [
    { id: 1, name: "株式会社未来技術" },
    { id: 2, name: "グローバルソリューションズ株式会社" },
    { id: 3, name: "クリエイティブマインズ合同会社" },
    { id: 4, name: "ネクストジェンエンタープライズ" },
    { id: 5, name: "パイオニアテクノロジーズ" },
    { id: 6, name: "ビジョナリーベンチャーズ" },
    { id: 7, name: "フューチャーワークス株式会社" },
    { id: 8, name: "ダイナミックシステムズ" },
    { id: 9, name: "シナジーネットワークス" },
    { id: 10, name: "イノベーティブデザインズ" },
    { id: 11, name: "エリートソリューションズ" },
    { id: 12, name: "プライムテック株式会社" },
    { id: 13, name: "アドバンストアナリティクス" },
    { id: 14, name: "ストラテジックインサイツ" },
    { id: 15, name: "クアンタムテクノロジーズ" },
    { id: 16, name: "ネクスジェンソリューションズ" },
    { id: 17, name: "アルファイノベーションズ" },
    { id: 18, name: "ベータエンタープライズ" },
    { id: 19, name: "ガンマシステムズ" },
    { id: 20, name: "デルタダイナミクス" },
    { id: 21, name: "イプシロンネットワークス" },
    { id: 22, name: "ゼータソリューションズ" },
    { id: 23, name: "エータテクノロジーズ" },
    { id: 24, name: "シータイノベーションズ" },
    { id: 25, name: "イオタエンタープライズ" },
    { id: 26, name: "カッパシステムズ" },
    { id: 27, name: "ラムダダイナミクス" },
    { id: 28, name: "ミューネットワークス" },
    { id: 29, name: "ニューソリューションズ" },
    { id: 30, name: "クシーテクノロジーズ" },
    { id: 31, name: "オミクロンイノベーションズ" },
    { id: 32, name: "パイエンタープライズ" },
    { id: 33, name: "ローシステムズ" },
    { id: 34, name: "シグマダイナミクス" },
    { id: 35, name: "タウネットワークス" },
    { id: 36, name: "ウプシロンソリューションズ" },
    { id: 37, name: "ファイテクノロジーズ" },
    { id: 38, name: "カイイノベーションズ" },
    { id: 39, name: "プサイエンタープライズ" },
    { id: 40, name: "オメガシステムズ" },
    { id: 41, name: "アペックステクノロジーズ" },
    { id: 42, name: "サミットソリューションズ" },
    { id: 43, name: "ゼニスイノベーションズ" },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [filteredData, setFilteredData] = useState(data);

  // 検索機能
  useEffect(() => {
    if (searchQuery) {
      setFilteredData(
        data.filter((company) =>
          company.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredData(data);
    }
    setCurrentPage(1);
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">No.</TableHead>
            <TableHead>会社名</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentData.map((company) => (
            <TableRow key={company.id} className="hover:bg-gray-100">
              <TableCell>{company.id}</TableCell>
              <TableCell>{company.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" onClick={() => handlePageChange(1)}>
              {currentPage} / {totalPages}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() =>
                handlePageChange(Math.min(currentPage + 1, totalPages))
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default CompanyList;
