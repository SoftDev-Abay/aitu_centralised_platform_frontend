import { useGetPermissionsQuery } from "@/features/permissions/permissionsApiSlice";
import {
  selectPermissionEntities,
  selectPermissionIds,
} from "@/features/permissions/permissionsSlice";
import { useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
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

export default function PermissionsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  const { data, isLoading, isError } = useGetPermissionsQuery({
    page,
    limit,
  });

  const ids = useSelector(selectPermissionIds) as number[];
  const entities = useSelector(selectPermissionEntities) as Record<number, any>;

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
      <h1 className="text-2xl font-bold mb-6">Permissions</h1>

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      ) : !isError ? (
        <>
          <div className="flex flex-col gap-4">
            {ids.map((id) => (
              <Link key={id} to={`/dashboard/permissions/${id}`}>
                <Card className="px-6 py-4">
                  <div className="w-full flex flex-col gap-3">
                    <div className="flex justify-between">
                      <span className="font-semibold">ID:</span>
                      <span>{id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Name:</span>
                      <span>{entities[id]?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Description:</span>
                      <span>{entities[id]?.description || "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Object ID:</span>
                      <span>{entities[id]?.object_id}</span>
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
                      className={page === 1 ? "pointer-events-none opacity-50" : ""}
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
                      className={page >= pageCount ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
      ) : (
        <div>Error loading permissions.</div>
      )}

      <div className="mt-6 flex justify-end">
        <Link to="/dashboard/permissions/new">
          <Button variant="outline" className="w-32">
            Create
          </Button>
        </Link>
      </div>
    </div>
  );
}
