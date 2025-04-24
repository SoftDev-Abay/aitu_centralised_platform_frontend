import { useGetUsersQuery } from "@/features/users/usersApiSlice";
import { selectUserEntities, selectUserIds } from "@/features/users/usersSlice";
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

export default function UsersPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  const { data, isLoading, isError } = useGetUsersQuery({ page, limit });
  const ids = useSelector(selectUserIds) as number[];
  const entities = useSelector(selectUserEntities) as Record<number, any>;

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
      <h1 className="text-2xl font-bold mb-6">Users</h1>

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      ) : isError ? (
        <div>Error loading users.</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left px-4 py-2 border">id</th>
                  <th className="text-left px-4 py-2 border">username</th>
                  <th className="text-left px-4 py-2 border">uuid</th>
                  <th className="text-left px-4 py-2 border">role_id</th>
                  <th className="text-left px-4 py-2 border">updated_at</th>
                  <th className="text-left px-4 py-2 border">created_at</th>
                  <th className="text-left px-4 py-2 border">disabled</th>
                </tr>
              </thead>
              <tbody>
                {ids.map((id) => (
                  <tr key={id} className="border-t">
                    <td className="px-4 py-2 border">{id}</td>
                    <td className="px-4 py-2 border">
                      {entities[id]?.username}
                    </td>
                    <td className="px-4 py-2 border">{entities[id]?.uuid}</td>
                    <td className="px-4 py-2 border">
                      {entities[id]?.role_id}
                    </td>
                    <td className="px-4 py-2 border">
                      {new Date(entities[id]?.updated_at).toLocaleString()}
                    </td>
                    <td className="px-4 py-2 border">
                      {new Date(entities[id]?.created_at).toLocaleString()}
                    </td>
                    <td className="px-4 py-2 border">
                      {entities[id]?.disabled ? "Yes" : "No"}
                    </td>

                    <td className="px-4 py-2 border">
                      <Link
                        to={`/dashboard/users/${id}`}
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
        <Link to="/dashboard/users/new">
          <Button variant="outline" className="w-32">
            Create User
          </Button>
        </Link>
      </div>
    </div>
  );
}
