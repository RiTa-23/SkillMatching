"use client";

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
import { useState } from "react";

const CompanyList = () => {
  const data = [
    { id: 1, name: "Company 1" },
    { id: 2, name: "Company 2" },
    { id: 3, name: "Company 3" },
    { id: 4, name: "Company 4" },
    { id: 5, name: "Company 5" },
    { id: 6, name: "Company 6" },
    { id: 7, name: "Company 7" },
    { id: 8, name: "Company 8" },
    { id: 9, name: "Company 9" },
    { id: 10, name: "Company 10" },
    { id: 11, name: "Company 11" },
    { id: 12, name: "Company 12" },
    { id: 13, name: "Company 13" },
    { id: 14, name: "Company 14" },
    { id: 15, name: "Company 15" },
    { id: 16, name: "Company 16" },
    { id: 17, name: "Company 17" },
    { id: 18, name: "Company 18" },
    { id: 19, name: "Company 19" },
    { id: 20, name: "Company 20" },
    { id: 21, name: "Company 21" },
    { id: 22, name: "Company 22" },
    { id: 23, name: "Company 23" },
    { id: 24, name: "Company 24" },
    { id: 25, name: "Company 25" },
    { id: 26, name: "Company 26" },
    { id: 27, name: "Company 27" },
    { id: 28, name: "Company 28" },
    { id: 29, name: "Company 29" },
    { id: 30, name: "Company 30" },
    { id: 31, name: "Company 31" },
    { id: 32, name: "Company 32" },
    { id: 33, name: "Company 33" },
    { id: 34, name: "Company 34" },
    { id: 35, name: "Company 35" },
    { id: 36, name: "Company 36" },
    { id: 37, name: "Company 37" },
    { id: 38, name: "Company 38" },
    { id: 39, name: "Company 39" },
    { id: 40, name: "Company 40" },
    { id: 41, name: "Company 41" },
    { id: 42, name: "Company 42" },
    { id: 43, name: "Company 43" },
    { id: 44, name: "Company 44" },
    { id: 45, name: "Company 45" },
    { id: 46, name: "Company 46" },
    { id: 47, name: "Company 47" },
    { id: 48, name: "Company 48" },
    { id: 49, name: "Company 49" },
    { id: 50, name: "Company 50" },
    { id: 51, name: "Company 51" },
    { id: 52, name: "Company 52" },
    { id: 53, name: "Company 53" },
    { id: 54, name: "Company 54" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  // const maxPageNumbersToShow = 3;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const currentData = data.slice(
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
            <TableRow key={company.id} className="hover:bg-gray-100">
              <TableCell className="">{company.id}</TableCell>
              <TableCell className="">{company.name}</TableCell>
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
