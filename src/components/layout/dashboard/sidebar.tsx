import { Users, LogOut, Link2, Key, Layers } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSendLogoutMutation } from "@/features/auth/authApiSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

const items = [
  {
    title: "Roles",
    url: "/dashboard/roles",
    icon: Users,
  },
  {
    title: "Objects",
    url: "/dashboard/objects",
    icon: Layers,
  },
  {
    title: "Permissions",
    url: "/dashboard/permissions",
    icon: Key,
  },
  {
    title: "Users",
    url: "/dashboard/users",
    icon: Users,
  },
  {
    title: "Departments",
    url: "/dashboard/departments",
    icon: Users,
  },
];

const mockItems = [
  {
    title: "Mock Link 1",
    url: "#",
    icon: Link2,
  },
  {
    title: "Mock Link 2",
    url: "#",
    icon: Link2,
  },
  {
    title: "Mock Link 3",
    url: "#",
    icon: Link2,
  },
];

function LogoutButton() {
  const [sendLogout, { isLoading, isSuccess, isError }] =
    useSendLogoutMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
  }, [isSuccess, navigate]);

  const handleLogout = () => {
    sendLogout({});
  };

  return (
    <SidebarMenuItem onClick={handleLogout} className="cursor-pointer">
      <SidebarMenuButton asChild>
        <div className="flex items-center w-full">
          <LogOut className="mr-2" />
          {isLoading ? <LoadingSpinner /> : <span>Logout</span>}
        </div>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export function AppSidebar() {
  return (
    <Sidebar>
      <div className="flex flex-col h-full px-2 pt-2 pb-4">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url} className="flex items-center">
                        <item.icon className="mr-2" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Mock Links</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {mockItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url} className="flex items-center">
                        <item.icon className="mr-2" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <div className="mt-auto">
          <SidebarContent>
            <SidebarMenu>
              <LogoutButton />
            </SidebarMenu>
          </SidebarContent>
        </div>
      </div>
    </Sidebar>
  );
}
