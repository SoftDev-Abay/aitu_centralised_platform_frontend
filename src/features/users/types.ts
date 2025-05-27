export type UserDto = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  securityKey: string;
  role: "ADMIN" | "USER";
};

export type UsersClubDto = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  securityKey: string;
  role: string;
  clubs: {
    id: string;
    name: string;
    description: string;
    status: string;
    role: "ADMIN" | "USER";
  }[];
};

export type ClubMembershipDto = {
  id: string;
  name: string;
  description: string;
  status: string;
  role: "ADMIN" | "USER";
};

export type GetUserByIdParams = { id: number };
export type GetUserByEmailParams = { email: string };
