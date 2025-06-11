export interface NotificationDto {
  id: string;
  type: string;
  text: string;
  eventId?: string;
  createdAt: string;
  read: boolean;
}

export interface PageNotificationDto {
  totalPages: number;
  totalElements: number;
  last: boolean;
  numberOfElements: number;
  first: boolean;
  size: number;
  content: NotificationDto[];
  number: number;
  empty: boolean;
}

export interface NotificationIdParam {
  id: string;
}
