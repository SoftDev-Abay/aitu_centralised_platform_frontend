import { ClubMemberRole } from "./types";

export const clubMemberRoles: ClubMemberRole[] = [
  ClubMemberRole.MEMBER,
  ClubMemberRole.VICE_PRESIDENT,
  ClubMemberRole.PRESIDENT,
];

export const clubMemberRolesOptions = clubMemberRoles.map((role) => ({
  value: role,
  label: role.replace(/_/g, " ").toLowerCase(),
}));
