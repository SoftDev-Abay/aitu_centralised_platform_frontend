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
import PaginationControls from "@/components/ui/pagination-controls";
import { useSetNavbarTitle } from "@/components/layout/shared/navbar/use-set-navbar-title";
import EventCard from "@/features/events/components/EventCard";
import { useGetAllEventsQuery } from "@/features/events/eventsApiSlice";
import { Suspense } from "react";

const EventsListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);

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

// import { useSetNavbarTitle } from "@/components/layout/shared/navbar/use-set-navbar-title";
// import Section from "@/components/ui/section";
// import SmartBreadcrumbs from "@/components/ui/smart-bread-crumbs";
// import { AvatarGroup } from "@/components/ui/avatar-group";
// import { Button } from "@/components/ui/button";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import ProfileCard from "@/features/events/components/ProfileCard";
// import DetailsCard from "@/features/events/components/DetailsCard";

// const users = [
//   {
//     name: "Alice",
//     image:
//       "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg",
//   },
//   {
//     name: "Bob",
//     image: "https://static-cse.canva.com/blob/1991552/1600w-B-cRyoh7b98.jpg",
//   },
// ];

// const peopleTabs = {
//   Founders: [
//     {
//       name: "Ainur Askar",
//       role: "President",
//       image:
//         "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg",
//     },
//     {
//       name: "Nurhzau Azinbay",
//       role: "Vice President",
//       image: "https://static-cse.canva.com/blob/1991552/1600w-B-cRyoh7b98.jpg",
//     },
//     {
//       name: "Aliyev Abay",
//       role: "Secretary",
//       image: "/images/profile.jpg",
//     },
//   ],
//   Members: [
//     {
//       name: "David",
//       role: "Member",
//       image:
//         "https://media.istockphoto.com/id/1413766111/photo/cheerful-mid-adult-business-woman-smiling-at-office.jpg?s=612x612&w=0&k=20&c=l3sntoOvUWypCazFpknMtzyoXd2rg3nLilLtXJ8PEeo=",
//     },
//     {
//       name: "Eva",
//       role: "Member",
//       image:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbQSQCt_XU1PXWpyoRxmfr1V-0zqCF0YwUNw&s",
//     },
//     {
//       name: "Frank",
//       role: "Member",
//       image:
//         "https://static.vecteezy.com/system/resources/previews/005/888/338/large_2x/handsome-black-man-wearing-suit-in-urban-background-photo.jpg",
//     },
//   ],
// };

// const EventsListPage = () => {
//   useSetNavbarTitle("Events");

//   return (
//     <>
//       <Section variant="narrow" className="pt-[80px]  bg-brand-gray-bluish ">
//         <SmartBreadcrumbs />
//         <h1 className="text-[32px] max-w-[409px] font-bold mb-10 leading-12">
//           Alpha Sigma Phi
//         </h1>
//         <div className="flex justify-between gap-20 mb-12">
//           <div className="flex items-center gap-3">
//             <AvatarGroup users={users} max={3} />

//             <div>
//               <p className="text-brand-gray-muted text-sm">Created by:</p>
//               <p className="font-semibold">Abay Abayev • Abay Abayev</p>
//             </div>
//           </div>
//           <Button
//             variant="dark"
//             className="w-full max-w-[404px] rounded-none h-[60px] font-semibold"
//           >
//             Register
//           </Button>
//         </div>

//         <div className="relative">
//           <img src="/images/club.png" alt="" className="w-full" />
//           <DetailsCard className="absolute top-0 right-[-83px] max-w-[323px]" />
//         </div>
//       </Section>
//       <Section
//         variant="narrow"
//         className="pt-[48px] pb-[76px] bg-white h-full flex-grow"
//       >
//         <h2 className="text-2xl mb-5 font-semibold">Description</h2>
//         <div className="text-brand-gray-steel mb-10">
//           <p className="mb-6">
//             Alpha Sigma Phi (AΣΦ) is a fraternity at Colorado State University
//             that provides its members with an enriching brotherhood experience
//             through academic betterment, philanthropic work, and close-knit
//             friendships between brothers.
//             <br />
//             Alpha Sigma Phi:
//             <br />
//             Was founded at Yale in 1845 by Louis Manigault, Horace Spangler
//             Weiser and Stephen Ormsby Rhea, Alpha Sigma Phi has grown into one
//             of the premier national fraternities and the 10th oldest in the
//             nation. From its foundation, the organization has been committed to
//             improving individual and social good, which is achieved through men
//             of good character banding together as brothers.
//           </p>
//           <p>
//             Far from the stereotype of fraternities in recent years, Alpha Sigma
//             Phi provides its undergraduate men with character and leadership
//             development programs that are second to none. We are committed to
//             augmenting and enhancing the college experience of our members by
//             providing opportunities for community engagement, leadership
//             development, and inter/national networking on top of access to the
//             robust social network of CSU's Fraternity and Sorority community.
//           </p>
//         </div>

//         <Tabs
//           defaultValue="Founders"
//           className="mt-12 w-full border-t border-t-brand-secondary"
//         >
//           <TabsList className="mb-12 flex justify-center w-full">
//             {Object.keys(peopleTabs).map((tab) => (
//               <TabsTrigger key={tab} value={tab}>
//                 {tab}
//               </TabsTrigger>
//             ))}
//           </TabsList>

//           {Object.entries(peopleTabs).map(([key, people]) => (
//             <TabsContent key={key} value={key}>
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//                 {people.map((person, idx) => (
//                   <ProfileCard key={idx} person={person} />
//                 ))}
//               </div>
//             </TabsContent>
//           ))}
//         </Tabs>
//       </Section>
//     </>
//   );
// };

// export default EventsListPage;
