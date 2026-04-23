type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function   Pagination({ page, totalPages, onPageChange }: Props) {
  const getPages = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-between mt-6">
      {/* Left */}
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Page <span className="font-medium">{page}</span> of{" "}
        <span className="font-medium">{totalPages}</span>
      </p>

      {/* Right */}
      <div className="flex items-center gap-1">
        {/* Prev */}
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="px-3 py-1.5 text-sm border rounded-lg dark:border-gray-700 disabled:opacity-50"
        >
          Prev
        </button>

        {/* Numbers */}
        {getPages().map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`px-3 py-1.5 text-sm rounded-lg border ${
              p === page
                ? "bg-brand-500 text-white border-brand-500"
                : "border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            {p}
          </button>
        ))}

        {/* Next */}
        <button
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
