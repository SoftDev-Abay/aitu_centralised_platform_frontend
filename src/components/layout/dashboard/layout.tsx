import { AppSidebar } from "./sidebar";
import {
  SidebarInset,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar/navbar";
import { NavbarProvider } from "./navbar/navbar-context";
export default function DashboardLayout() {
  return (
    <div className="relative bg-brand-gray-light">
      <AppSidebar />
      <div className="ml-[90px] xl:ml-[320px] min-h-screen">
        <SidebarInset>
          <NavbarProvider>
            <Navbar />
            <div className="bg-brand-gray-light h-full">
              <Outlet />
            </div>
          </NavbarProvider>
        </SidebarInset>
      </div>
    </div>
  );
}
