import { useParams } from "react-router-dom";
import { useSetNavbarTitle } from "@/components/layout/shared/navbar/use-set-navbar-title";
import Section from "@/components/ui/section";
import SmartBreadcrumbs from "@/components/ui/smart-bread-crumbs";
import { AvatarGroup } from "@/components/ui/avatar-group";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileCard from "@/features/events/components/ProfileCard";
import DetailsCard from "@/features/events/components/DetailsCard";
import {
  useGetEventByIdQuery,
  useSubscribeToEventMutation,
  useUnsubscribeFromEventMutation,
} from "@/features/events/eventsApiSlice";
import { getFileDownloadUrl } from "@/lib/helpers";
import toast from "react-hot-toast";
import HtmlRenderer from "@/components/shared/html-render";

const EventsDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: event, isLoading } = useGetEventByIdQuery({ id: id! });

  const [subscribe, { isLoading: isLoadingSubsribe }] =
    useSubscribeToEventMutation();

  const [unsubscribe, { isLoading: isLoadingUnsubsribe }] =
    useUnsubscribeFromEventMutation();

  useSetNavbarTitle("Events");

  if (!id) return null;
  if (isLoading || !event) return <div className="p-10">Loading...</div>;
  // if (isLoading || !event) return <div className="p-10">Loading...</div>;

  const users = [...event.admins, ...event.participants].map((user) => ({
    name: `${user.firstName} ${user.lastName}`,
    image: "/images/default_avatar.jpg", // Replace with actual avatar if available
  }));

  const peopleTabs = {
    Admins: event.admins.map((user) => ({
      name: `${user.firstName} ${user.lastName}`,
      role: user.role.toLowerCase(),
      image: "/images/default_avatar.jpg",
    })),
    Participants: event.participants.map((user) => ({
      name: `${user.firstName} ${user.lastName}`,
      role: user.role.toLowerCase(),
      image: "/images/default_avatar.jpg",
    })),
  };

  const handleSubscribe = async () => {
    try {
      await subscribe({ id: id }).unwrap();
      toast.success("Successfuly registered to an event");
    } catch (error) {
      toast.error("Could not register, please try later");
    }
  };
  const handleUnsubscribe = async () => {
    try {
      await unsubscribe({ id: id }).unwrap();
      toast.success("Successfuly unsubscribed to an event");
    } catch (error) {
      toast.error("Could not unsubscribe, please try later");
    }
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
          {!event.subscribed ? (
            <Button
              variant="dark"
              className="w-full max-w-[404px] rounded-none h-[60px] font-semibold"
              onClick={handleSubscribe}
              disabled={isLoadingSubsribe}
            >
              Register
            </Button>
          ) : (
            <Button
              variant="dark"
              className="w-full max-w-[404px] rounded-none h-[60px] font-semibold"
              onClick={handleUnsubscribe}
              disabled={isLoadingUnsubsribe}
            >
              Unsubscribe
            </Button>
          )}
        </div>

        <div className="relative">
          {event?.imageIds[0] ? (
            <img
              src={getFileDownloadUrl(event?.imageIds[0])}
              alt=""
              className="w-full"
            />
          ) : (
            <img src={"/images/club.png"} alt="" className="w-full" />
          )}
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
          {event?.description ? (
            <HtmlRenderer className="content" unsafeHtml={event.description} />
          ) : (
            "No description provided."
          )}
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
