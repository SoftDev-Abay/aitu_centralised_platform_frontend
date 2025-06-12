import { useSetNavbarTitle } from "@/components/layout/shared/navbar/use-set-navbar-title";
import { DataTable } from "@/components/shared/data-table/data-table";
import { Button } from "@/components/ui/button";
// import PaginationControls from "@/components/ui/pagination-controls";
import Section from "@/components/ui/section";
import SmartBreadcrumbs from "@/components/ui/smart-bread-crumbs";
import { Link, useSearchParams } from "react-router-dom";
import { getFileDownloadUrl } from "@/lib/helpers";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontalIcon } from "lucide-react";
import { useGetClubsQuery } from "@/features/clubs/clubsApiSlice";
import { DataPagination } from "@/components/shared/data-pagination";
import StatusBadge from "@/components/ui/status-badge";

const AdminClubListPage = () => {
  useSetNavbarTitle("Clubs");

  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);

  const {
    data,
    isLoading: _,
    isError,
    refetch: __,
  } = useGetClubsQuery({
    page: page - 1,
    pageSize,
  });
  console.log("data", data);

  if (isError)
    return <div className="p-6 text-red-500">Ошибка загрузки сотрудников.</div>;

  return (
    <Section
      variant="wide"
      className="pt-[80px] pb-[37px] bg-brand-gray-bluish h-full flex-grow"
    >
      <div className="mb-[37px] flex justify-between">
        <div>
          <SmartBreadcrumbs />
          <h1 className="text-[32px] max-w-[409px] font-bold mb-10 leading-12">
            Clubs
          </h1>
        </div>
        <div>
          <Link to="/admin-panel/clubs/create">
            <Button>Create Club</Button>
          </Link>
        </div>
      </div>

      {isError && (
        <p className="text-red-500">
          Failed to load posts.
          {/* <button onClick={() => refetch()} className="underline">
            Retry
          </button> */}
        </p>
      )}

      <DataTable
        columns={[
          {
            accessorKey: "title",
            header: "Club",
            cell: ({ row }) => (
              // <Link
              //   to={`/admin-panel/posts/${row.original.id}`}
              //   className="text-blue-600 hover:underline"
              // >
              //   {row.original.title}
              // </Link>
              <div className="flex gap-5">
                {row.original.images && row.original.images[0] && (
                  <img
                    src={getFileDownloadUrl(row.original.images[0])}
                    alt=""
                    className="w-40 h-30"
                  />
                )}
                <div className="flex flex-col justify-between">
                  <Link
                    className="font-medium text-[17px]"
                    to={`/admin-panel/clubs/view/${row.original.id}`}
                  >
                    {row.original.name}
                  </Link>
                  <p className="flex gap-2">
                    <span className="opacity-50">Date:</span>
                    <span className="opacity-90">
                      {/* {row.original.forms.length} */}
                      {/* {formatTime(row.original.forms.length, false)} */}
                    </span>
                  </p>
                </div>
              </div>
            ),
          },
          // {
          //   accessorKey: "admins",
          //   header: "Admins count",
          //   cell: ({ row }) => row.original.adminIds.length,
          //   // cell: ({ row }) => row.original.admins.length,
          // },
          // {
          //   accessorKey: "members",
          //   header: "Members count",
          //   cell: ({ row }) => row.original.memberIds.length,
          // },
          {
            accessorKey: "status",
            header: "Status",
            cell: ({ getValue }) => {
              return <StatusBadge status={String(getValue())} />;
            },
          },
          {
            header: "",
            id: "actions",
            cell: () => (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
                      size="icon"
                    >
                      <MoreHorizontalIcon />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-32">
                    <DropdownMenuItem>Preview</DropdownMenuItem>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ),
          },
        ]}
        data={data?.data || []}
      />
      <DataPagination
        count={data?.count || 0}
        pageSize={pageSize}
        currentPage={page!}
        onPageChange={(newPage) =>
          setSearchParams({
            page: newPage.toString(),
            pageSize: pageSize.toString(),
          })
        }
      />
    </Section>
  );
};

export default AdminClubListPage;
