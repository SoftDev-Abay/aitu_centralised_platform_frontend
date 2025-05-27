import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const pageIndex = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();

  // Determine visible page range
  const visiblePages = 4;
  const startPage = Math.max(
    0,
    Math.min(pageIndex - Math.floor(visiblePages / 2), pageCount - visiblePages)
  );
  const endPage = Math.min(startPage + visiblePages, pageCount);

  return (
    <div className="flex justify-between items-center pt-4 gap-4">
      <div>
        {table.getCanPreviousPage() && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
          >
            Previous
          </Button>
        )}
      </div>

      <div className="flex gap-1">
        {Array.from({ length: endPage - startPage }, (_, i) => {
          const page = startPage + i;
          const formattedPage = page + 1 < 10 ? `0${page + 1}` : `${page + 1}`;
          return (
            <Button
              key={page}
              size="icon"
              onClick={() => table.setPageIndex(page)}
              className={page === pageIndex ? "bg-primary text-white" : ""}
            >
              {formattedPage}
            </Button>
          );
        })}
      </div>

      <div>
        {table.getCanNextPage() && (
          <Button variant="outline" size="sm" onClick={() => table.nextPage()}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
}
