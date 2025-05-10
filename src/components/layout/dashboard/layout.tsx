import { AppSidebar } from "./sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import SmartBreadcrumbs from "@/components/ui/smart-bread-crumbs";
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
