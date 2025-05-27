export type ClubDto = {
  id: string;
  name: string;
  description: string;
  status: string;
  admins: UserDto[];
  members: UserDto[];
  forms: ClubApplicationFormDto[];
  imageIds?: string[];
};

export type ClubApplicationFormDto = {
  id: string;
  createdBy: string;
  createdAt: string;
  clubId: string;
  deadline: string;
  templateContent: string;
};

export type UserDto = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  securityKey: string;
  role: "ADMIN" | "USER";
};

export type CreateOrUpdateClubInput = Omit<
  ClubDto,
  "id" | "admins" | "members" | "forms"
>;

export type ClubIdParam = { id: string };
export type ClubAdminOrMemberParam = {
  clubId: string;
  adminId?: number;
  memberId?: number;
};
