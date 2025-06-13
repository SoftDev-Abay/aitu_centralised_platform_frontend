import { UserDto } from "@/features/users/types";

export enum EventType {
  // UNI_EVENT, CLUB_EVENT, USER_EVENT
  UNI_EVENT = "UNI_EVENT",
  CLUB_EVENT = "CLUB_EVENT",
  USER_EVENT = "USER_EVENT",
}
export enum MoodleModule {
  ATTENDANCE = "ATTENDANCE",
  ASSIGN = "ASSIGN",
  QUIZ = "QUIZ",
  OTHER = "OTHER",
}

// Add new enum for sort direction
export enum SortDirection {
  ASC = "ASC",
  DESC = "DESC",
}

// Add new enum for sortable fields
export enum SortableField {
  CREATED_AT = "createdAt",
  START_DATE = "startDate",
  SUBSCRIBER_COUNT = "subscriberCount",
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

// Add new parameters to ParamsPaginatedEventsDto
export type ParamsPaginatedEventsDto = {
  size: number;
  page: number;
  type?: EventType;
  category?: string; // Added
  search?: string; // Added
  sortBy?: string; // Added
  sortDir?: string; // Added
};

export type CalendarEventDto = {
  id: string;
  name: string;
  description: string;
  startDate: string; // ISO datetime
  endDate: string; // ISO datetime
  fromMoodle: boolean;
  moodleModule: MoodleModule;
  eventType: EventType;
  courseName: string;
};

export type CalendarDayDto = {
  date: string; // “2025-06-01”
  day: number;
  month: number;
  year: number;
  dayOfWeek: string;
  events: CalendarEventDto[];
};

export type EventIdParam = {
  id: string;
};
