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
import PaginationControls from "@/components/ui/pagination-controls";
import { useSetNavbarTitle } from "@/components/layout/dashboard/navbar/use-set-navbar-title";

const ClubsListPage = () => {
  const [searchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const count = 53; // Replace with dynamic value if available
  const limit = 6;

  useSetNavbarTitle("Clubs");

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
              <p>Search</p>
              <Input placeholder="Search" />
            </div>
            <div className="flex flex-col gap-4">
              <p>Sort By</p>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Latest" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">Latest</SelectItem>
                  <SelectItem value="popular">Popular</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-4">
              <p>Category</p>
              <Select>
                <SelectTrigger className="w-[180px]">
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

      <Section variant="wide" className="bg-white pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center pt-[60px] pb-[60px]">
          {[...Array(limit).keys()].map((_, index) => (
            <Link
              to={`/dashboard/clubs/${index + 1}`}
              key={index}
              className="w-full"
            >
              <ClubCard key={index + (currentPage - 1) * limit} />
            </Link>
          ))}
        </div>

        <PaginationControls totalItems={count} itemsPerPage={limit} />
      </Section>
    </>
  );
};

export default ClubsListPage;
