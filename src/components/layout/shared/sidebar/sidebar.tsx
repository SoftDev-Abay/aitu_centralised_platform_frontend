import {
  Users,
  LogOut,
  Key,
  Layers,
  LayoutDashboard,
  Calendar1,
  ShieldCheck,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSendLogoutMutation } from "@/features/auth/authApiSlice";
import { useGetUserAndClubsQuery } from "@/features/users/usersApiSlice";
import { useEffect } from "react";
import { setUser } from "@/features/auth/authSlice";
import { useDispatch } from "react-redux";

type MenuItem = {
  title: string;
  url: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

type AppSidebarProps = {
  menuItems: MenuItem[];
};

export function AppSidebar({ menuItems }: AppSidebarProps) {
  // const { data, isLoading, isError } = useGetUserAndClubsQuery();
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if (!isLoading && data) {
  //     dispatch(setUser({ user: data }));
  //   }
  // }, [isLoading]);

  // const role = data?.role;
  // const menuItems = role === "ADMIN" ? adminMenuItems : userMenuItems;

  // console.log(data);

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

      <nav className="flex-1">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.title} className="overflow-hidden">
                <NavLink
                  to={item.url}
                  end
                  // end={item.url === "/dashboard"}
                  className={({ isActive }) => `
                  flex items-center 
                  py-3.5
                  px-3.5
                  rounded-md
                  justify-center xl:justify-start
                  xl:px-[24px]
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
    navigate("/auth/sign-in");
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
