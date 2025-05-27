import { SidebarInset } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
// import { NavbarProvider } from "../shared/navbar/navbar-context";
// import AdminPanelNavbar from "./navbar";
import { AppSidebar } from "../shared/sidebar/sidebar";
import { HomeIcon, KeyIcon, LayersIcon, UsersIcon } from "lucide-react";

const adminMenuItems = [
  { title: "Clubs Create", url: "/admin-panel/clubs/create", icon: KeyIcon },
  { title: "Posts Create", url: "/admin-panel/posts/create", icon: UsersIcon },
  {
    title: "Events Create",
    url: "/admin-panel/events/create",
    icon: UsersIcon,
  },
  { title: "Clubs", url: "/admin-panel/clubs", icon: LayersIcon },
  { title: "Home", url: "/admin-panel", icon: HomeIcon },
];

export default function AdminPanelLayout() {
  return (
    <div className="relative bg-brand-gray-light">
      <AppSidebar menuItems={adminMenuItems} />
      <div className="ml-[90px] xl:ml-[320px]">
        <SidebarInset>
          {/* <NavbarProvider> */}
          {/* <AdminPanelNavbar /> */}
          <div className="bg-brand-gray-light  min-h-screen flex flex-col">
            <Outlet />
          </div>
          {/* </NavbarProvider> */}
        </SidebarInset>
      </div>
    </div>
  );
}
