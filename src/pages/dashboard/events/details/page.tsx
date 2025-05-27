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

// const EventsDetailsPage = () => {
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

// export default EventsDetailsPage;

// src/pages/events/EventsDetailsPage.tsx

import { useParams } from "react-router-dom";
import { useSetNavbarTitle } from "@/components/layout/shared/navbar/use-set-navbar-title";
import Section from "@/components/ui/section";
import SmartBreadcrumbs from "@/components/ui/smart-bread-crumbs";
import { AvatarGroup } from "@/components/ui/avatar-group";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileCard from "@/features/events/components/ProfileCard";
import DetailsCard from "@/features/events/components/DetailsCard";
import { useGetEventByIdQuery } from "@/features/events/eventsApiSlice";

const EventsDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: event, isLoading } = useGetEventByIdQuery({ id: id! });

  useSetNavbarTitle("Events");

  if (isLoading || !event) return <div className="p-10">Loading...</div>;

  const users = [...event.admins, ...event.participants].map((user) => ({
    name: `${user.firstName} ${user.lastName}`,
    image: "/images/profile.jpg", // Replace with actual avatar if available
  }));

  const peopleTabs = {
    Admins: event.admins.map((user) => ({
      name: `${user.firstName} ${user.lastName}`,
      role: user.role.toLowerCase(),
      image: "/images/profile.jpg",
    })),
    Participants: event.participants.map((user) => ({
      name: `${user.firstName} ${user.lastName}`,
      role: user.role.toLowerCase(),
      image: "/images/profile.jpg",
    })),
  };

  return (
    <>
      <Section variant="narrow" className="pt-[80px] bg-brand-gray-bluish ">
        <SmartBreadcrumbs />
        <h1 className="text-[32px] max-w-[409px] font-bold mb-10 leading-12">
          {event.name}
        </h1>
        <div className="flex justify-between gap-20 mb-12">
          <div className="flex items-center gap-3">
            <AvatarGroup users={users} max={3} />
            <div>
              <p className="text-brand-gray-muted text-sm">Created by:</p>
              <p className="font-semibold">{event.admins[0]?.email}</p>
            </div>
          </div>
          <Button
            variant="dark"
            className="w-full max-w-[404px] rounded-none h-[60px] font-semibold"
          >
            Register
          </Button>
        </div>

        <div className="relative">
          <img src="/images/club.png" alt="" className="w-full" />
          <DetailsCard
            className="absolute top-0 right-[-83px] max-w-[323px]"
            startDate={event.startDate}
            endDate={event.endDate}
            address={event.address}
            format={event.format}
          />
        </div>
      </Section>

      <Section
        variant="narrow"
        className="pt-[48px] pb-[76px] bg-white h-full flex-grow"
      >
        <h2 className="text-2xl mb-5 font-semibold">Description</h2>
        <div className="text-brand-gray-steel mb-10">
          <p>{event.description}</p>
        </div>

        <Tabs
          defaultValue="Admins"
          className="mt-12 w-full border-t border-t-brand-secondary"
        >
          <TabsList className="mb-12 flex justify-center w-full">
            {Object.keys(peopleTabs).map((tab) => (
              <TabsTrigger key={tab} value={tab}>
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(peopleTabs).map(([key, people]) => (
            <TabsContent key={key} value={key}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {people.map((person, idx) => (
                  <ProfileCard key={idx} person={person} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </Section>
    </>
  );
};

export default EventsDetailsPage;
