// UserDetailsPage.tsx
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "@/features/users/usersApiSlice";
import { selectUserById } from "@/features/users/usersSlice";
import { RootState } from "@/app/store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function UserDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const user = useSelector((state: RootState) =>
    selectUserById(state, Number(id))
  );

  const [deleteUser, { isLoading }] = useDeleteUserMutation();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await deleteUser({ id: Number(id) }).unwrap();
      navigate("/dashboard/users");
    } catch (err) {
      console.error("Failed to delete user:", err);
    }
  };

  if (!user) return <div className="p-6">User not found.</div>;

  return (
    <div className="p-6 max-w-xl w-full mx-auto">
      <h1 className="text-2xl font-bold mb-6">User Details</h1>
      <Card className="p-6 space-y-4">
        {/* 
            created_at: string;
            disabled: true;
            id: number;
            role_id: number;
            updated_at: string;
            username: string;
            uuid: string; 
        */}

        <div>
          <strong>ID:</strong> {user.id}
        </div>
        <div>
          <strong>Username:</strong> {user.username}
        </div>

        <div>
          <strong>UUID:</strong> {user.uuid}
        </div>

        <div>
          <strong>Role ID:</strong> {user.role_id}
        </div>

        <div>
          <strong>Created At:</strong>{" "}
          {new Date(user.created_at).toLocaleString()}
        </div>
        <div>
          <strong>Updated At:</strong>{" "}
          {new Date(user.updated_at).toLocaleString()}
        </div>

        <div>
          <strong>Disabled:</strong> {user.disabled ? "Yes" : "No"}
        </div>
      </Card>

      <div className="mt-4 flex justify-end gap-2">
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Deleting..." : "Delete"}
        </Button>
        <Link to={`/dashboard/users/${id}/edit`}>
          <Button variant="outline">Edit</Button>
        </Link>
      </div>
    </div>
  );
}
