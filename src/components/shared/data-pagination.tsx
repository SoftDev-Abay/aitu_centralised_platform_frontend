// src/components/ui/Pagination.tsx
import React from "react";
import { Button } from "@/components/ui/button";

export interface PaginationProps {
  currentPage: number; // 1-based
  totalPages: number;
  onPageChange: (page: number) => void;
  visiblePages?: number; // how many page-buttons to show (default: 4)
}

export function DataPagination({
  currentPage,
  totalPages,
  onPageChange,
  visiblePages = 4,
}: PaginationProps) {
  // compute start/end (1-based)
  const half = Math.floor(visiblePages / 2);
  let start = Math.max(1, currentPage - half);
  let end = Math.min(totalPages, start + visiblePages - 1);
  if (end - start + 1 < visiblePages) {
    start = Math.max(1, end - visiblePages + 1);
  }


  console.log("start", start, "end", end, "currentPage", currentPage, "totalPages", totalPages);

  return (
    <div className="flex items-center justify-between ">
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Предыдущая
      </Button>

      <div className="space-x-2">
        {Array.from({ length: end - start + 1 }, (_, i) => {
          const page = start + i;
          return (
            <Button
              key={page}
              size="icon"
              variant={page === currentPage ? "default" : "outline"}
              onClick={() => onPageChange(page)}
            >
              {page}
            </Button>
          );
        })}
      </div>

      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Следующая
      </Button>
    </div>
  );
}
