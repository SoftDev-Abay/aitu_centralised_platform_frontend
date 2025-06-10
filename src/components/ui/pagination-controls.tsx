import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

export interface PaginationProps {
  currentPage: number; // 1-based
  onPageChange: (page: number) => void;
  count: number; // total number of items
  pageSize?: number; // number of items per page
  visiblePages?: number; // how many page-buttons to show (default: 4)
}

export default function PaginationControls({
  currentPage,
  count,
  pageSize = 10,
  onPageChange,
  visiblePages = 4,
}: PaginationProps) {
  const totalPages = Math.ceil(count / pageSize);

  if (totalPages < 1) {
    return null;
  }

  const getPageRange = () => {
    let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    let endPage = Math.min(totalPages, startPage + visiblePages - 1);

    // Adjust if we're at the end
    if (endPage - startPage + 1 < visiblePages) {
      startPage = Math.max(1, endPage - visiblePages + 1);
    }

    return { startPage, endPage };
  };

  const { startPage, endPage } = getPageRange();

  const renderPageButtons = () => {
    const buttons = [];

    // First page button
    if (startPage > 1) {
      buttons.push(
        <Button
          key={1}
          variant="ghost"
          size="icon"
          className="rounded-full w-10 h-10"
          onClick={() => onPageChange(1)}
        >
          1
        </Button>
      );
      if (startPage > 2) {
        buttons.push(
          <Button
            key="ellipsis-start"
            variant="ghost"
            size="icon"
            className="rounded-full w-10 h-10"
            disabled
          >
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        );
      }
    }

    // Middle pages
    for (let page = startPage; page <= endPage; page++) {
      buttons.push(
        <Button
          key={page}
          variant={page === currentPage ? "default" : "ghost"}
          size="icon"
          className={`rounded-full w-10 h-10 ${
            page === currentPage ? "pointer-events-none" : ""
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      );
    }

    // Last page button
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(
          <Button
            key="ellipsis-end"
            variant="ghost"
            size="icon"
            className="rounded-full w-10 h-10"
            disabled
          >
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        );
      }
      buttons.push(
        <Button
          key={totalPages}
          variant="ghost"
          size="icon"
          className="rounded-full w-10 h-10"
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </Button>
      );
    }

    return buttons;
  };

  return (
    <div className="flex justify-center items-center gap-1 font-medium">
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full w-10 h-10"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>

      {renderPageButtons()}

      <Button
        variant="ghost"
        size="icon"
        className="rounded-full w-10 h-10"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="w-5 h-5" />
      </Button>
    </div>
  );
}
