import { useGetObjectsQuery } from "@/features/objects/objectsApiSlice";
import {
  selectObjectIds,
  selectObjectEntities,
} from "@/features/objects/objectsSlice";
import { useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { RootState } from "@/app/store";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";

export default function ObjectsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10); // default to page 1
  const limit = parseInt(searchParams.get("limit") || "10", 10); // default to limit 10

  // Convert to 0-based for backend
  const { data, isLoading, isError } = useGetObjectsQuery({
    page: page,
    limit,
  });

  const objects = data?.objects ?? [];

  const count = data?.count ?? 0;
  const pageCount = Math.ceil(count / limit);

  const goToNextPage = () => {
    if (page < pageCount) {
      setSearchParams({ page: String(page + 1), limit: String(limit) });
    }
  };

  const goToPreviousPage = () => {
    if (page > 1) {
      setSearchParams({ page: String(page - 1), limit: String(limit) });
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Your Objects</h1>

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      ) : !isError ? (
        <>
          <div className="flex flex-col gap-4">
            {objects.map((obj) => (
              <Link key={obj.id} to={`/dashboard/objects/${obj.id}`}>
                <Card className="px-6 py-4">
                  <div className="w-full flex flex-col gap-3">
                    <div className="flex justify-between">
                      <span className="font-semibold">ID:</span>
                      <span>{obj.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Name:</span>
                      <span>{obj.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Description:</span>
                      <span>{obj.description || "N/A"}</span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {pageCount > 1 && (
            <div className="mt-6 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={goToPreviousPage}
                      className={
                        page === 1 ? "pointer-events-none opacity-50" : ""
                      }
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <span className="text-sm px-2 py-1 rounded bg-muted">
                      Page {page} of {pageCount}
                    </span>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      onClick={goToNextPage}
                      className={
                        page >= pageCount
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
      ) : (
        <div>Error loading objects.</div>
      )}

      <div className="mt-6 flex justify-end">
        <Link to="/dashboard/objects/new">
          <Button variant="outline" className="w-32">
            Create Object
          </Button>
        </Link>
      </div>
    </div>
  );
}
