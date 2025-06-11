import { apiSlice } from "@/app/api/apiSlice";
import { NotificationIdParam, PaginatedNotifications } from "./types";

export const notificationsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get paginated notifications (optionally filter by read)
    getNotifications: builder.query<
      PaginatedNotifications,
      { page?: number; size?: number; unreadOnly?: boolean }
    >({
      query: ({ page = 0, size = 20, unreadOnly = false }) => ({
        url: "/notifications",
        method: "GET",
        params: {
          arg0: page,
          arg1: size,
          arg2: unreadOnly,
        },
      }),
      providesTags: (result) =>
        result?.data
          ? [
              { type: "Notification", id: "LIST" },
              ...result.data.map((n) => ({
                type: "Notification" as const,
                id: n.id,
              })),
            ]
          : [{ type: "Notification", id: "LIST" }],
    }),

    // Get unread count
    getUnreadCount: builder.query<Record<string, number>, void>({
      query: () => ({
        url: "/notifications/unread/count",
        method: "GET",
      }),
      providesTags: [{ type: "Notification", id: "UNREAD_COUNT" }],
    }),

    // Mark a notification as read
    markNotificationAsRead: builder.mutation<void, NotificationIdParam>({
      query: ({ id }) => ({
        url: `/notifications/${id}/read`,
        method: "PUT",
      }),
      invalidatesTags: (_res, _err, { id }) => [
        { type: "Notification", id },
        { type: "Notification", id: "LIST" },
        { type: "Notification", id: "UNREAD_COUNT" },
      ],
    }),

    // Ping (probably for health check or live connection)
    pingNotifications: builder.query<string, void>({
      query: () => ({
        url: "/notifications/ping",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useGetUnreadCountQuery,
  useMarkNotificationAsReadMutation,
  usePingNotificationsQuery,
} = notificationsApiSlice;
