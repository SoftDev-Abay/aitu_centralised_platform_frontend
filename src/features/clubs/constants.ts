import { ClubMemberRole } from "./types";

export const clubMemberRoles = Object.values(ClubMemberRole);


export const clubMemberRolesOptions = clubMemberRoles.map((role) => ({
  value: role,
  label: role.replace(/_/g, " ").toLowerCase(),
}));
