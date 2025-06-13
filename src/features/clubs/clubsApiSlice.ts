import { apiSlice } from "@/app/api/apiSlice";
import {
  ClubDto,
  CreateOrUpdateClubInput,
  ClubIdParam,
  PaginatedClubs,
  ClubAdminOrMemberInput,
  ClubMemberDto,
  MyClubDto,
} from "./types";

export const clubsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getClubs: builder.query<
      PaginatedClubs,
      { page?: number; pageSize?: number }
    >({
      query: ({ page = 0, pageSize = 10 }) => ({
        url: "/clubs",
        method: "GET",
        params: { page, pageSize },
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "Club", id: "LIST" },
              ...result.data.map((club) => ({
                type: "Club" as const,
                id: club.id,
              })),
            ]
          : [{ type: "Club", id: "LIST" }],
    }),
    getMyClubs: builder.query<MyClubDto[], { userId: number }>({
      query: ({ userId }) => ({
        url: `/clubs/by-user/${userId}`,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "Club", id: "LIST" },
              ...result.map((club) => ({
                type: "Club" as const,
                id: club.id,
              })),
            ]
          : [{ type: "Club", id: "LIST" }],
    }),

    getClubById: builder.query<ClubDto, ClubIdParam>({
      query: ({ id }) => ({
        url: `/clubs/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, { id }) => [{ type: "Club", id }],
    }),

    createClub: builder.mutation<ClubDto, CreateOrUpdateClubInput>({
      query: (body) => ({
        url: "/clubs",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Club", id: "LIST" }],
    }),

    deleteClub: builder.mutation<void, ClubIdParam>({
      query: ({ id }) => ({
        url: `/clubs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_res, _err, { id }) => [
        { type: "Club", id },
        { type: "Club", id: "LIST" },
      ],
    }),

    getClubMembers: builder.query<
      { data: ClubMemberDto[]; count: number },
      { clubId: string; page?: number; pageSize?: number }
    >({
      query: ({ clubId, page = 0, pageSize = 10 }) => ({
        url: `/clubs/${clubId}/members`,
        method: "GET",
        params: { page, pageSize },
      }),
      providesTags: (result, _error, { clubId }) =>
        result
          ? [
              { type: "Club", id: clubId },
              ...result.data.map((member) => ({
                type: "ClubMember" as const,
                id: member.id.toString(),
              })),
            ]
          : [{ type: "Club", id: clubId }],
      transformResponse: (response: {
        data: ClubMemberDto[];
        count: number;
      }) => ({
        data: response.data,
        count: response.count,
      }),
    }),
    // not on backend yet
    assignClubMember: builder.mutation<ClubDto, ClubAdminOrMemberInput>({
      query: ({ clubId, userId, role }) => ({
        url: `/clubs/${clubId}/roles/${userId}`,
        method: "POST",
        body: { role },
      }),
      invalidatesTags: (_result, _error, { clubId }) => [
        { type: "Club", id: clubId },
        { type: "ClubMember", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetClubsQuery,
  useGetClubByIdQuery,
  useCreateClubMutation,
  useDeleteClubMutation,
  useGetClubMembersQuery,
  useAssignClubMemberMutation,
  useGetMyClubsQuery
} = clubsApiSlice;
