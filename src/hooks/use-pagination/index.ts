import { useState, useEffect, useMemo } from "react";
import type { UsePaginationProps } from "../../types/interfaces";




export function usePagination<T>({
    data,
    itemsPerPage = 10,
    searchTerm = "",
    sortField,
    sortOrder = "asc",
    filterFields = [],
}: UsePaginationProps<T>) {
    const [currentPage, setCurrentPage] = useState(1);
    const [sortedData, setSortedData] = useState<T[]>(data);


    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, data]);


    const filteredData = useMemo(() => {
        if (!searchTerm) return data;

        return data.filter((item) =>
            filterFields.some((field) =>
                String(item[field] || "")
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
            )
        );
    }, [data, searchTerm, filterFields]);



    useEffect(() => {
        if (!sortField) {
            setSortedData(filteredData);
            return;
        }

        const worker = new Worker(
            new URL("../../workers/sortedata-worker", import.meta.url)
        );

        worker.postMessage({ data: filteredData, sortField, sortOrder });

        worker.onmessage = (e) => {
            setSortedData(e.data);
            worker.terminate();
        };

        return () => worker.terminate();
    }, [filteredData, sortField, sortOrder]);


    const totalPages = Math.ceil(sortedData.length / itemsPerPage);

    const currentData = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return sortedData.slice(start, start + itemsPerPage);
    }, [currentPage, sortedData, itemsPerPage]);

    const goToPage = (page: number) => {
        const validPage = Math.max(1, Math.min(page, totalPages));
        setCurrentPage(validPage);
    };

    return {
        currentData,
        currentPage,
        totalPages,
        goToPage,
    };
}