import {
  useGetNotificationsQuery,
  useMarkNotificationAsReadMutation,
} from "@/features/notifications/notificationsApiSlice";
import { MessageCircle } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { NotificationDto } from "../types";

const NotificationItem = ({
  notification,
}: {
  notification: NotificationDto;
}) => {
  const [markAsRead] = useMarkNotificationAsReadMutation();

  return (
    <div className="flex gap-3 py-3">
      <div className="h-8 w-8 rounded-full shrink-0 bg-brand-primary flex justify-center items-center">
        <MessageCircle size={16} className="text-white" />
      </div>
      <div>
        <p className="mb-1.5 leading-5">{notification.text}</p>
        <span className="text-xs text-brand-gray-medium">
          {new Date(notification.createdAt).toLocaleString()}
        </span>
        {!notification.read && (
          <button
            onClick={() => markAsRead({ id: notification.id })}
            className="text-xs text-blue-500 ml-2 underline"
          >
            Mark as read
          </button>
        )}
      </div>
    </div>
  );
};

export default NotificationItem;
