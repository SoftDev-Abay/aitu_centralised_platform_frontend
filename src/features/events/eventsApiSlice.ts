import { apiSlice } from "@/app/api/apiSlice";
import {
  EventDto,
  EventCreateDto,
  EventIdParam,
  PaginatedEventsDto,
  ParamsPaginatedEventsDto,
  CalendarDayDto,
} from "./types";

export const eventsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllEvents: builder.query<PaginatedEventsDto, ParamsPaginatedEventsDto>({
      query: ({
        size = 10,
        page = 0,
        type,
        category, // Added
        search, // Added
        sortBy, // Added
        sortDir, // Added
      }) => ({
        url: "/events", // Updated endpoint
        method: "GET",
        params: {
          size,
          page,
          type,
          category, // Added
          search, // Added
          sortBy, // Added
          sortDir, // Added
        },
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "Event", id: "LIST" },
              ...result.data.map((e) => ({ type: "Event" as const, id: e.id })),
            ]
          : [{ type: "Event", id: "LIST" }],
    }),
    getMyEvents: builder.query<PaginatedEventsDto, ParamsPaginatedEventsDto>({
      query: ({
        size = 10,
        page = 0,
        sortDir, // Added
      }) => ({
        url: "/events/me", // Updated endpoint
        method: "GET",
        params: {
          size,
          page,
          sortDir, // Added
        },
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "Event", id: "LIST" },
              ...result.data.map((e) => ({ type: "Event" as const, id: e.id })),
            ]
          : [{ type: "Event", id: "LIST" }],
    }),
    getCalendar: builder.query<
      CalendarDayDto[],
      { year: number; month?: number }
    >({
      query: ({ year, month }) => ({
        url: "/calendar",
        method: "GET",
        params: month != null ? { year, month } : { year },
      }),
    }),
    getAllEventsByClubId: builder.query<EventDto[], { clubId: string }>({
      query: ({ clubId }) => ({
        url: `/events/club/${clubId}`,
        method: "GET",
        params: {
          clubId,
        },
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "Event", id: "LIST" },
              ...result.map((e) => ({ type: "Event" as const, id: e.id })),
            ]
          : [{ type: "Event", id: "LIST" }],
    }),

    getEventById: builder.query<EventDto, EventIdParam>({
      query: ({ id }) => ({
        url: `/events/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _err, { id }) => [{ type: "Event", id }],
    }),

    createEvent: builder.mutation<EventDto, EventCreateDto>({
      query: (body) => ({
        url: "/events",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Event", id: "LIST" }],
    }),

    updateEvent: builder.mutation<
      EventDto,
      { id: string; data: EventCreateDto }
    >({
      query: ({ id, data }) => ({
        url: `/events/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_res, _err, { id }) => [{ type: "Event", id }],
    }),

    subscribeToEvent: builder.mutation<void, EventIdParam>({
      query: ({ id }) => ({
        url: `/events/${id}/subscribe`,
        method: "POST",
      }),
      invalidatesTags: (_res, _err, { id }) => [{ type: "Event", id }],
    }),

    unsubscribeFromEvent: builder.mutation<void, EventIdParam>({
      query: ({ id }) => ({
        url: `/events/${id}/unsubscribe`,
        method: "POST",
      }),
      invalidatesTags: (_res, _err, { id }) => [{ type: "Event", id }],
    }),
  }),
});

export const {
  useGetAllEventsQuery,
  useGetEventByIdQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useSubscribeToEventMutation,
  useUnsubscribeFromEventMutation,
  useGetAllEventsByClubIdQuery,
  useGetCalendarQuery,
  useGetMyEventsQuery
} = eventsApiSlice;
