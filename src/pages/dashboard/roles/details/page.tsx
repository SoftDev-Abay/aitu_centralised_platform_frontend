// RoleDetailsPage.tsx
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useDeleteRoleMutation,
  useGetRolesQuery,
} from "@/features/roles/rolesApiSlice";
import { selectRoleById } from "@/features/roles/rolesSlice";
import { RootState } from "@/app/store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function RoleDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const role = useSelector((state: RootState) =>
    selectRoleById(state, Number(id))
  );

  const [deleteRole, { isLoading }] = useDeleteRoleMutation();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await deleteRole({ id: Number(id) }).unwrap();
      navigate("/dashboard/roles");
    } catch (err) {
      console.error("Failed to delete role:", err);
    }
  };

  if (!role) return <div className="p-6">Role not found.</div>;

  return (
    <div className="p-6 max-w-xl w-full mx-auto">
      <h1 className="text-2xl font-bold mb-6">Role Details</h1>
      <Card className="p-6 space-y-4">
        <div>
          <strong>ID:</strong> {role.id}
        </div>
        <div>
          <strong>Name:</strong> {role.name}
        </div>
      </Card>

      <div className="mt-4 flex justify-end gap-2">
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Deleting..." : "Delete"}
        </Button>
        <Link to={`/dashboard/roles/${id}/edit`}>
          <Button variant="outline">Edit</Button>
        </Link>
      </div>
    </div>
  );
}
