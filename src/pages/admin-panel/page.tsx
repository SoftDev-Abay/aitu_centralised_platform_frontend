import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Section from "@/components/ui/section";
import { Separator } from "@/components/ui/separator";
import {
  Ellipsis,
  Layers3Icon,
  MessageCircle,
  StarIcon,
  User,
  UsersIcon,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import QuickLinkCard from "@/components/shared/QuickLinkCard";

const mockRows = [
  { date: "2024-06-01", event: "Music Club Registration", status: "Unread" },
  { date: "2024-06-03", event: "New Event Rules Released", status: "Reviewed" },
  { date: "2024-06-05", event: "Photography Club Signup", status: "Unread" },
  { date: "2024-06-07", event: "Literature Contest Open", status: "Reviewed" },
  { date: "2024-06-09", event: "Art Club Exhibition Update", status: "Unread" },
  {
    date: "2024-06-11",
    event: "Volunteer Activity Launch",
    status: "Reviewed",
  },
  { date: "2024-06-13", event: "Summer Camp Details", status: "Unread" },
  {
    date: "2024-06-15",
    event: "Coding Challenge Briefing",
    status: "Reviewed",
  },
];

const AdminDashboardPage = () => {
  return (
    <Section
      variant="wide"
      className="bg-brand-gray-bluish pt-[75px] pb-[60px] h-full flex-grow"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-13">
        <QuickLinkCard
          icon={<UsersIcon />}
          iconBg="bg-slate-300"
          title="My clubs"
          subtitle="Quick links"
          url={"/dashboard/clubs/my"}
        />
        <QuickLinkCard
          icon={<Layers3Icon />}
          iconBg="bg-blue-200"
          title="Subscribed"
          subtitle="Quick links"
          url={"/dashboard/events/my"}
        />
        <QuickLinkCard
          icon={<StarIcon />}
          iconBg="bg-yellow-300"
          title="Applications"
          subtitle="Quick links"
          url={"/dashboard/applications"}
        />
      </div>
      <div className="mb-[57px]">
        <p className="mb-[20px] font-semibold">Upcoming events</p>
        <div className="bg-white p-6 flex gap-6  flex-col 2xl:flex-row">
          <img src="/images/club.png" alt="" className="h-full 2xl:h-[251px]" />
          <div className="">
            <div className="flex gap-4 mb-3">
              <p className="text-brand-gray-medium  text-xs">
                Uploaded:
                <span className="text-brand-gray-steel">Jan 21, 2022</span>
              </p>
              <p className="text-brand-gray-medium  text-xs">
                Last Updated:
                <span className="text-brand-gray-steel">Sep 21, 2022</span>
              </p>
            </div>

            <h3 className="text-[20px] font-semibold mb-2">
              2021 Complete Python Bootcamp From Zero
            </h3>
            <p className="text-sm text-brand-gray-muted mb-[29px]">
              The club is aimed at talented students who want to develop
              creatively, love to sing and play musical instruments, and in
              every possible way contribute to the wide popularization of music.
              Music Club is a unique music workshop and our main motto is “Music
              is what makes us happier.”
            </p>
            <Separator className="mb-5.5 bg-brand-gray-light" />
            <div className="flex justify-between items-end flex-wrap">
              <div className="flex gap-1.5 items-center">
                <User size={20} className="text-brand-secondary" />
                <span className="text-brand-gray-steel text-sm font-medium">
                  500 students
                </span>
              </div>
              <div className="flex gap-3">
                <Button className="bg-primary rounded-none h-12 px-6">
                  Meeting Registration
                </Button>
                <div className="p-3 bg-brand-gray-bluish">
                  <Ellipsis />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid gap-y-[29px] lg:gap-x-[29px] grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
        {/* <Card className="border-0 bg-white rounded-none col-span-2 py-0 gap-0"> */}
        <Card className="border-0 shadow-none bg-white rounded-none col-span-2 py-0 gap-0">
          <CardHeader className="flex justify-between items-center px-5 py-4">
            <p className="font-medium">Recent announcements</p>
            <Select>
              <SelectTrigger className="border-0 shadow-none text-sm text-brand-gray-muted">
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent defaultValue={"today"}>
                <SelectGroup>
                  <SelectLabel>Time</SelectLabel>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">Week</SelectItem>
                  <SelectItem value="month">Month</SelectItem>
                  <SelectItem value="year">Year</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {/* <div className="flex items-center gap-2 text-brand-gray-muted">
              <span className="text-sm">Today</span>
              <ChevronDown size={18} />
            </div> */}
          </CardHeader>
          <Separator />
          <CardContent className="px-5 flex flex-col gap-4">
            <div className="flex gap-3 py-3">
              <div className="h-8 w-8 rounded-full shrink-0 bg-brand-primary flex justify-center items-center">
                <MessageCircle size={16} className="text-white" />
              </div>
              <div>
                <p className="mb-1.5 leading-5">
                  <strong className="font-semibold">Kevin</strong> comments on
                  your lecture “What is ux” in “2021 ui/ux design with figma”
                </p>
                <span className="text-xs text-brand-gray-medium">
                  5 min ago
                </span>
              </div>
            </div>
            <div className="flex gap-3 py-3">
              <div className="h-8 w-8 rounded-full shrink-0 bg-brand-primary flex justify-center items-center">
                <MessageCircle size={16} className="text-white" />
              </div>
              <div>
                <p className="mb-1.5 leading-5">
                  <strong className="font-semibold">Kevin</strong> comments on
                  your lecture “What is ux” in “2021 ui/ux design with figma”
                </p>
                <span className="text-xs text-brand-gray-medium">
                  5 min ago
                </span>
              </div>
            </div>
            <div className="flex gap-3 py-3">
              <div className="h-8 w-8 rounded-full shrink-0 bg-brand-primary flex justify-center items-center">
                <MessageCircle size={16} className="text-white" />
              </div>
              <div>
                <p className="mb-1.5 leading-5">
                  <strong className="font-semibold">Kevin</strong> comments on
                  your lecture “What is ux” in “2021 ui/ux design with figma”
                </p>
                <span className="text-xs text-brand-gray-medium">
                  5 min ago
                </span>
              </div>
            </div>
            <div className="flex gap-3 py-3">
              <div className="h-8 w-8 rounded-full shrink-0 bg-brand-primary flex justify-center items-center">
                <MessageCircle size={16} className="text-white" />
              </div>
              <div>
                <p className="mb-1.5 leading-5">
                  <strong className="font-semibold">Kevin</strong> comments on
                  your lecture “What is ux” in “2021 ui/ux design with figma”
                </p>
                <span className="text-xs text-brand-gray-medium">
                  5 min ago
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* <Card className=" border-0 bg-white rounded-none col-span-3 py-0 gap-0"> */}
        <Card className="shadow-none border-0 bg-white rounded-none col-span-3 py-0 gap-0">
          <CardHeader className="flex justify-between items-center px-5 py-5.5">
            <p className="font-medium">Recent announcements</p>

            {/* <div className="flex items-center gap-2 text-brand-gray-muted">
              <span className="text-sm">Today</span>
              <ChevronDown size={18} />
            </div> */}
          </CardHeader>
          <CardContent className="px-0">
            <Table>
              <TableHeader className="bg-brand-gray-bluish">
                <TableRow className="border-none bg-brand-gray-bluish">
                  <TableHead className="px-5 py-[9px] text-brand-gray-muted font-medium">
                    Date
                  </TableHead>
                  <TableHead className="px-5 py-[9px] text-brand-gray-muted font-medium">
                    Event
                  </TableHead>
                  <TableHead className="px-5 py-[9px] text-brand-gray-muted font-medium">
                    Status
                  </TableHead>
                  <TableHead className="px-5 py-[9px] text-brand-gray-muted font-medium "></TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {mockRows.map((row, idx) => (
                  <TableRow
                    key={idx}
                    className="border-none hover:bg-transparent"
                  >
                    <TableCell className="px-5 py-[13px] text-brand-gray-steel">
                      {row.date}
                    </TableCell>

                    <TableCell className="px-5 py-[13px] text-brand-gray-steel">
                      {row.event}
                    </TableCell>

                    <TableCell className="px-5 py-[13px] text-brand-gray-steel">
                      <span
                        className={cn(
                          "font-medium",
                          row.status === "Unread"
                            ? "text-brand-primary"
                            : "text-brand-success"
                        )}
                      >
                        {row.status}
                      </span>
                    </TableCell>

                    <TableCell className="px-5 py-[13px] text-brand-gray-steel flex justify-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Ellipsis className="cursor-pointer" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuCheckboxItem>
                            Status Bar
                          </DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem disabled>
                            Activity Bar
                          </DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem>
                            Panel
                          </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
};

export default AdminDashboardPage;
