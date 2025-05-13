import { useSetNavbarTitle } from "@/components/layout/dashboard/navbar/use-set-navbar-title";
import PaginationControls from "@/components/ui/pagination-controls";
import Section from "@/components/ui/section";
import SmartBreadcrumbs from "@/components/ui/smart-bread-crumbs";
import PostCard from "@/features/posts/components/PostCard";
// import { Link, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";

const PostsListPage = () => {
  // const [searchParams] = useSearchParams();
  // const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const count = 53; // Replace with dynamic value if available
  const limit = 6;

  useSetNavbarTitle("Posts");

  return (
    <>
      <Section
        variant="wide"
        className="pt-[80px] pb-[37px] bg-brand-gray-bluish h-full"
      >
        <SmartBreadcrumbs />
        <h1 className="text-[32px] max-w-[409px] font-bold mb-10 leading-12">
          All Posts
        </h1>
      </Section>
      <Section variant="wide" className="pt-[52px] pb-12 bg-white h-full flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-13 justify-items-center mb-[50px]">
          {[...Array(6).keys()].map((_, index) => (
            <Link
              to={`/dashboard/posts/${index + 1}`}
              key={index}
              className="w-full"
            >
              <PostCard key={index} />
            </Link>
          ))}
        </div>

        <PaginationControls totalItems={count} itemsPerPage={limit} />
      </Section>
    </>
  );
};

export default PostsListPage;
