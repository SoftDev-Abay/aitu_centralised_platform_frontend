import { Link} from "react-router-dom";
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

const EventsListPage = () => {
  // const [searchParams, setSearchParams] = useSearchParams();
  // const page = parseInt(searchParams.get("page") || "1", 10);
  // const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);

  useSetNavbarTitle("Events");

  const { data: events = [], isLoading, isError } = useGetAllEventsQuery();

  if (isError || !events)
    return <div className="p-6 text-red-500">Ошибка загрузки сотрудников.</div>;

  // const totalPages = Math.ceil(data.count / pageSize);

  return (
    <>
      <Section
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
      </Section>

      <Section variant="wide" className="bg-white pb-12 h-full flex-grow">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center pt-[60px] pb-[60px]">
          <Suspense>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              events.map((event) => (
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
