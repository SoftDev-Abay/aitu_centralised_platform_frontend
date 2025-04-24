// PermissionDetailsPage.tsx
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useDeletePermissionMutation,
  useGetPermissionsQuery,
} from "@/features/permissions/permissionsApiSlice";
import { selectPermissionById } from "@/features/permissions/permissionsSlice";
import { RootState } from "@/app/store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PermissionDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const permission = useSelector((state: RootState) =>
    selectPermissionById(state, Number(id))
  );

  const [deletePermission, { isLoading }] = useDeletePermissionMutation();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await deletePermission({ id: Number(id) }).unwrap();
      navigate("/dashboard/permissions");
    } catch (err) {
      console.error("Failed to delete permission:", err);
    }
  };

  if (!permission) return <div className="p-6">Permission not found.</div>;

  return (
    <div className="p-6 max-w-xl w-full mx-auto">
      <h1 className="text-2xl font-bold mb-6">Permission Details</h1>
      <Card className="p-6 space-y-4">
        <div>
          <strong>ID:</strong> {permission.id}
        </div>
        <div>
          <strong>Name:</strong> {permission.name}
        </div>
        <div>
          <strong>Description:</strong> {permission.description}
        </div>
        <div>
          <strong>Object ID:</strong> {permission.object_id}
        </div>
      </Card>

      <div className="mt-4 flex justify-end gap-2">
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Deleting..." : "Delete"}
        </Button>
        <Link to={`/dashboard/permissions/${id}/edit`}>
          <Button variant="outline">Edit</Button>
        </Link>
      </div>
    </div>
  );
}
