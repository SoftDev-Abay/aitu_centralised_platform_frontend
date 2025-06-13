export enum ClubMemberRole {
  MEMBER = "MEMBER",
  VICE_PRESIDENT = "VICE_PRESIDENT",
  PRESIDENT = "PRESIDENT",
}

export type ClubDto = {
  id: string;
  name: string;
  description: string;
  status: string;
  forms: ClubApplicationFormDto[];
  images?: string[];
  activeFormId: number;
  members: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    department: string;
    role: ClubMemberRole;
  }[];
};
export type CreateClubDto = {
  id: string;
  name: string;
  description: string;
  status: string;
  forms: ClubApplicationFormDto[];
  images?: string[];
  presidentId: number;
};

export type PaginatedClubs = {
  count: number;
  data: ClubDto[];
};

export type ClubApplicationFormDto = {
  id: string;
  createdBy: string;
  createdAt: string;
  clubId: string;
  deadline: string;
  templateContent: string;
  active: boolean;
};

export type UserDto = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  securityKey: string;
  role: ClubMemberRole;
};

export type ClubMemberDto = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  role: ClubMemberRole;
};

export type MyClubDto = {
  id: string;
  name: string;
  description: string;
  status: string;
  role: ClubMemberRole;
};

export type CreateOrUpdateClubInput = Omit<
  CreateClubDto,
  "id" | "admins" | "members" | "forms"
>;

export type ClubIdParam = { id: string };
export type ClubAdminOrMemberInput = {
  clubId: string;
  userId: string;
  role: ClubMemberRole;
};
