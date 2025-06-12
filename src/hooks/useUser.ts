// features/auth/useUser.ts
import { setUser } from "@/features/auth/authSlice";
import { useGetUserVisitorQuery } from "@/features/users/usersApiSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useUser = () => {
  const dispatch = useDispatch();
  const { data: userData, isLoading, isError } = useGetUserVisitorQuery();

  useEffect(() => {
    if (userData) {
      dispatch(setUser({ user: userData }));
    }
  }, [userData, dispatch]);

  return { isLoading, isError };
};
