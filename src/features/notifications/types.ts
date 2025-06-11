export interface NotificationDto {
  id: string;
  type: string;
  text: string;
  eventId?: string;
  createdAt: string;
  read: boolean;
}

export type PaginatedNotifications = {
  count: number;
  data: NotificationDto[];
};

export interface NotificationIdParam {
  id: string;
}
