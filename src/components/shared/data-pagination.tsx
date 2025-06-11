// src/components/ui/Pagination.tsx
import { Button } from "@/components/ui/button";

export interface PaginationProps {
  currentPage: number; // 1-based
  count: number; // total number of items
  pageSize?: number; // number of items per page
  onPageChange: (page: number) => void;
  visiblePages?: number; // how many page-buttons to show (default: 4)
}

export function DataPagination({
  currentPage,
  onPageChange,
  count,
  pageSize = 10,
  visiblePages = 4,
}: PaginationProps) {
  // compute start/end (1-based)

  const totalPages = Math.ceil(count / pageSize);

  if (totalPages <= 1) return null;

  const half = Math.floor(visiblePages / 2);
  let start = Math.max(1, currentPage - half);
  let end = Math.min(totalPages, start + visiblePages - 1);
  if (end - start + 1 < visiblePages) {
    start = Math.max(1, end - visiblePages + 1);
  }

  return (
    <div className="flex items-center justify-between py-4">
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
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
        Next
      </Button>
    </div>
  );
}
