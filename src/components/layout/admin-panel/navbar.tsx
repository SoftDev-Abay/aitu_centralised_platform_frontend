import ProfileDropdown from "@/components/ui/profile-dropdown";
import { useNavbarContext } from "../shared/navbar/navbar-context";
import SettingsMenu from "@/components/shared/settings-menu";
import useAuth from "@/hooks/useAuth";
const AdminPanelNavbar = () => {
  const { pageTitle } = useNavbarContext();
  const { user } = useAuth();
  return (
    <header className="absolute top-0 left-0 w-full flex  shrink-0 items-center gap-2 pl-15 pr-17 py-6.5 justify-between bg-white">
      <div>
        <span className="text-brand-gray-muted font-medium text-sm mb-1.5">
          Hello, {user?.firstName}!
        </span>
        <h3 className="text-xl font-semibold">{pageTitle}</h3>
      </div>

      <div className="flex gap-4 items-center">
        <SettingsMenu />
        <ProfileDropdown />
      </div>
    </header>
  );
};

export default AdminPanelNavbar;
