import { ClubMemberRole } from "../clubs/types";

export type UserDto = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  securityKey: string;
  role: "ADMIN" | "USER";
};

export type UserVisitorDto = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  securityKey: string;
  role: "ADMIN" | "USER";
  clubs: {
    id: string;
    name: string;
    description: string;
    status: string;
    role: ClubMemberRole;
  }[];
};

export type GetUserByIdParams = { id: number };
export type GetUserByEmailParams = { email: string };
