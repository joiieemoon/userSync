"use client";

import { Pagination } from "flowbite-react";

import type { PaginationMainProps } from "../../../types/interfaces";
export function PaginationMain({
  currentPage,
  totalPages,
  onPageChange,
  ...rest
}: PaginationMainProps) {
  return (
    <div className="flex justify-center mt-6 overflow-x-auto   ">
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        showIcons
        onPageChange={(page) => onPageChange(Number(page))}
        {...rest}
      />
    </div>
  );
}
