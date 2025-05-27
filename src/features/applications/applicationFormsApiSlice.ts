import { apiSlice } from "@/app/api/apiSlice";
import {
  ClubApplicationFormCreateDto,
  ClubApplicationFormDto,
  ApplicationIdParam,
  ClubIdParam,
} from "./types";

export const applicationFormsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createApplicationForm: builder.mutation<
      ClubApplicationFormDto,
      ClubApplicationFormCreateDto
    >({
      query: (body) => ({
        url: "/applications/form",
        method: "POST",
        body,
      }),
    }),

    getApplicationFormById: builder.query<
      ClubApplicationFormDto,
      ApplicationIdParam
    >({
      query: ({ id }) => ({
        url: `/applications/form/${id}`,
        method: "GET",
      }),
    }),

    getFormsByVisitor: builder.query<ClubApplicationFormDto[], void>({
      query: () => ({
        url: "/applications/form/visitor",
        method: "GET",
      }),
    }),

    getFormsByClub: builder.query<ClubApplicationFormDto[], ClubIdParam>({
      query: ({ clubId }) => ({
        url: `/applications/form/club/${clubId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateApplicationFormMutation,
  useGetApplicationFormByIdQuery,
  useGetFormsByVisitorQuery,
  useGetFormsByClubQuery,
} = applicationFormsApiSlice;
