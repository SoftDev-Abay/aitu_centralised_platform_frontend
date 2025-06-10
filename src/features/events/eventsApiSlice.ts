import { apiSlice } from "@/app/api/apiSlice";
import { EventDto, EventCreateDto, EventIdParam } from "./types";

export const eventsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllEvents: builder.query<EventDto[], void>({
      query: () => ({
        url: "/events",
        method: "GET",
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
} = eventsApiSlice;
