import { Link, useSearchParams } from "react-router-dom";
// import { Link, useSearchParams } from "react-router-dom";
import Section from "@/components/ui/section";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSetNavbarTitle } from "@/components/layout/shared/navbar/use-set-navbar-title";
import EventCard from "@/features/events/components/EventCard";
import { useGetAllEventsQuery } from "@/features/events/eventsApiSlice";
import { Suspense } from "react";
import {
  EventType,
  SortableField,
  SortDirection,
} from "@/features/events/types";

const EventsListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Get all parameters from URL
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
  const searchTerm = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const sortBy = searchParams.get("sortBy") || SortableField.CREATED_AT;
  const sortDir = searchParams.get("sortDir") || SortDirection.DESC;

  useSetNavbarTitle("Events");

  // Updated query with new parameters
  const {
    data: events,
    isLoading,
    isError,
  } = useGetAllEventsQuery({
    size: pageSize,
    page: page - 1,
    type: EventType.UNI_EVENT,
    category: category || undefined,
    search: searchTerm || undefined,
    sortBy,
    sortDir,
  });

  if (isError)
    return <div className="p-6 text-red-500">Ошибка загрузки сотрудников.</div>;

  // Handler for search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newSearchTerm
        ? newParams.set("search", newSearchTerm)
        : newParams.delete("search");
      newParams.set("page", "1");
      return newParams;
    });
  };

  // Handler for sort select
  const handleSortChange = (value: string) => {
    const [newSortBy, newSortDir] = value.split("-");
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("sortBy", newSortBy);
      newParams.set("sortDir", newSortDir);
      newParams.set("page", "1");
      return newParams;
    });
  };

  // Handler for category select
  const handleCategoryChange = (value: string) => {
    setSearchParams((prev) => {
      if (value === "all") {
        value = ""; // Reset to empty string for "All Categories"
      }

      const newParams = new URLSearchParams(prev);
      value ? newParams.set("category", value) : newParams.delete("category");
      newParams.set("page", "1");
      return newParams;
    });
  };

  return (
    <>
      {/* <Section
        variant="wide"
        className="bg-brand-gray-bluish pt-[75px] pb-[60px]"
      >
        <div className="flex gap-4 flex-wrap">
          <div className="flex w-full flex-1 flex-col gap-4 min-w-[240px]">
            <p className="text-brand-gray-steel text-sm">Search:</p>
            <Input placeholder="Search" className="bg-white border-0" />
          </div>
          <div className="flex flex-col gap-4 min-w-[240px]">
            <p className="text-brand-gray-steel text-sm">Sort By:</p>
            <Select>
              <SelectTrigger className="w-full bg-white border-0">
                <SelectValue placeholder="Latest" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="popular">Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-4 min-w-[240px]">
            <p className="text-brand-gray-steel text-sm">Category:</p>
            <Select>
              <SelectTrigger className="w-full bg-white border-0">
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
      </Section> */}
      <Section /* ... */
        variant="wide"
        className="bg-brand-gray-bluish pt-[75px] pb-[60px]"
      >
        <div className="flex gap-4 flex-wrap">
          {/* Search Input */}
          <div className="flex w-full flex-1 flex-col gap-4 min-w-[240px]">
            <p className="text-brand-gray-steel text-sm">Search:</p>
            <Input
              placeholder="Search"
              className="bg-white border-0"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          {/* Sort Select */}
          <div className="flex flex-col gap-4 min-w-[240px]">
            <p className="text-brand-gray-steel text-sm">Sort By:</p>
            <Select
              value={`${sortBy}-${sortDir}`}
              onValueChange={handleSortChange}
            >
              <SelectTrigger className="w-full bg-white border-0">
                <SelectValue placeholder="Latest" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  value={`${SortableField.CREATED_AT}-${SortDirection.DESC}`}
                >
                  Latest
                </SelectItem>
                <SelectItem
                  value={`${SortableField.START_DATE}-${SortDirection.ASC}`}
                >
                  Upcoming
                </SelectItem>
                <SelectItem
                  value={`${SortableField.SUBSCRIBER_COUNT}-${SortDirection.DESC}`}
                >
                  Popular
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Category Select */}
          <div className="flex flex-col gap-4 min-w-[240px]">
            <p className="text-brand-gray-steel text-sm">Category:</p>
            <Select value={category} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-full bg-white border-0">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="tech">Tech</SelectItem>
                <SelectItem value="sports">Sports</SelectItem>
                <SelectItem value="academic">Academic</SelectItem>
                <SelectItem value="cultural">Cultural</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Section>

      <Section variant="wide" className="bg-white pb-12 h-full flex-grow">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center pt-[60px] pb-[60px]">
          <Suspense>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              events &&
              events.data.map((event) => (
                <Link
                  to={`/dashboard/events/${event.id}`}
                  key={event.id}
                  className="w-full"
                >
                  <EventCard event={event} />
                </Link>
              ))
            )}
          </Suspense>
        </div>

        {/* <PaginationControls
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(newPage) =>
            setSearchParams({
              page: newPage.toString(),
              pageSize: pageSize.toString(),
            })
          }
          visiblePages={5}
        /> */}
      </Section>
    </>
  );
};

export default EventsListPage;
