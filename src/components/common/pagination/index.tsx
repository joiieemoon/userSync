import type { CommanPaginationProps } from "../types";

export default function Pagination({
  page,
  totalPages,
  onPageChange,
  limit,
  onLimitChange,
  totalitems,
}: CommanPaginationProps) {
  const getPages = () => {
    const total = totalPages;
    const current = page;

    if (total <= 5) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];

    const left = current - 1;
    const right = current + 1;

    pages.push(1);

    if (current > 3) {
      pages.push("...");
    }

    for (let i = left; i <= right; i++) {
      if (i > 1 && i < total) {
        pages.push(i);
      }
    }

    if (current < total - 2) {
      pages.push("...");
    }

    pages.push(total);

    return pages;
  };

  const handlePrev = () => {
    if (page > 1) onPageChange(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) onPageChange(page + 1);
  };

  return (
    <div className="flex items-center justify-between mt-6">
     
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3  w-full p-3">
        {/* Left side */}
        <div className="flex items-center gap-2 w-full md:w-auto ">
          <label className="text-sm whitespace-nowrap text-gray-400">
            Items Per Page:
          </label>

          <select
            title="select"
            value={limit}
            onChange={(e) => onLimitChange(Number(e.target.value))}
            className="py-1 px-2 text-sm border rounded-lg bg-transparent dark:text-white dark:border-gray-700 "
          >
            <option value="2">2</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>

        {/* Right side */}
        <p className="text-sm text-gray-500 dark:text-gray-400 w-full md:w-auto text-left md:text-right ">
          Page <span className="font-medium">{page}</span> of{" "}
          <span className="font-medium">{totalPages}</span>
          {totalitems ? <span> out of {totalitems}</span> : ""}
        </p>
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className="px-3 py-1.5 text-sm border rounded-lg bg-transparent dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
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
              key={`${p}-${index}`}
              onClick={() => onPageChange(Number(p))}
              className={`flex items-center justify-center w-10 h-10 text-sm font-medium rounded-lg border transition ${
                p === page
                  ? "bg-brand-500 text-white border-brand-500"
                  : "text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
              }`}
            >
              {p}
            </button>
          ),
        )}

        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className="px-3 py-1.5 text-sm border rounded-lg dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}
