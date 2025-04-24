import { useGetRolesQuery } from "@/features/roles/rolesApiSlice";
import { selectRoleEntities, selectRoleIds } from "@/features/roles/rolesSlice";
import { useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function RolesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  const { data, isLoading, isError } = useGetRolesQuery({ page, limit });
  const ids = useSelector(selectRoleIds) as number[];
  const entities = useSelector(selectRoleEntities) as Record<number, any>;

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
      <h1 className="text-2xl font-bold mb-6">Roles</h1>

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      ) : isError ? (
        <div>Error loading roles.</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left px-4 py-2 border">ID</th>
                  <th className="text-left px-4 py-2 border">Name</th>
                  <th className="text-left px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {ids.map((id) => (
                  <tr key={id} className="border-t">
                    <td className="px-4 py-2 border">{id}</td>
                    <td className="px-4 py-2 border">{entities[id]?.name}</td>
                    <td className="px-4 py-2 border">
                      <Link
                        to={`/dashboard/roles/${id}`}
                        className="text-blue-500 hover:underline"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
      )}

      <div className="mt-6 flex justify-end">
        <Link to="/dashboard/roles/new">
          <Button variant="outline" className="w-32">
            Create Role
          </Button>
        </Link>
      </div>
    </div>
  );
}
