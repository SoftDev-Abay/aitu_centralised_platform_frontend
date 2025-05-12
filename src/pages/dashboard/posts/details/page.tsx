import { useSetNavbarTitle } from "@/components/layout/dashboard/navbar/use-set-navbar-title";
import Section from "@/components/ui/section";
import SmartBreadcrumbs from "@/components/ui/smart-bread-crumbs";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { LoaderIcon } from "lucide-react";
import CommentItem from "@/features/posts/components/CommentItem";
import { Separator } from "@/components/ui/separator";
import WriteComment from "@/features/posts/components/WriteComment";

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

const ClubDetailsPage = () => {
  useSetNavbarTitle("Clubs");

  return (
    <>
      <Section
        variant="narrow"
        className="pt-[80px] pb-[76px] bg-brand-gray-bluish"
      >
        <SmartBreadcrumbs />
        <h1 className="text-[32px] max-w-[409px] font-bold mb-10 leading-12">
          Alpha Sigma Phi
        </h1>
        <div className="flex justify-between gap-20">
          <div className="flex items-center gap-3">
            <img
              src="/images/profile.jpg"
              className="rounded-full w-12.5 h-12.5"
              alt=""
            />
            <div>
              <p className="text-brand-gray-muted text-sm">Author:</p>
              <p className="font-semibold">Abay Abayev • Abay Abayev</p>
            </div>
          </div>
          <Button
            variant="dark"
            className="w-full max-w-[404px] rounded-none h-[60px] font-semibold"
          >
            Register
          </Button>
        </div>
      </Section>
      <Section variant="narrow" className="pb-[76px] bg-white">
        {/* <img src="/images/club.png" alt="" className="w-full" /> */}

        <Carousel
          className="w-full mb-8 relative "
          style={{ transform: "translateY(-10px)" }}
        >
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <img src="/images/club.png" alt="" className="w-full" />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <h2 className="text-2xl mb-5 font-semibold">Description</h2>
        <div className="text-brand-gray-steel mb-10">
          <p className="mb-6">
            Alpha Sigma Phi (AΣΦ) is a fraternity at Colorado State University
            that provides its members with an enriching brotherhood experience
            through academic betterment, philanthropic work, and close-knit
            friendships between brothers.
            <br />
            Alpha Sigma Phi:
            <br />
            Was founded at Yale in 1845 by Louis Manigault, Horace Spangler
            Weiser and Stephen Ormsby Rhea, Alpha Sigma Phi has grown into one
            of the premier national fraternities and the 10th oldest in the
            nation. From its foundation, the organization has been committed to
            improving individual and social good, which is achieved through men
            of good character banding together as brothers.
          </p>
          <p>
            Far from the stereotype of fraternities in recent years, Alpha Sigma
            Phi provides its undergraduate men with character and leadership
            development programs that are second to none. We are committed to
            augmenting and enhancing the college experience of our members by
            providing opportunities for community engagement, leadership
            development, and inter/national networking on top of access to the
            robust social network of CSU's Fraternity and Sorority community.
          </p>
        </div>

        <WriteComment />

        <h2 className="text-2xl mt-7.5 mb-7.5 font-semibold">Comments</h2>

        <CommentItem />
        <Separator className="my-7.5" />
        <CommentItem />

        <Button className="gap-3 rounded-none mt-4.5">
          Load more
          <LoaderIcon />
        </Button>
      </Section>
    </>
  );
};

export default ClubDetailsPage;
