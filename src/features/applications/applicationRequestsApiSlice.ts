import { apiSlice } from "@/app/api/apiSlice";
import {
  ClubApplicationRequestDto,
  ClubApplicationRequestCreateDto,
  ClubApplicationRequestResponseDto,
  ApplicationsByFormParams,
  ApplicationIdParam,
} from "./types";

export const applicationRequestsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createApplicationRequest: builder.mutation<
      ClubApplicationRequestDto,
      ClubApplicationRequestCreateDto
    >({
      query: (body) => ({
        url: "/applications/request",
        method: "POST",
        body,
      }),
    }),

    respondToApplication: builder.mutation<
      ClubApplicationRequestDto,
      ClubApplicationRequestResponseDto
    >({
      query: (body) => ({
        url: "/applications/request/response",
        method: "POST",
        body,
      }),
    }),

    getApplicationsByVisitor: builder.query<ClubApplicationRequestDto[], void>({
      query: () => ({
        url: "/applications/request/visitor",
        method: "GET",
      }),
    }),

    getApplicationsByForm: builder.query<
      ClubApplicationRequestDto[],
      ApplicationsByFormParams
    >({
      query: ({ formId }) => ({
        url: `/applications/requests/${formId}`,
        method: "GET",
      }),
    }),

    getApplicationById: builder.query<
      ClubApplicationRequestDto,
      ApplicationIdParam
    >({
      query: ({ id }) => ({
        url: `/applications/request/${id}`,
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
} = applicationRequestsApiSlice;
