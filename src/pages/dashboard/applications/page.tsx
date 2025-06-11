import { useSetNavbarTitle } from "@/components/layout/shared/navbar/use-set-navbar-title";
import { DataTable } from "@/components/shared/data-table/data-table";
import Section from "@/components/ui/section";
import SmartBreadcrumbs from "@/components/ui/smart-bread-crumbs";
import { useGetApplicationsByVisitorQuery } from "@/features/applications/applicationRequestsApiSlice";
import { useSearchParams } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon } from "lucide-react";
import { DataPagination } from "@/components/shared/data-pagination";

const MyApplicationsListPage = () => {
  useSetNavbarTitle("My applications");

  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);

  const { data, isError } = useGetApplicationsByVisitorQuery({
    page: page - 1,
    pageSize,
  });

  if (isError)
    return <div className="p-6 text-red-500">Ошибка загрузки сотрудников.</div>;

  return (
    <>
      <Section
        variant="wide"
        className="pt-[80px] pb-[37px] bg-brand-gray-bluish h-full flex-grow"
      >
        <div className="mb-[37px]">
          <SmartBreadcrumbs />
          <h1 className="text-[32px] max-w-[409px] font-bold mb-10 leading-12">
            My Applications
          </h1>
        </div>
        <DataTable
          columns={[
            {
              accessorKey: "clubId",
              header: "Сlub id",
            },
            {
              accessorKey: "status",
              header: "Status",
              cell: ({ getValue }) => {
                return (
                  <span
                    className={`${
                      getValue() === "ANSWERED"
                        ? "text-brand-success"
                        : "text-yellow-200"
                    }`}
                  >
                    {String(getValue())}
                  </span>
                );
              },
            },
            { accessorKey: "responseMessage", header: "Responce Comment" },
            { accessorKey: "respondedDate", header: "Responded Date" },
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
          data={data?.data ?? []}
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
    </>
  );
};

export default MyApplicationsListPage;
