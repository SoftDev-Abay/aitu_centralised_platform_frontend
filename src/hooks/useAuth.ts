import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  authorized: boolean;
  exp: number;
  uid: number;
}

const useAuth = () => {
  const token = useSelector(selectCurrentToken);

  if (token) {
    const decoded = jwtDecode(token) as DecodedToken;
    const { authorized, uid } = decoded;

    return { uid, authorized };
  }

  return { uid: null, authorized: false };
};

export default useAuth;
