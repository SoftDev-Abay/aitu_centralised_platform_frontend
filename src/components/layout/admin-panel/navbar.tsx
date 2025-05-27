import SearchBar from "@/components/ui/search-bar";
import ProfileDropdown from "@/components/ui/profile-dropdown";
import { Bell } from "lucide-react";
import { useNavbarContext } from "../shared/navbar/navbar-context";

const AdminPanelNavbar = () => {
  const { pageTitle } = useNavbarContext();

  return (
    <header className="absolute top-0 left-0 w-full flex  shrink-0 items-center gap-2 pl-15 pr-17 py-6.5 justify-between bg-white">
      <div>
        <span className="text-brand-gray-muted font-medium text-sm mb-1.5">
          Hello, Abay!
        </span>
        <h3 className="text-xl font-semibold">{pageTitle}</h3>
      </div>
    </header>
  );
};

export default AdminPanelNavbar;
