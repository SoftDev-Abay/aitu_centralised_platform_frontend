import { logOut } from "@/features/auth/authSlice";
import { LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/auth/sign-in");
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center w-full p-3 rounded-md text-brand-gray-medium hover:bg-brand-primary/20 hover:text-white transition-colors duration-200 justify-center xl:justify-start cursor-pointer"
    >
      <LogOut className="mr-0 xl:mr-3" />
      <span className="hidden xl:block">Logout</span>
    </button>
  );
}

export default LogoutButton;
