import {
  createApi,
  fetchBaseQuery,
  FetchArgs,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../../app/store";
import { logOut, setCredentials } from "@/features/auth/authSlice";

const redirectToLogin = () => {
  window.location.href = "/auth/sign-in";
};

const baseQuery = fetchBaseQuery({
  // baseUrl: "http://localhost:8080/rest",
  baseUrl: import.meta.env.VITE_BACKEND_URL,
  // baseUrl: "http://localhost:8080/api/v1",
  // credentials: "include", // allow sending cookies (refresh token)
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    console.log("token", token);

    if (token && token !== "undefined") {
      headers.set("Authorization", `Bearer ${token}`);
      console.log("we set token on authorization ", token);
    }

    return headers;
  },
});

const baseQueryWithAuthHandling = async (
  args: FetchArgs,
  api: any,
  extraOptions?: any
) => {
  let result = await baseQuery(args, api, extraOptions);

  // Check for expired/invalid access token (unauthorized)
  if (result?.error?.status === 401) {
    // console.warn("Access token expired or invalid. Attempting refresh...");

    // Attempt to refresh the token using the secure cookie
    // const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);

    // if (refreshResult.data) {
    //   const refreshData = refreshResult.data as { access_token: string };

    //   // Save new access token to Redux
    //   api.dispatch(setCredentials({ token: refreshData.access_token }));

    //   // Retry original request
    //   result = await baseQuery(args, api, extraOptions);
    // } else {
    // If refresh also fails, log out
    console.error("Refresh token invalid or expired. Logging out.");
    api.dispatch(logOut());
    redirectToLogin();
    // return refreshResult;
    // }
  }

  // If authenticated but access is denied due to role/permissions
  if (result?.error?.status === 403) {
    console.warn(
      "Access denied: You do not have permission for this resource."
    );
    // Optional: Show a UI message or redirect somewhere else
    // E.g., redirectToForbiddenPage();
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithAuthHandling,
  endpoints: () => ({}),
  tagTypes: ["Club", "Event", "Post", "Comment", "ClubMember", "Notification"],
});
