"use client";

import Link from "next/link";
import { useState } from "react";

import {
  Pagination,
  PaginationContent,
  // PaginationEllipsis,
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

import type { Company } from "@/types/company";

interface CompanyListProps {
  companies: Company[];
}

const CompanyList = (props: CompanyListProps) => {
  const { companies } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(companies.length / itemsPerPage);
  // const maxPageNumbersToShow = 3;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const currentData = companies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // const getPageNumbers = () => {
  //   const startPage = Math.max(
  //     1,
  //     currentPage - Math.floor(maxPageNumbersToShow / 2)
  //   );
  //   const endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);

  //   const pageNumbers = [];
  //   for (let i = startPage; i <= endPage; i++) {
  //     pageNumbers.push(i);
  //   }
  //   return pageNumbers;
  // };

  return (
    <>
      <Table className="">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">No.</TableHead>
            <TableHead>会社名</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentData.map((company) => (
            <TableRow key={company.company_id} className="hover:bg-gray-100">
              <TableCell>
                <Link href={`/answerer/company/${company.company_id}`}>
                  {company.company_id}
                </Link>
              </TableCell>
              <TableCell>
                <Link href={`/answerer/company/${company.company_id}`}>
                  {company.company_name}
                </Link>
              </TableCell>
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
          {/* {getPageNumbers().map((pageNumber) => (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                href="#"
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          ))}
          {totalPages > maxPageNumbersToShow &&
            currentPage < totalPages - Math.floor(maxPageNumbersToShow / 2) && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
          {currentPage < totalPages - 1 && (
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={() => handlePageChange(totalPages)}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          )} */}
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
