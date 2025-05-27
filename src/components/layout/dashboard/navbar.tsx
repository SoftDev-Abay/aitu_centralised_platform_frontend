import SearchBar from "@/components/ui/search-bar";
import ProfileDropdown from "@/components/ui/profile-dropdown";
import { Bell } from "lucide-react";
import { useNavbarContext } from "../shared/navbar/navbar-context";

const DashboardNavbar = () => {
  const { pageTitle } = useNavbarContext();

  return (
    <header className="absolute top-0 left-0 w-full flex  shrink-0 items-center gap-2 pl-15 pr-17 py-6.5 justify-between bg-white">
      <div>
        <span className="text-brand-gray-muted font-medium text-sm mb-1.5">
          Hello, Abay!
        </span>
        <h3 className="text-xl font-semibold">{pageTitle}</h3>
      </div>

      <div className="flex gap-4 items-center">
        <SearchBar />
        <div className="p-3 bg-brand bg-brand-gray-bluish relative">
          <Bell size={24} />
          <div className="absolute top-[13px] right-[15px] w-2 h-2 bg-brand-primary rounded-full border border-white"></div>
        </div>
        <ProfileDropdown />
      </div>
    </header>
  );
};

export default DashboardNavbar;
