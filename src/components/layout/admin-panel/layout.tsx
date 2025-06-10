import { SidebarInset } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "../shared/sidebar/sidebar";
import { HomeIcon, KeyIcon, LayersIcon, UsersIcon } from "lucide-react";
import AdminPanelNavbar from "./navbar";
import { NavbarProvider } from "../shared/navbar/navbar-context";

const adminMenuItems = [
  { title: "Home", url: "/admin-panel", icon: HomeIcon },

  // { title: "Clubs Create", url: "/admin-panel/clubs/create", icon: KeyIcon },
  { title: "Posts", url: "/admin-panel/posts", icon: UsersIcon },
  // { title: "Posts Create", url: "/admin-panel/posts/create", icon: UsersIcon },
  {
    title: "Events",
    url: "/admin-panel/events",
    icon: UsersIcon,
  },
  // {
  //   title: "Events",
  //   icon: UsersIcon,
  //   subItems: [
  //     {
  //       title: "All",
  //       url: "/admin-panel/events/create",
  //       icon: UsersIcon,
  //       // subItems: [],
  //     },
  //     {
  //       title: "Create",
  //       url: "/admin-panel/events/create",
  //       icon: UsersIcon,
  //       // subItems: [],
  //     },
  //   ],
  // },

  { title: "Clubs", url: "/admin-panel/clubs", icon: LayersIcon },
];

export default function AdminPanelLayout() {
  return (
    <div className="relative bg-brand-gray-light">
      <AppSidebar menuItems={adminMenuItems} />
      <div className="ml-[90px] xl:ml-[320px]">
        <SidebarInset>
          <NavbarProvider>
            <AdminPanelNavbar />
            <div className="bg-brand-gray-light pt-[104px] min-h-screen flex flex-col">
              <Outlet />
            </div>
          </NavbarProvider>
        </SidebarInset>
      </div>
    </div>
  );
}
