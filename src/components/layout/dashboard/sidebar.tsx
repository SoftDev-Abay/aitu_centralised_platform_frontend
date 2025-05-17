import { Users, LogOut, Key, Layers, LayoutDashboard } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSendLogoutMutation } from "@/features/auth/authApiSlice";

type MenuItem = {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
};

const menuItems: MenuItem[] = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Posts", url: "/dashboard/posts", icon: Users },
  { title: "Events", url: "/dashboard/events", icon: Layers },
  { title: "Clubs", url: "/dashboard/clubs", icon: Key },
];

export function AppSidebar() {
  return (
    <div
      className="
   fixed top-0 left-0 z-50
   flex flex-col h-screen
   bg-brand-secondary 
   px-5 py-[26px]
   transition-all duration-300
   w-[90px] xl:w-[320px]
  "
    >
      {/* Header */}
      <div
        className="flex items-center gap-1 overflow-hidden mb-14
    justify-center xl:justify-start"
      >
        <img
          src="/logo-white-blue.svg"
          className="w-[51px] h-[58px]"
          alt="Logo"
        />

        <span
          className="
     text-[12px] w-[60px] font-semibold text-white leading-4
     hidden xl:block
    "
        >
          ASTANA IT UNIVERSITY
        </span>
      </div>
      {/* Menu Items */}
      <nav className="flex-1">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.title} className="overflow-hidden">
                <NavLink
                  to={item.url}
                  end={item.url === "/dashboard"} // <--- strict match only for base dashboard
                  className={({ isActive }) => `
                  flex items-center 
                  py-3.5
                  px-3.5 
                  rounded-md
                  justify-center xl:justify-start
                  px-3.5 xl:px-[24px]
                  ${
                    isActive
                      ? "bg-brand-primary text-white"
                      : "text-brand-gray-medium hover:bg-brand-primary/20 hover:text-white"
                  }
                  transition-colors duration-200
                `}
                >
                  <Icon className="mr-0 xl:mr-3" />
                  <span className="hidden xl:block">{item.title}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
      {/* Footer */}
      <div className="mt-auto">
        <LogoutButton />
      </div>
    </div>
  );
}

function LogoutButton() {
  const [sendLogout, { isLoading }] = useSendLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await sendLogout({});
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="
    flex items-center w-full p-3 rounded-md
    text-brand-gray-medium hover:bg-brand-primary/20 hover:text-white
    transition-colors duration-200
    justify-center xl:justify-start
   "
    >
      <LogOut className="mr-0 xl:mr-3" />
      <span className="hidden xl:block">
        {isLoading ? "Logging out..." : "Logout"}
      </span>
    </button>
  );
}
