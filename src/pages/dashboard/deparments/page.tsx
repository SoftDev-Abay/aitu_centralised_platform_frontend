// src/pages/departments/DepartmentsPage.tsx
import { Link, useSearchParams } from "react-router-dom";
import { useGetDepartmentsQuery } from "@/features/departments/departmentsApiSlice";
import { Button } from "@/components/ui/button";

export default function DepartmentsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") ?? "1", 10);
  const limit = parseInt(searchParams.get("limit") ?? "10", 10);

  const { data, isLoading, isError } = useGetDepartmentsQuery({ page, limit });
  const count = data?.count ?? 0;
  const pageCount = Math.ceil(count / limit);

  const onNext = () => {
    if (page < pageCount)
      setSearchParams({ page: String(page + 1), limit: String(limit) });
  };
  const onPrev = () => {
    if (page > 1)
      setSearchParams({ page: String(page - 1), limit: String(limit) });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Departments</h1>

      {isLoading ? (
        <div>Loading…</div>
      ) : isError ? (
        <div className="text-red-500">Error loading departments.</div>
      ) : (
        <>
          <table className="min-w-full divide-y divide-gray-200 mb-6">
            <thead className="bg-gray-50">
              <tr>
                {["ID", "Name", "Created At", "Updated At", "Actions"].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-4 py-2 text-left text-sm font-medium text-gray-700"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data!.departments.map((dept) => (
                <tr key={dept.id}>
                  <td className="px-4 py-2">{dept.id}</td>
                  <td className="px-4 py-2">{dept.name}</td>
                  <td className="px-4 py-2">
                    {new Date(dept.created_at).toLocaleString()}
                  </td>
                  <td className="px-4 py-2">
                    {new Date(dept.updated_at).toLocaleString()}
                  </td>
                  <td className="px-4 py-2">
                    <Link to={`/dashboard/departments/${dept.id}`}>
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {pageCount > 1 && (
            <div className="flex justify-center space-x-4">
              <Button onClick={onPrev} disabled={page === 1}>
                Previous
              </Button>
              <span className="self-center">
                Page {page} of {pageCount}
              </span>
              <Button onClick={onNext} disabled={page >= pageCount}>
                Next
              </Button>
            </div>
          )}
        </>
      )}

      <div className="mt-6 flex justify-end">
        <Link to="/dashboard/departments/new">
          <Button
            variant="outline"
            // className="w-32"
          >
            Create Department
          </Button>
        </Link>
      </div>
    </div>
  );
}
