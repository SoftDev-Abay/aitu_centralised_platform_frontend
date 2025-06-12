// import { useLocation, Navigate, Outlet } from "react-router-dom";
// import useAuth from "../../hooks/useAuth";

// interface RequireAuthProps {
//   allowedRoles?: string[];
// }

// const RequireAuth: React.FC<RequireAuthProps> = () => {
//   const location = useLocation();
//   const { sub } = useAuth();

//   const content = sub ? (
//     <Outlet />
//   ) : (
//     <Navigate to="/auth/sign-in" state={{ from: location }} replace />
//   );

//   return content;
// };

// export default RequireAuth;

import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useUser } from "@/hooks/useUser";

interface RequireAuthProps {
  allowedRoles?: string[];
}

const RequireAuth: React.FC<RequireAuthProps> = ({ allowedRoles }) => {
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();
  const { isLoading, isError } = useUser();

  // Show loading state while fetching user data
  if (isLoading) {
    return null;
    // return <LoadingScreen />;
  }

  // Redirect if not authenticated
  if (!isAuthenticated || isError) {
    console.error(
      "User is not authenticated or there was an error fetching user data.",
      { isAuthenticated, isError, user }
    );

    return <Navigate to="/auth/sign-in" state={{ from: location }} replace />;
  }

  // Check roles if specified
  if (allowedRoles) {
    const userRoles = user?.role ? [user.role] : []; // Adjust based on your role structure
    const hasRequiredRole = userRoles.some((role) =>
      allowedRoles.includes(role)
    );

    if (!hasRequiredRole) {
      console.error("User does not have the required role.", {
        userRoles,
        allowedRoles,
      });

      return <Navigate to="/unauthorized" state={{ from: location }} replace />;
    }
  }

  return <Outlet />;
};

export default RequireAuth;
