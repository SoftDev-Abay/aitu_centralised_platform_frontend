import { useSetNavbarTitle } from "@/components/layout/shared/navbar/use-set-navbar-title";
import { DataTable } from "@/components/shared/data-table/data-table";
import Section from "@/components/ui/section";
import SmartBreadcrumbs from "@/components/ui/smart-bread-crumbs";
import StatusBadge from "@/components/ui/status-badge";
import { useGetMyClubsQuery } from "@/features/clubs/clubsApiSlice";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";

const today = new Date();
const oneMonthAgo = new Date();
oneMonthAgo.setMonth(today.getMonth() - 1);

const MyClubsListPage = () => {
  useSetNavbarTitle("My Clubs");

  const { user } = useAuth();

  const { data, isError } = useGetMyClubsQuery({ userId: user?.id! });
  // const { data, isLoading, isError } = useGetClubsQuery({});

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
            My Clubs
          </h1>
        </div>
        <DataTable
          columns={[
            {
              accessorKey: "club",
              header: "CLUB",
              cell: ({ row }) => (
                <div className="">
                  <Link
                    to={`/dashboard/clubs/${row.original.id}`}
                    key={row.original.id}
                    className="w-full"
                  >
                    {row.original.name}
                  </Link>
                </div>
              ),
            },
            // {
            //   accessorKey: "club",
            //   header: "CLUB",
            //   cell: ({ row }) => (
            //     <div className="flex gap-5">
            //       <img src={row.original.urlImg} alt="" className="w-40 h-30" />
            //       <div className="flex flex-col justify-between">
            //         <p className="font-medium text-[17px]">
            //           {row.original.title}
            //         </p>
            //         <p>
            //           <span className="opacity-50">student position:</span>
            //           <span className="opacity-90">
            //             {row.original.position}
            //           </span>
            //         </p>
            //       </div>
            //     </div>
            //   ),
            // },
            {
              accessorKey: "status",
              header: "Status",
              cell: ({ getValue }) => {
                return <StatusBadge status={String(getValue())} />;
              },
            },
            { accessorKey: "date", header: "User Date" },
            { accessorKey: "role", header: "Role" },
            {
              header: "",
              id: "actions",
              cell: ({ row }) => (
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
                      <Link to={`/dashboard/clubs/${row.original.id}`}>
                        <DropdownMenuItem>Preview</DropdownMenuItem>
                      </Link>

                      {user?.clubs.find(
                        (club) => club.id === row.original.id
                      ) && (
                        <Link
                          to={`/dashboard/clubs/control-panel/${row.original.id}`}
                        >
                          <DropdownMenuItem>Control Panel</DropdownMenuItem>
                        </Link>
                      )}

                      {/* <DropdownMenuItem>Edit</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>Delete</DropdownMenuItem> */}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ),
            },
          ]}
          // data={clubs}
          data={data ?? []}
        />
      </Section>
    </>
  );
};

export default MyClubsListPage;
