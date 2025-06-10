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
    }),

    getApplicationsByForm: builder.query<
      ClubApplicationRequestDto[],
      ApplicationsByFormParams
    >({
      query: ({ formId }) => ({
        url: `/clubs/applications/request/form/${formId}`,
        method: "GET",
      }),
    }),

    getApplicationById: builder.query<
      ClubApplicationRequestDto,
      ApplicationIdParam
    >({
      query: ({ id }) => ({
        url: `/clubs/applications/request/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateApplicationRequestMutation,
  useRespondToApplicationMutation,
  useGetApplicationsByVisitorQuery,
  useGetApplicationsByFormQuery,
  useGetApplicationByIdQuery,
  useGetApplicationsByClubQuery
} = applicationRequestsApiSlice;
