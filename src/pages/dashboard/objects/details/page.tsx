import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useDeleteObjectMutation,
  useGetObjectsQuery,
} from "@/features/objects/objectsApiSlice";
import { selectObjectById } from "@/features/objects/objectsSlice";
import { RootState } from "@/app/store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ConfrimModal from "@/components/ui/confirm-modal";
import { Opener } from "@/components/ui/opener";
import ConfirmActionModal from "@/components/ui/confirm-modal";

export default function ObjectDetailsPage() {
  const { id } = useParams<{ id: string }>();
  useGetObjectsQuery({ page: 0, limit: 10 }); // ensures cache is loaded
  const object = useSelector((state: RootState) =>
    selectObjectById(state, Number(id))
  );

  const [deleteObject, { isLoading }] = useDeleteObjectMutation();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await deleteObject({ id: Number(id) }).unwrap();
      navigate("/dashboard/objects");
    } catch (err) {
      console.error("Failed to create object:", err);
    }
  };

  if (!object) return <div className="p-6">Object not found.</div>;

  return (
    <div className="p-6 max-w-xl w-full mx-auto">
      <h1 className="text-2xl font-bold mb-6">Object Details</h1>
      <Card className="p-6 space-y-4">
        <div>
          <strong>ID:</strong> {object.id}
        </div>
        <div>
          <strong>Name:</strong> {object.name}
        </div>
        <div>
          <strong>Description:</strong> {object.description}
        </div>
      </Card>

      {/* edit */}
      <div className="mt-4 flex justify-end gap-2">
        <Opener
          renderTrigger={({ open }) => (
            <Button onClick={open} disabled={isLoading}>
              {isLoading ? "Deleting..." : "Delete"}
            </Button>
          )}
          renderModal={({ close }) => (
            <ConfirmActionModal
              open={true}
              onOpenChange={(_) => close()}
              actionType="delete"
              itemName={object.name}
              onConfirm={handleSubmit}
            />
          )}
        />
        <Link to={`/dashboard/objects/${id}/edit`}>
          <Button variant="outline">Edit</Button>
        </Link>
      </div>
    </div>
  );
}
