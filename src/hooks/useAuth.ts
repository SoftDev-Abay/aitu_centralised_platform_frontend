// features/auth/useAuth.ts
import { useSelector } from "react-redux";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "@/features/auth/authSlice";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  sub: string;
  iat: number;
  exp: number;
}

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);

  if (token) {
    const decoded = jwtDecode(token) as DecodedToken;
    const { sub, exp, iat } = decoded;

    return {
      sub,
      exp,
      iat,
      user, // Full user data from the visitor endpoint
      isAuthenticated: sub && !!user,
    };
  }

  return {
    sub: null,
    exp: null,
    iat: null,
    user: null, // Full user data from the visitor endpoint
    isAuthenticated: null,
  };
};

export default useAuth;
