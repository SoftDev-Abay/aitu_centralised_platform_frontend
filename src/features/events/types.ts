import { UserDto } from "@/features/users/types";

export type EventDto = {
  id: string;
  name: string;
  description?: string;
  format: "ONLINE" | "OFFLINE";
  address: string;
  startDate: string;
  endDate: string;
  participants: UserDto[];
  admins: UserDto[];
  imageIds: string[];
};

export type EventCreateDto = {
  name: string;
  description?: string;
  format: "ONLINE" | "OFFLINE";
  address: string;
  startDate: string;
  endDate: string;
  participantIds?: number[];
  adminIds?: number[];
  imageId?: string;
};

export type EventIdParam = {
  id: string;
};
