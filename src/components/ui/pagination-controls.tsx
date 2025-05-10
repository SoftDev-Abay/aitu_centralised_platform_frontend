import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface PaginationControlsProps {
  totalItems: number;
  itemsPerPage: number;
  visiblePages?: number;
}

export default function PaginationControls({
  totalItems,
  itemsPerPage,
  visiblePages = 5,
}: PaginationControlsProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const calculatePageRange = (): [number, number] => {
    const startPage =
      currentPage % visiblePages === 0
        ? currentPage - visiblePages + 1
        : currentPage - (currentPage % visiblePages) + 1;
    const endPage = Math.min(startPage + visiblePages - 1, totalPages);
    return [startPage, endPage];
  };

  const [startPage, endPage] = calculatePageRange();

  const goToPage = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  return (
    <div className="flex justify-center items-center gap-2 font-medium">
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full w-10 h-10"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ArrowLeft className="w-6 h-6" />
      </Button>

      {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
        const page = startPage + i;
        const isActive = page === currentPage;
        return (
          <Button
            key={page}
            variant="ghost"
            size="icon"
            className={`rounded-full w-10 h-10 ${
              isActive
                ? "border border-brand-primary text-brand-primary hover:bg-transparent"
                : ""
            }`}
            onClick={() => goToPage(page)}
          >
            {page}
          </Button>
        );
      })}

      <Button
        variant="ghost"
        size="icon"
        className="rounded-full w-10 h-10"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ArrowRight className="w-6 h-6" />
      </Button>
    </div>
  );
}
