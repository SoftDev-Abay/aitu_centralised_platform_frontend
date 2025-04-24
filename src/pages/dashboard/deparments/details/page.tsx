// src/pages/departments/DepartmentDetailsPage.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  useGetDepartmentQuery,
  useGetDepartmentUsersQuery,
  useRemoveUserFromDepartmentMutation,
  useAddUserToDepartmentMutation,
  useDeleteDepartmentMutation,
} from "@/features/departments/departmentsApiSlice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function DepartmentDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const deptId = Number(id);
  const navigate = useNavigate();
  const [newUserId, setNewUserId] = useState("");

  // department info
  const { data: dept, isLoading: deptLoading } = useGetDepartmentQuery(deptId);

  // users in dept
  const {
    data: usersPage,
    isLoading: usersLoading,
    refetch: refetchUsers,
  } = useGetDepartmentUsersQuery({ departmentID: deptId, page: 1, limit: 10 });

  const [removeUser] = useRemoveUserFromDepartmentMutation();
  const [addUser, { isLoading: adding }] = useAddUserToDepartmentMutation();
  const [deleteDept, { isLoading: deleting }] = useDeleteDepartmentMutation();

  const handleRemove = async (userId: number) => {
    await removeUser({ departmentID: deptId, userID: userId }).unwrap();
    refetchUsers();
  };

  const handleAdd = async () => {
    if (!newUserId) return;
    await addUser({ departmentID: deptId, userID: Number(newUserId) }).unwrap();
    setNewUserId("");
    refetchUsers();
  };

  const handleDeleteDept = async () => {
    if (!confirm("Are you sure you want to delete this department?")) return;
    await deleteDept(deptId).unwrap();
    navigate("/dashboard/departments");
  };

  if (deptLoading) return <div>Loading…</div>;
  if (!dept) return <div className="p-6">Department not found.</div>;

  return (
    <div className="p-6 max-w-3xl w-full mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Department Details</h1>
      <Card className="p-4 space-y-2">
        <div>
          <strong>ID:</strong> {dept.id}
        </div>
        <div>
          <strong>Name:</strong> {dept.name}
        </div>
        <div>
          <strong>Created:</strong> {new Date(dept.created_at).toLocaleString()}
        </div>
        <div>
          <strong>Updated:</strong> {new Date(dept.updated_at).toLocaleString()}
        </div>
      </Card>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Users in this Department</h2>
        {usersLoading ? (
          <div>Loading users…</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["ID", "Username", "Role ID", "Disabled", ""].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-2 text-left text-sm font-medium text-gray-700"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {usersPage?.users.map((u) => (
                <tr key={u.id}>
                  <td className="px-4 py-2">{u.id}</td>
                  <td className="px-4 py-2">{u.username}</td>
                  <td className="px-4 py-2">{u.role_id}</td>
                  <td className="px-4 py-2">{u.disabled ? "Yes" : "No"}</td>
                  <td className="px-4 py-2">
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleRemove(u.id)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="flex gap-2">
          <Input
            placeholder="User ID to add"
            value={newUserId}
            onChange={(e) => setNewUserId(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleAdd} disabled={adding}>
            {adding ? "Adding…" : "Add User"}
          </Button>
        </div>
      </section>

      <div className="text-right">
        <Button
          variant="destructive"
          onClick={handleDeleteDept}
          disabled={deleting}
        >
          {deleting ? "Deleting…" : "Delete Department"}
        </Button>
      </div>
    </div>
  );
}
