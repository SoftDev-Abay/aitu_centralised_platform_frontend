import { Link, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import {
  useAddClubAdminMutation,
  useAddClubMemberMutation,
  useGetClubByIdQuery,
  useRemoveClubAdminMutation,
  useRemoveClubMemberMutation,
} from "@/features/clubs/clubsApiSlice";
import { useGetAllUsersQuery } from "@/features/users/usersApiSlice";
import { useGetFormsByClubQuery } from "@/features/applications/applicationFormsApiSlice";
import { useGetApplicationsByFormQuery } from "@/features/applications/applicationRequestsApiSlice";
import { skipToken } from "@reduxjs/toolkit/query";
import Section from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/shared/data-table/data-table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ClubAdminDashboardPage = () => {
  const { id: clubId } = useParams<{ id: string }>();
  const { data: club, refetch } = useGetClubByIdQuery({ id: clubId! });
  const { data: users } = useGetAllUsersQuery();
  const { data: formsData } = useGetFormsByClubQuery({ clubId: clubId! });
  const [selectedFormId, setSelectedFormId] = useState<string | undefined>();

  const { data: applications = [] } = useGetApplicationsByFormQuery(
    selectedFormId ? { formId: selectedFormId } : skipToken
  );

  const [addAdmin] = useAddClubAdminMutation();
  const [removeAdmin] = useRemoveClubAdminMutation();
  const [addMember] = useAddClubMemberMutation();
  const [removeMember] = useRemoveClubMemberMutation();

  const [selectedUserId, setSelectedUserId] = useState<string | undefined>();

  const handleAddAdmin = async () => {
    if (!selectedUserId) return;
    await addAdmin({ clubId: clubId!, adminId: +selectedUserId });
    refetch();
  };

  const handleAddMember = async () => {
    if (!selectedUserId) return;
    await addMember({ clubId: clubId!, memberId: +selectedUserId });
    refetch();
  };

  const handleRemoveAdmin = async (adminId: number) => {
    await removeAdmin({ clubId: clubId!, adminId });
    refetch();
  };

  const handleRemoveMember = async (memberId: number) => {
    await removeMember({ clubId: clubId!, memberId });
    refetch();
  };

  return (
    <Section variant="wide" className="pt-10 pb-10">
      <h1 className="text-3xl font-bold mb-6">Club Admin Panel</h1>

      <Card className="mb-6">
        <CardHeader>
          <h2 className="text-xl font-semibold">Add User to Club</h2>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row items-center gap-4">
          <Select onValueChange={setSelectedUserId}>
            <SelectTrigger className="w-[300px]">
              <SelectValue placeholder="Select user" />
            </SelectTrigger>
            <SelectContent>
              {users?.map((user) => (
                <SelectItem key={user.id} value={user.id.toString()}>
                  {user.firstName} {user.lastName} ({user.email})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button onClick={handleAddAdmin}>Add as Admin</Button>
          <Button onClick={handleAddMember} variant="secondary">
            Add as Member
          </Button>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <h2 className="text-xl font-semibold">Admins</h2>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { accessorKey: "id", header: "ID" },
              { accessorKey: "firstName", header: "First Name" },
              { accessorKey: "lastName", header: "Last Name" },
              { accessorKey: "email", header: "Email" },
              { accessorKey: "department", header: "Department" },
              {
                id: "actions",
                header: "Actions",
                cell: ({ row }: { row: any }) => (
                  <Button
                    variant="destructive"
                    onClick={() => handleRemoveAdmin(row.original.id)}
                  >
                    Remove
                  </Button>
                ),
              },
            ]}
            data={club?.admins ?? []}
          />
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <h2 className="text-xl font-semibold">Members</h2>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { accessorKey: "id", header: "ID" },
              { accessorKey: "firstName", header: "First Name" },
              { accessorKey: "lastName", header: "Last Name" },
              { accessorKey: "email", header: "Email" },
              { accessorKey: "department", header: "Department" },
              {
                id: "actions",
                header: "Actions",
                cell: ({ row }: { row: any }) => (
                  <Button
                    variant="destructive"
                    onClick={() => handleRemoveMember(row.original.id)}
                  >
                    Remove
                  </Button>
                ),
              },
            ]}
            data={club?.members ?? []}
          />
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <h2 className="text-xl font-semibold">Forms</h2>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { accessorKey: "id", header: "ID" },
              { accessorKey: "createdBy", header: "Created By" },
              { accessorKey: "createdAt", header: "Created At" },
              { accessorKey: "deadline", header: "Deadline" },
              {
                id: "actions-test",
                header: "",
                cell: ({ row }: { row: any }) => (
                  <Link
                    className="text-blue-400"
                    to={`/admin-panel/survey/submit/${row.original.id}`}
                  >
                    Test
                  </Link>
                ),
              },
              {
                id: "actions",
                header: "",
                cell: ({ row }: { row: any }) => (
                  <Button
                    variant="link"
                    onClick={() => setSelectedFormId(row.original.id)}
                  >
                    View Requests
                  </Button>
                ),
              },
            ]}
            data={club?.forms ?? []}
          />
        </CardContent>
      </Card>

      {selectedFormId && (
        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-xl font-semibold">
              Requests for Form {selectedFormId}
            </h2>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={[
                { accessorKey: "id", header: "ID" },
                { accessorKey: "createdBy", header: "Created By" },
                { accessorKey: "createdAt", header: "Created At" },
                { accessorKey: "status", header: "Status" },
                {
                  header: "",
                  id: "action/s",
                  cell: ({ row }: { row: any }) => (
                    <Link
                      className="text-blue-400"
                      to={`/admin-panel/survey/responce/${row.original.id}?surveyId=${selectedFormId}`}
                    >
                      View
                    </Link>
                  ),
                },
              ]}
              data={applications}
            />
          </CardContent>
        </Card>
      )}

      <div className="flex justify-end mt-4">
        <Link to={`/admin-panel/survey/create?clubId=${clubId}`}>
          <Button>Create Form</Button>
        </Link>
      </div>
    </Section>
  );
};

export default ClubAdminDashboardPage;
