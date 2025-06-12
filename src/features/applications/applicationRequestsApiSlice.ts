import { apiSlice } from "@/app/api/apiSlice";
import {
  ClubApplicationRequestDto,
  ClubApplicationRequestCreateDto,
  ClubApplicationRequestResponseDto,
  ApplicationsByFormParams,
  ApplicationIdParam,
  PaginatedClubApplicationRequestsDto,
} from "./types";

export const applicationRequestsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createApplicationRequest: builder.mutation<
      ClubApplicationRequestDto,
      ClubApplicationRequestCreateDto
    >({
      query: (body) => ({
        url: "/clubs/applications/request",
        method: "POST",
        body,
      }),
      invalidatesTags: ["ApplicationRequest"],
    }),

    respondToApplication: builder.mutation<
      ClubApplicationRequestDto,
      ClubApplicationRequestResponseDto
    >({
      query: (body) => ({
        url: "/clubs/applications/request/response",
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        "ApplicationRequest",
        { type: "ApplicationRequest", id: arg.requestId },
      ],
    }),

    getApplicationsByVisitor: builder.query<
      PaginatedClubApplicationRequestsDto,
      { page?: number; pageSize?: number }
    >({
      query: ({ page = 0, pageSize = 5 }) => ({
        url: "/clubs/applications/request/visitor",
        method: "GET",
        params: { page, pageSize },
      }),
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ id }) => ({
                type: "ApplicationRequest" as const,
                id,
              })),
              { type: "ApplicationRequest", id: "VISITOR_LIST" },
            ]
          : [{ type: "ApplicationRequest", id: "VISITOR_LIST" }],
    }),

    getApplicationsByClub: builder.query<
      PaginatedClubApplicationRequestsDto,
      { page?: number; pageSize?: number; clubId: string }
    >({
      query: ({ page = 0, pageSize = 5, clubId }) => ({
        url: `/clubs/applications/request/club/${clubId}`,
        method: "GET",
        params: { page, pageSize },
      }),
      providesTags: (result, error, { clubId }) => [
        { type: "ApplicationRequest", id: `CLUB_${clubId}` },
      ],
    }),

    getApplicationsByForm: builder.query<
      ClubApplicationRequestDto[],
      ApplicationsByFormParams
    >({
      query: ({ formId }) => ({
        url: `/clubs/applications/request/form/${formId}`,
        method: "GET",
      }),
      providesTags: (result, error, { formId }) => [
        { type: "ApplicationRequest", id: `FORM_${formId}` },
      ],
    }),

    getApplicationById: builder.query<
      ClubApplicationRequestDto,
      ApplicationIdParam
    >({
      query: ({ id }) => ({
        url: `/clubs/applications/request/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, { id }) => [
        { type: "ApplicationRequest", id },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateApplicationRequestMutation,
  useRespondToApplicationMutation,
  useGetApplicationsByVisitorQuery,
  useGetApplicationsByFormQuery,
  useGetApplicationByIdQuery,
  useGetApplicationsByClubQuery,
} = applicationRequestsApiSlice;
