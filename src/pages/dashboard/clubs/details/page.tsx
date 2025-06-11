import { Link, useParams } from "react-router-dom";
import { useGetClubByIdQuery } from "@/features/clubs/clubsApiSlice";
import { useSetNavbarTitle } from "@/components/layout/shared/navbar/use-set-navbar-title";
import Section from "@/components/ui/section";
import SmartBreadcrumbs from "@/components/ui/smart-bread-crumbs";
import { AvatarGroup } from "@/components/ui/avatar-group";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PlayIcon, TimerIcon } from "lucide-react";
import { getFileDownloadUrl } from "@/lib/helpers";
import ClubMemberCard from "@/features/clubs/components/ClubMemberCard";

const ClubDetailsPage = () => {
  const { id } = useParams();
  useSetNavbarTitle("Clubs");

  const { data: club } = useGetClubByIdQuery({ id: id! });

  return (
    <>
      <Section
        variant="narrow"
        className="pt-[80px] pb-[76px] bg-brand-gray-bluish"
      >
        <SmartBreadcrumbs />
        <h1 className="text-[32px] max-w-[409px] font-bold mb-10 leading-12">
          {club?.name ?? "Loading..."}
        </h1>
        <div className="flex justify-between gap-20">
          <div className="flex items-center gap-3">
            <AvatarGroup
              users={
                club?.admins.map((a) => ({
                  name: `${a.firstName} ${a.lastName}`,
                  image: "/images/profile.jpg", // fallback since backend has no image
                })) ?? []
              }
              max={3}
            />
            <div>
              <p className="text-brand-gray-muted text-sm">Head:</p>
              <p className="font-semibold">
                {club?.admins &&
                  club?.admins
                    .map((a) => `${a.firstName} ${a.lastName}`)
                    // .map((a) => `${a.firstName} ${a.lastName}`)
                    .join(" • ")}
              </p>
            </div>
          </div>

          <Link
            to={`/dashboard/applications/submit/${club?.activeFormId}`}
            className="w-full max-w-[404px]"
          >
            <Button
              variant="dark"
              className="w-full rounded-none h-[60px] font-semibold"
            >
              Register
            </Button>
          </Link>
        </div>
      </Section>

      <Section variant="narrow" className="pb-[76px] bg-white h-full flex-grow">
        <Carousel
          className="w-full mb-8 relative "
          style={{ transform: "translateY(-10px)" }}
        >
          <CarouselContent>
            {club?.images?.map((imageName) => (
              <CarouselItem
                className="h-[492px]"
                key={`carousel_item_${imageName}`}
              >
                <img
                  src={getFileDownloadUrl(imageName)}
                  alt="Post Image"
                  className="w-full"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <h2 className="text-2xl mb-5 font-semibold">Description</h2>
        <div className="text-brand-gray-steel mb-10 whitespace-pre-line">
          {club?.description || "No description available."}
        </div>

        <h2 className="text-2xl mb-5 font-semibold">Information</h2>

        <Card className="rounded-none border-brand-gray-light mb-10 py-2">
          <div className="flex items-center justify-between">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="px-5">
                <AccordionTrigger className="font-medium ">
                  <span>Schedule</span>
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4">
                  {[...Array(3)].map((_, i) => (
                    <div className="flex items-center justify-between" key={i}>
                      <div className="flex gap-2 items-center">
                        <PlayIcon
                          size={16}
                          fill="currentColor"
                          className="fill-current"
                        />
                        <span>Meeting time</span>
                      </div>
                      <span className="text-brand-gray-medium">07:20</span>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="px-5">
                <AccordionTrigger className="font-medium">
                  <div className="flex justify-between w-full">
                    <span>Is it animated?</span>
                    <div className="flex items-center gap-2">
                      <TimerIcon size={16} className="text-brand-primary" />
                      <span className="text-brand-gray-muted">5h 49m</span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2 items-center">
                      <PlayIcon
                        size={16}
                        fill="currentColor"
                        className="fill-current"
                      />
                      <span>Meeting time</span>
                    </div>
                    <span className="text-brand-gray-medium">07:20</span>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </Card>

        <h2 className="text-2xl mb-5 font-semibold">
          Club admins
          {/* <span className="font-normal">({club?.members.length ?? 0})</span> */}
        </h2>
        <div className="flex flex-col gap-5">
          {club?.admins.map((admin) => (
            <ClubMemberCard key={admin.id} user={admin} />
          ))}
        </div>
      </Section>
    </>
  );
};

export default ClubDetailsPage;
