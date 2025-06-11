import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { NavLink } from "react-router-dom";
import LogoutButton from "@/components/shared/logout-button";

export type MenuItem = {
  title: string;
  url?: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  subItems?: MenuItem[];
};

export type AppSidebarProps = {
  menuItems: MenuItem[];
};

export function AppSidebar({ menuItems }: AppSidebarProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleSubmenu = (index: number, hasSubmenu: boolean) => {
    if (hasSubmenu) {
      setOpenIndex(openIndex === index ? null : index);
    }
  };

  return (
    <div className="fixed top-0 left-0 z-50 flex flex-col h-screen bg-brand-secondary px-5 py-[26px] transition-all duration-300 w-[90px] xl:w-[320px]">
      <div className="flex items-center gap-1 overflow-hidden mb-14 justify-center xl:justify-start">
        <img
          src="/logo-white-blue.svg"
          className="w-[51px] h-[58px]"
          alt="Logo"
        />
        <span className="text-[12px] w-[60px] font-semibold text-white leading-4 hidden xl:block">
          ASTANA IT UNIVERSITY
        </span>
      </div>

      <nav className="flex-1">
        <ul className="space-y-1">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const hasSubmenu = item.subItems && item.subItems.length > 0;
            const isActiveParent = openIndex === index;

            return (
              <li key={item.title} className="overflow-hidden">
                <div className="relative">
                  <NavLink
                    to={item.url || "#"}
                    end={!hasSubmenu}
                    onClick={(e) => {
                      if (hasSubmenu) {
                        e.preventDefault();
                        toggleSubmenu(index, hasSubmenu);
                      }
                    }}
                    className={({ isActive }) => `
                      flex items-center justify-between
                      py-3.5 px-3.5 w-full
                      rounded-md
                      ${
                        isActive || isActiveParent
                          ? "bg-brand-primary text-white"
                          : "text-brand-gray-medium hover:bg-brand-primary/20 hover:text-white"
                      }
                      transition-colors duration-200
                      xl:px-[24px]
                    `}
                  >
                    <span className="flex items-center">
                      <Icon className="mr-0 xl:mr-3" />
                      <span className="hidden xl:block">{item.title}</span>
                    </span>
                    {hasSubmenu && (
                      <span className="hidden xl:block">
                        {isActiveParent ? (
                          <ChevronUp size={18} />
                        ) : (
                          <ChevronDown size={18} />
                        )}
                      </span>
                    )}
                  </NavLink>

                  {hasSubmenu && isActiveParent && (
                    <ul className="mt-1 space-y-1 xl:pl-8">
                      {item.subItems!.map((sub) => (
                        <li key={sub.title} className="overflow-hidden">
                          <NavLink
                            to={sub.url!}
                            className={({ isActive }) => `
                              flex items-center py-3 px-3 rounded-md
                              text-sm
                              ${
                                isActive
                                  ? "bg-brand-primary text-white"
                                  : "text-brand-gray-medium hover:bg-brand-primary/20 hover:text-white"
                              }
                              transition-colors duration-200
                            `}
                          >
                            {sub.title}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
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
