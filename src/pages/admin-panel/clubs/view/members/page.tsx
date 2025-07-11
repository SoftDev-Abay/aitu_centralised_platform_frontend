import { useSetNavbarTitle } from "@/components/layout/shared/navbar/use-set-navbar-title";
import { DataTable } from "@/components/shared/data-table/data-table";
import Section from "@/components/ui/section";
import SmartBreadcrumbs from "@/components/ui/smart-bread-crumbs";
import { useParams, useSearchParams } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon } from "lucide-react";
import { useGetClubMembersQuery } from "@/features/clubs/clubsApiSlice";
import { useState } from "react";
import AddMemberModal from "@/features/clubs/components/modals/AddMemberModal";
import EditMemberRoleModal from "@/features/clubs/components/modals/EditMemberRoleModal";
import { DataPagination } from "@/components/shared/data-pagination";
import { ClubMemberDto } from "@/features/clubs/types";

const ClubMembersListPage = () => {
  useSetNavbarTitle("Club Members");

  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
  const { id: clubId } = useParams();

  const [editMemberOpen, setEditMemberOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<ClubMemberDto | null>(
    null
  );

  const {
    data,
    isLoading: _,
    isError,
  } = useGetClubMembersQuery({
    page: page - 1,
    pageSize,
    clubId: clubId ?? "",
  });

  const [addMemberOpen, setAddMemberOpen] = useState(false);

  if (isError)
    return <div className="p-6 text-red-500">Ошибка загрузки сотрудников.</div>;

  return (
    <>
      <Section
        variant="wide"
        className="pt-[80px] pb-[37px] bg-brand-gray-bluish h-full flex-grow"
      >
        <div className="mb-[77px] flex items-center justify-between">
          <div>
            <SmartBreadcrumbs />

            <h1 className="text-[32px] max-w-[409px] font-bold leading-12">
              Members
            </h1>
          </div>
          <Button onClick={() => setAddMemberOpen(true)}>Add member</Button>
        </div>
        <AddMemberModal
          open={addMemberOpen}
          onOpenChange={setAddMemberOpen}
          clubId={clubId ?? ""}
        />
        {selectedMember && (
          <EditMemberRoleModal
            open={editMemberOpen}
            onOpenChange={setEditMemberOpen}
            clubId={clubId ?? ""}
            member={selectedMember}
          />
        )}
        <DataTable
          columns={[
            { accessorKey: "id", header: "ID" },
            { accessorKey: "firstName", header: "First Name" },
            { accessorKey: "lastName", header: "Last Name" },
            { accessorKey: "role", header: "Role" },
            { accessorKey: "email", header: "Email" },
            { accessorKey: "department", header: "Department" },
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
                      <DropdownMenuItem>Preview</DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedMember(row.original);
                          setEditMemberOpen(true);
                        }}
                      >
                        Edit Role
                      </DropdownMenuItem>
                      {/* <DropdownMenuItem
                        onClick={() => {
                          setSelectedMember(row.original);
                          setEditMemberOpen(true);
                        }}
                      >
                        Edit Role
                      </DropdownMenuItem> */}
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

export default ClubMembersListPage;
