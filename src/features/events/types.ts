import { UserDto } from "@/features/users/types";

export enum EventType {
  // UNI_EVENT, CLUB_EVENT, USER_EVENT
  UNI_EVENT = "UNI_EVENT",
  CLUB_EVENT = "CLUB_EVENT",
  USER_EVENT = "USER_EVENT",
}

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
  subscribed: boolean;
  clubId?: string;
  eventType: EventType;
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
  imageIds?: string[];
  eventType: EventType;
};

export type PaginatedEventsDto = {
  data: EventDto[];
  count: number;
};

export type ParamsPaginatedEventsDto = {
  size: number;
  page: number;
  type?: EventType;
};

// type event = {
//   name: "Consert from Musci Club";
//   address: "Expo C1 ";
//   format: "ONLINE";
//   startDate: "2025-06-02T15:49";
//   endDate: "2025-06-26T15:49";
//   description: "Music club provided us with a spectacle, showcasing music styles of variaety. ";
//   imageIds: ["2c490a95-e33e-4bde-bd44-dbd2d387fb84.png"];

//   name: "Мастер-класс по Python";
//   description: "string";
//   format: "OFFLINE";
//   address: "ул. Университетская, 15";
//   startDate: "2025-06-02T10:47:04.276Z";
//   endDate: "2025-06-02T10:47:04.276Z";
//   clubId: "3fa85f64-5717-4562-b3fc-2c963f66afa6";
//   adminIds: [0];
//   participantIds: [0];
//   imageIds: ["string"];
// };

export type EventIdParam = {
  id: string;
};
