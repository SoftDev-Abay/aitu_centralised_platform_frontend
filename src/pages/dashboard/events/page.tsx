import React from "react";
import { useSearchParams } from "react-router-dom";
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
import EventCard from "@/features/events/components/EventCard";

const EventsDetailsPage = () => {
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
        <div className="flex gap-4 flex-wrap">
          <div className="flex w-full flex-1 flex-col gap-4 min-w-[240px]">
            <p>Search</p>
            <Input placeholder="Search" />
          </div>
          <div className="flex flex-col gap-4 min-w-[240px]">
            <p>Sort By</p>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Latest" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="popular">Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-4 min-w-[240px]">
            <p>Category</p>
            <Select>
              <SelectTrigger className="w-full">
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
      </Section>

      <Section variant="wide" className="bg-white pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center pt-[60px] pb-[60px]">
          {[...Array(limit).keys()].map((_, index) => (
            <EventCard key={index + (currentPage - 1) * limit} />
          ))}
        </div>

        <PaginationControls totalItems={count} itemsPerPage={limit} />
      </Section>
    </>
  );
};

export default EventsDetailsPage;
