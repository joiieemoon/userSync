import {
  AngleDownIcon,
  ArrowDownIcon,
  ChevronDownIcon,
} from "../../../assets/icons";

import type { CommanPaginationProps } from "../types";
export default function Pagination({
  page,
  totalPages,
  onPageChange,
  limit,
}: CommanPaginationProps) {
 
  const getPages = () => {
    const pages: (number | string)[] = [];

    const maxVisible = 3;
    const total = totalPages;

    if (total <= 7) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
      return pages;
    }

    const start = Math.max(2, page - 1);
    const end = Math.min(total - 1, page + 1);

    pages.push(1);

    if (start > 2) {
      pages.push("...");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < total - 1) {
      pages.push("...");
    }

    pages.push(total);

    return pages;
  };
  return (
    <div className="flex items-center justify-between mt-6">
      {/* Left */}

      <div className="relative w-14 ">
        <select className="w-full py-1 pl-3 pr-2 text-sm text-gray-800 bg-transparent border border-gray-300 rounded-lg appearance-none dark:bg-gray-900 h-9 shadow-theme-xs focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-500/10">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="50">50</option>
        </select>

        {/* Icon */}
        <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">
          <ChevronDownIcon className="w-4 h-4" />
        </span>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 flex ">
        Page <span className="font-medium">{page}</span> of {"  "}
        <span className="font-medium">{totalPages}</span>
      </p>

      {/* Right */}
      <div className="flex items-center gap-1">
        {/* Prev */}
        <button
          variant="outline"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="bg-transparent text-black px-3 py-1.5 text-sm border rounded-lg dark:border-gray-700 disabled:opacity-50"
        >
          Prev
        </button>


        {getPages().map((p, index) =>
          p === "..." ? (
            <span
              key={index}
              className="flex items-center justify-center w-10 h-10 text-sm text-gray-500"
            >
              ...
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(Number(p))}
              className={`flex items-center justify-center w-10 h-10 text-sm font-medium rounded-lg border ${
                p === page
                  ? "bg-brand-500 text-white border-brand-500"
                  : "text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              {p}
            </button>
          ),
        )}

        {/* Next */}
        <button
          variant="outline"
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="px-3 py-1.5 text-sm border rounded-lg dark:border-gray-700 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
