import { useSetNavbarTitle } from "@/components/layout/shared/navbar/use-set-navbar-title";
import { DataTable } from "@/components/shared/data-table/data-table";
import { Button } from "@/components/ui/button";
// import PaginationControls from "@/components/ui/pagination-controls";
import Section from "@/components/ui/section";
import SmartBreadcrumbs from "@/components/ui/smart-bread-crumbs";
import { Link } from "react-router-dom";
import { formatTime } from "@/lib/utils";
import { getFileDownloadUrl } from "@/lib/helpers";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontalIcon } from "lucide-react";
import { useGetAllEventsQuery } from "@/features/events/eventsApiSlice";

const ClubEventsListPage = () => {
  useSetNavbarTitle("Club Events");

  // const [searchParams, setSearchParams] = useSearchParams();
  // const page = parseInt(searchParams.get("page") || "1", 10);
  // const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);

  const { data, isLoading, isError } = useGetAllEventsQuery();
  // const { data, isLoading, isError, refetch } = useGetAllEventsQuery({
  //   page: page - 1,
  //   pageSize,
  // });

  if (isError || !data)
    return <div className="p-6 text-red-500">Ошибка загрузки сотрудников.</div>;

  // const totalPages = Math.ceil(data.count / pageSize);

  return (
    <Section
      variant="wide"
      className="pt-[80px] pb-[37px] bg-brand-gray-bluish h-full flex-grow"
    >
      <div className="mb-[37px] flex justify-between">
        <div>
          <SmartBreadcrumbs />
          <h1 className="text-[32px] max-w-[409px] font-bold mb-10 leading-12">
            Events
          </h1>
        </div>
        <div>
          <Link to="/admin-panel/events/create">
            <Button>Create Event</Button>
          </Link>
        </div>
      </div>

      {isLoading && <p>Loading posts...</p>}
      {isError && (
        <p className="text-red-500">
          Failed to load posts.
          {/* <button onClick={() => refetch()} className="underline">
            Retry
          </button> */}
        </p>
      )}

      {!isLoading && !isError && (
        <>
          <DataTable
            columns={[
              {
                accessorKey: "title",
                header: "Post",
                cell: ({ row }) => (
                  // <Link
                  //   to={`/admin-panel/posts/${row.original.id}`}
                  //   className="text-blue-600 hover:underline"
                  // >
                  //   {row.original.title}
                  // </Link>
                  <div className="flex gap-5">
                    {row.original.imageIds && row.original.imageIds[0] && (
                      <img
                        src={getFileDownloadUrl(row.original.imageIds[0])}
                        alt=""
                        className="w-40 h-30"
                      />
                    )}
                    <div className="flex flex-col justify-between">
                      <p className="font-medium text-[17px]">
                        {row.original.name}
                      </p>
                      <p className="flex gap-2">
                        <span className="opacity-50">Date:</span>
                        <span className="opacity-90">
                          {formatTime(row.original.startDate, false)}
                        </span>
                      </p>
                    </div>
                  </div>
                ),
              },
              {
                accessorKey: "format",
                header: "Format",
              },
              {
                accessorKey: "address",
                header: "Address",
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
            data={data}
            // currentPage={page}
            // totalPages={totalPages}
            // visiblePages={4}
            // onPageChange={(newPage) =>
            //   setSearchParams({
            //     page: newPage.toString(),
            //     pageSize: pageSize.toString(),
            //   })
            // }
          />

          {/* <PaginationControls
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(newPage) =>
              setSearchParams({
                page: newPage.toString(),
                pageSize: pageSize.toString(),
              })
            }
            visiblePages={5}
          /> */}

          {/* <PaginationControls
            page={page}
            pageCount={pageCount}
            onPageChange={(newPage) => setPage(newPage)}
          /> */}
          {/* <PaginationControls
            totalItems={data.count}
            itemsPerPage={ITEMS_PER_PAGE}
          /> */}
          {/* <DataPagination

          /> */}
        </>
      )}
    </Section>
  );
};

export default ClubEventsListPage;
