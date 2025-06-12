// src/components/ui/settings-menu.tsx

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuth from "@/hooks/useAuth";
import { SettingsIcon } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const SettingsMenu = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isDashboard = location.pathname.startsWith("/dashboard");
  const isAdminPanel = location.pathname.startsWith("/admin-panel");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="p-3 bg-brand bg-brand-gray-bluish relative cursor-pointer">
          <SettingsIcon size={24} />
          <span className="sr-only">Settings</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={() => navigate("/settings/profile")}>
          Profile Settings
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/settings/notifications")}>
          Notifications
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/settings/account")}>
          Account
        </DropdownMenuItem>
        {user?.role === "ADMIN" && isDashboard && (
          <DropdownMenuItem onClick={() => navigate("/admin-panel")}>
            Switch to Admin Panel
          </DropdownMenuItem>
        )}
        {user?.role === "ADMIN" && isAdminPanel && (
          <DropdownMenuItem onClick={() => navigate("/dashboard")}>
            Switch to Dashboard
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SettingsMenu;
