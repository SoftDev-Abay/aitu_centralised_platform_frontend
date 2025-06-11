import { useParams } from "react-router-dom";
import Section from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import QuickLinkCard from "@/components/shared/QuickLinkCard";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Layers3Icon,
  StarIcon,
  UsersIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ChartRadarDefault } from "@/components/shared/chart-radar-default";
import { ChartBarLabel } from "@/components/shared/chart-bar-label";

const ClubAdminDashboardPage = () => {
  const { id: clubId } = useParams<{ id: string }>();

  // const { data: applications = [] } = useGetApplicationsByFormQuery(
  //   selectedFormId ? { formId: selectedFormId } : skipToken
  // );

  return (
    <Section
      variant="wide"
      className="bg-brand-gray-bluish pt-10 pb-10 h-full flex-grow"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-5">
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-13"> */}
        <QuickLinkCard
          icon={<UsersIcon />}
          iconBg="bg-slate-300"
          title="Events"
          subtitle="Quick links"
          url={`/admin-panel/clubs/view/${clubId}/events`}
          className="py-6 border shadow-sm rounded-xl"
        />
        <QuickLinkCard
          icon={<Layers3Icon />}
          iconBg="bg-blue-200"
          title="Members"
          subtitle="Quick links"
          url={`/admin-panel/clubs/view/${clubId}/members`}
          className="py-6 border shadow-sm rounded-xl"
        />
        <QuickLinkCard
          icon={<StarIcon />}
          iconBg="bg-yellow-300"
          title="Applications"
          subtitle="Quick links"
          url={`/admin-panel/clubs/view/${clubId}/applications`}
          className="py-6 border shadow-sm rounded-xl"
        />
        {/* <QuickLinkCard
          icon={<StarIcon />}
          iconBg="bg-yellow-300"
          title="Forms"
          subtitle="Quick links"
          url={"/admin-panel/clubs/applications"}
          className="py-6 border shadow-sm rounded-xl"
        /> */}
      </div>

      <div className="mb-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ChartRadarDefault />
        <ChartBarLabel className="col-span-2" />
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"></div> */}
      <Card className="mb-6">
        <CardHeader className="flex justify-between">
          <h2 className="text-2xl">Club schedule</h2>
          <div className="flex gap-2 items-center">
            <Button variant={"outline"}>
              <ChevronLeftIcon />
            </Button>
            <span className="font-medium text-lg">Today</span>
            <Button variant={"outline"}>
              <ChevronRightIcon />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="bg-brand-gray-bluish ">
            <CardHeader className="flex justify-between items-center">
              <span className="text-brand-gray-dark">10.30 - 12.00</span>
              {/* <Badge>Now</Badge> */}
            </CardHeader>
            <CardContent>
              <h4 className="text-lg">
                Club Meeting: Discussing Upcoming Events
              </h4>
              <Badge className="mb-10">C1.315</Badge>
              <div className="flex gap-2 items-center">
                <Avatar>
                  <AvatarImage src="https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg" />
                </Avatar>
                <div className="flex flex-col gap-1">
                  <p className="leading-4">Kumash Asinovisch</p>
                  <p className="leading-4 text-brand-gray-dark">Coordinator</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-brand-gray-bluish ">
            <CardHeader className="flex justify-between items-center">
              <span className="text-brand-gray-dark">10.30 - 12.00</span>
              <Badge>Now</Badge>
            </CardHeader>
            <CardContent>
              <h4 className="text-lg">
                Club Meeting: Discussing Upcoming Events
              </h4>
              <Badge className="mb-10">C1.315</Badge>
              <div className="flex gap-2 items-center">
                <Avatar>
                  <AvatarImage src="https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg" />
                </Avatar>
                <div className="flex flex-col gap-1">
                  <p className="leading-4">Kumash Asinovisch</p>
                  <p className="leading-4 text-brand-gray-dark">Coordinator</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-brand-gray-bluish ">
            <CardHeader className="flex justify-between items-center">
              <span className="text-brand-gray-dark">10.30 - 12.00</span>
              {/* <Badge>Now</Badge> */}
            </CardHeader>
            <CardContent>
              <h4 className="text-lg">
                Club Meeting: Discussing Upcoming Events
              </h4>
              <Badge className="mb-10">C1.315</Badge>
              <div className="flex gap-2 items-center">
                <Avatar>
                  <AvatarImage src="https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg" />
                </Avatar>
                <div className="flex flex-col gap-1">
                  <p className="leading-4">Kumash Asinovisch</p>
                  <p className="leading-4 text-brand-gray-dark">Coordinator</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {/* <div className="flex justify-end mt-4">
        <Link to={`/admin-panel/survey/create?clubId=${clubId}`}>
          <Button>Create Form</Button>
        </Link>
      </div> */}
    </Section>
  );
};

export default ClubAdminDashboardPage;
