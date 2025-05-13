import { AppSidebar } from "./sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar/navbar";
import { NavbarProvider } from "./navbar/navbar-context";
export default function DashboardLayout() {
  return (
    <div className="relative bg-brand-gray-light">
      <AppSidebar />
      <div className="ml-[90px] xl:ml-[320px]">
        <SidebarInset>
          <NavbarProvider>
            <Navbar />
            <div className="bg-brand-gray-light pt-[104px]  min-h-screen flex flex-col">
              <Outlet />
            </div>
          </NavbarProvider>
        </SidebarInset>
      </div>
    </div>
  );
}
