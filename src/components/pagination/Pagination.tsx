"use client";

 import { Pagination } from "flowbite-react";

interface PaginationMainProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export  function PaginationMain({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationMainProps) {
  return (
    <div className="flex justify-center mt-6 overflow-x-auto">
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        showIcons
        onPageChange={(page) => onPageChange(Number(page))} 
      />
    </div>
  );
}
