import { apiSlice } from "@/app/api/apiSlice";
import {
  ClubDto,
  CreateOrUpdateClubInput,
  ClubAdminOrMemberParam,
  ClubIdParam,
  UserDto,
} from "./types";

export const clubsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getClubs: builder.query<ClubDto[], void>({
      query: () => ({
        url: "/clubs",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "Club", id: "LIST" },
              ...result.map((club) => ({ type: "Club" as const, id: club.id })),
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

    getClubMembers: builder.query<UserDto[], { clubId: string }>({
      query: ({ clubId }) => ({
        url: `/clubs/${clubId}/members`,
        method: "GET",
      }),
    }),

    getClubAdmins: builder.query<UserDto[], { clubId: string }>({
      query: ({ clubId }) => ({
        url: `/clubs/${clubId}/admins`,
        method: "GET",
      }),
    }),

    addClubAdmin: builder.mutation<ClubDto, ClubAdminOrMemberParam>({
      query: ({ clubId, adminId }) => ({
        url: `/clubs/${clubId}/admins/${adminId}`,
        method: "POST",
      }),
      invalidatesTags: (_res, _err, { clubId }) => [
        { type: "Club", id: clubId },
      ],
    }),

    removeClubAdmin: builder.mutation<ClubDto, ClubAdminOrMemberParam>({
      query: ({ clubId, adminId }) => ({
        url: `/clubs/${clubId}/admins/${adminId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_res, _err, { clubId }) => [
        { type: "Club", id: clubId },
      ],
    }),

    addClubMember: builder.mutation<ClubDto, ClubAdminOrMemberParam>({
      query: ({ clubId, memberId }) => ({
        url: `/clubs/${clubId}/members/${memberId}`,
        method: "POST",
      }),
      invalidatesTags: (_res, _err, { clubId }) => [
        { type: "Club", id: clubId },
      ],
    }),

    removeClubMember: builder.mutation<ClubDto, ClubAdminOrMemberParam>({
      query: ({ clubId, memberId }) => ({
        url: `/clubs/${clubId}/members/${memberId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_res, _err, { clubId }) => [
        { type: "Club", id: clubId },
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
  useGetClubAdminsQuery,
  useAddClubAdminMutation,
  useRemoveClubAdminMutation,
  useAddClubMemberMutation,
  useRemoveClubMemberMutation,
} = clubsApiSlice;
