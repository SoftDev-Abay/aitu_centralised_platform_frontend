import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

interface RequireAuthProps {
  allowedRoles?: string[];
}

const RequireAuth: React.FC<RequireAuthProps> = () => {
  const location = useLocation();
  const { uid } = useAuth();

  const content = uid ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/sign-in" state={{ from: location }} replace />
  );

  return content;
};

export default RequireAuth;
