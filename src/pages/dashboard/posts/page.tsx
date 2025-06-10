// import { useSetNavbarTitle } from "@/components/layout/shared/navbar/use-set-navbar-title";
// import PaginationControls from "@/components/ui/pagination-controls";
// import Section from "@/components/ui/section";
// import SmartBreadcrumbs from "@/components/ui/smart-bread-crumbs";
// import PostCard from "@/features/posts/components/PostCard";
// // import { Link, useSearchParams } from "react-router-dom";
// import { Link } from "react-router-dom";

// const PostsListPage = () => {
//   // const [searchParams] = useSearchParams();
//   // const currentPage = parseInt(searchParams.get("page") || "1", 10);

//   const count = 53; // Replace with dynamic value if available
//   const limit = 6;

//   useSetNavbarTitle("Posts");

//   return (
//     <>
//       <Section
//         variant="wide"
//         className="pt-[80px] pb-[37px] bg-brand-gray-bluish h-full"
//       >
//         <SmartBreadcrumbs />
//         <h1 className="text-[32px] max-w-[409px] font-bold mb-10 leading-12">
//           All Posts
//         </h1>
//       </Section>
//       <Section
//         variant="wide"
//         className="pt-[52px] pb-12 bg-white h-full flex-grow"
//       >
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-13 justify-items-center mb-[50px]">
//           {[...Array(6).keys()].map((_, index) => (
//             <Link
//               to={`/dashboard/posts/${index + 1}`}
//               key={index}
//               className="w-full"
//             >
//               <PostCard key={index} />
//             </Link>
//           ))}
//         </div>

//         <PaginationControls totalItems={count} itemsPerPage={limit} />
//       </Section>
//     </>
//   );
// };

// export default PostsListPage;

import { useSetNavbarTitle } from "@/components/layout/shared/navbar/use-set-navbar-title";
import PaginationControls from "@/components/ui/pagination-controls";
import Section from "@/components/ui/section";
import { Separator } from "@/components/ui/separator";
import SmartBreadcrumbs from "@/components/ui/smart-bread-crumbs";
import PostCard from "@/features/posts/components/PostCard";
import { useGetPostsQuery } from "@/features/posts/postsApiSlice";
import { Link, useSearchParams } from "react-router-dom";

const PostsListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);

  useSetNavbarTitle("Posts");

  const { data, isLoading, isError } = useGetPostsQuery({
    page: page - 1,
    pageSize,
  });

  if (isError)
    return <div className="p-6 text-red-500">Ошибка загрузки сотрудников.</div>;

  return (
    <>
      <Section
        // variant="narrow"
        variant="wide"
        className="pt-[80px] pb-[37px] bg-brand-gray-bluish h-full "
      >
        <SmartBreadcrumbs />
        <h1 className="text-[32px] max-w-[409px] font-bold mb-10 leading-12">
          All Posts
        </h1>
      </Section>

      <Section
        variant="wide"
        className="pt-[52px] pb-12 bg-brand-gray-bluish h-full flex-grow"
      >
        {isLoading && <p>Loading posts...</p>}
        {isError && <p>Failed to load posts.</p>}

        {/* <div className="grid grid-cols-1 gap-13 justify-items-center mb-[50px]"> */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-13 justify-items-center mb-[50px]">
          {data?.data.map((post) => (
            <Link
              to={`/dashboard/posts/${post.id}`}
              key={post.id}
              className="w-full"
            >
              <PostCard post={post} />
            </Link>
          ))}
        </div>

        <PaginationControls
          currentPage={page}
          onPageChange={(newPage) =>
            setSearchParams({
              page: newPage.toString(),
              pageSize: pageSize.toString(),
            })
          }
          count={data?.count || 0}
          pageSize={pageSize}
          visiblePages={5}
        />
      </Section>
    </>
  );
};

export default PostsListPage;
