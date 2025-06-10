import { useSetNavbarTitle } from "@/components/layout/shared/navbar/use-set-navbar-title";
import { DataPagination } from "@/components/shared/data-pagination";
import { DataTable } from "@/components/shared/data-table/data-table";
import PaginationControls from "@/components/ui/pagination-controls";
import Section from "@/components/ui/section";
import SmartBreadcrumbs from "@/components/ui/smart-bread-crumbs";
import { useGetClubsQuery } from "@/features/clubs/clubsApiSlice";
import PostCard from "@/features/posts/components/PostCard";
import { useGetPostsQuery } from "@/features/posts/postsApiSlice";
import { getFileDownloadUrl } from "@/lib/helpers";
import { Link, useSearchParams } from "react-router-dom";

const today = new Date();
const oneMonthAgo = new Date();
oneMonthAgo.setMonth(today.getMonth() - 1);

const clubs = [
  {
    urlImg: "/images/robotics.webp",
    title: "AITU Robotics Club",
    position: "President",
    status: "Active",
    date: `${oneMonthAgo.toLocaleDateString()} - ${today.toLocaleDateString()}`,
  },
  {
    urlImg: "/images/korean_club.jpeg",
    title: "Korean Society",
    position: "Member",
    status: "Inactive",
    date: `01/09/2023 - 01/06/2024`,
  },
  {
    urlImg: "/images/music_stage.webp",
    title: "Music Enthusiasts",
    position: "Vice President",
    status: "Active",
    date: `01/02/2024 - ${today.toLocaleDateString()}`,
  },
  {
    urlImg: "/images/voleyball_club.jpg",
    title: "Voleyball Club",
    position: "Treasurer",
    status: "Active",
    date: `01/01/2024 - ${today.toLocaleDateString()}`,
  },
];
const MyClubsListPage = () => {
  useSetNavbarTitle("My Clubs");
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);

  const { data, isLoading, isError } = useGetClubsQuery({});

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
                <div className="flex gap-5">
                  {row.original.images && row.original.images[0] && (
                    <img
                      src={getFileDownloadUrl(row.original.images[0])}
                      alt=""
                      className="w-40 h-30"
                    />
                  )}
                  <div className="flex flex-col justify-between">
                    <p className="font-medium text-[17px]">
                      {row.original.name}
                    </p>
                    <p className="flex gap-1">
                      <span className="opacity-50">student position:</span>
                      <span className="opacity-90">
                        "President"
                        {/* {row.original.position} */}
                      </span>
                    </p>
                  </div>
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
                return (
                  <span
                    className={`${
                      getValue() === "ACTIVE"
                        ? "text-brand-success"
                        : "text-destructive"
                    }`}
                  >
                    {String(getValue())}
                  </span>
                );
              },
            },
            { accessorKey: "date", header: "User Date" },
          ]}
          // data={clubs}
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

export default MyClubsListPage;
