import { useGetTablesQuery } from "@/features/tables/tablesApiSlice";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function TablesPage() {
  const { data: tables, isLoading, isError } = useGetTablesQuery();

  return (
    <div className="p-6 ">
      <h1 className="text-2xl font-bold mb-6 ">Your Tables</h1>

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      ) : !isError ? (
        <div className="flex flex-col gap-4">
          {tables?.ids.map((tableId) => (
            <Link key={tableId} to={`/dashboard/tables/${tableId}`}>
              <Card className="px-6">
                <div className="w-full flex gap-3 justify-between">
                  <div className="flex flex-col gap-2 ">
                    <span>Id</span>
                    <span className="text-lg font-medium">{tableId}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span>Name</span>
                    <span className="text-lg font-medium">
                      {tables.entities[tableId]?.name
                        ? tables.entities[tableId].name
                        : "?"}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span>Created At</span>
                    <span className="text-lg font-medium">
                      {tables.entities[tableId]?.created_at}
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div>Error loading tables.</div>
      )}
    </div>
  );
}
