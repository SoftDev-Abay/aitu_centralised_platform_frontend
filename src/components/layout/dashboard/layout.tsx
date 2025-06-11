import { SidebarInset } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import DashboardNavbar from "./navbar";
import { NavbarProvider } from "../shared/navbar/navbar-context";
import { AppSidebar } from "../shared/sidebar/sidebar";
import {
  Calendar1,
  LayoutDashboard,
  Key,
  Users,
  Layers,
  DockIcon,
  UserIcon,
} from "lucide-react";

const userMenuItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Posts", url: "/dashboard/posts", icon: Users },
  { title: "Events", url: "/dashboard/events", icon: Layers },
  {
    title: "Clubs",
    url: "/dashboard/clubs",
    icon: Key,
    // subItems: [
    //   {
    //     title: "Music",
    //     url: "/dashboard/events/create",
    //     icon: UsersIcon,
    //     // subItems: [],
    //   },
    //   {
    //     title: "Chess",
    //     url: "/dashboard/events/create",
    //     icon: UsersIcon,
    //     // subItems: [],
    //   },
    // ],
  },
  { title: "Applications", url: "/dashboard/applications", icon: DockIcon },
  { title: "Calendar", url: "/dashboard/calendar", icon: Calendar1 },
  { title: "Profile", url: "/dashboard/profile", icon: UserIcon },
];

export default function DashboardLayout() {
  return (
    <div className="relative bg-brand-gray-light">
      <AppSidebar menuItems={userMenuItems} />
      <div className="ml-[90px] xl:ml-[320px]">
        <SidebarInset>
          <NavbarProvider>
            <DashboardNavbar />
            <div className="bg-brand-gray-light pt-[104px]  min-h-screen flex flex-col">
              <Outlet />
            </div>
          </NavbarProvider>
        </SidebarInset>
      </div>
    </div>
  );
}
