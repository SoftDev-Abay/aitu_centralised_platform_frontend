import { Link, useSearchParams } from "react-router-dom";
import Section from "@/components/ui/section";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ClubCard from "@/features/clubs/components/ClubCard";
import { useSetNavbarTitle } from "@/components/layout/shared/navbar/use-set-navbar-title";
import { useGetClubsQuery } from "@/features/clubs/clubsApiSlice";
import { Suspense } from "react";

const ClubsListPage = () => {
  useSetNavbarTitle("Clubs");

  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);

  const {
    data: clubs,
    isLoading,
    isError,
  } = useGetClubsQuery({
    page: page - 1,
    pageSize,
  });

  return (
    <>
      <Section
        variant="wide"
        className="bg-brand-gray-bluish pt-[75px] pb-[60px]"
      >
        <h1 className="text-[32px] max-w-[409px] font-bold mb-10 leading-12">
          <p>All clubs of</p>
          <p>the University of Aitu</p>
        </h1>

        <div className="flex justify-between gap-20">
          <div className="flex flex-col justify-end">
            <div className="p-2 bg-brand-light-blue">ALL CLUBS</div>
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col gap-4">
              <p className="text-brand-gray-steel text-sm">Search:</p>
              <Input placeholder="Search" className="bg-white border-0" />
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-brand-gray-steel text-sm">Sort By:</p>
              <Select>
                <SelectTrigger className="w-[180px] bg-white border-0">
                  <SelectValue placeholder="Latest" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">Latest</SelectItem>
                  <SelectItem value="popular">Popular</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-brand-gray-steel text-sm">Category:</p>
              <Select>
                <SelectTrigger className="w-[180px] bg-white border-0">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="tech">Tech</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </Section>

      <Section variant="wide" className="bg-white pb-12 h-full flex-grow">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center pt-[60px] pb-[60px]">
          {isLoading && <p>Loading...</p>}
          {isError && <p>Failed to load clubs.</p>}
          <Suspense>
            {clubs?.data.map((club) => (
              <Link
                to={`/dashboard/clubs/${club.id}`}
                key={club.id}
                className="w-full"
              >
                <ClubCard club={club} />
              </Link>
            ))}
          </Suspense>
        </div>

        {/* <PaginationControls
          totalItems={clubs?.length || 0}
          itemsPerPage={limit}
        /> */}
      </Section>
    </>
  );
};

export default ClubsListPage;
