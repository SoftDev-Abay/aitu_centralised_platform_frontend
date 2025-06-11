import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetNotificationsQuery } from "../notificationsApiSlice";
import { Skeleton } from "@/components/ui/skeleton";
import NotificationItem from "./NotificationItem";

const NotificationsCard = () => {
  const { data, isLoading } = useGetNotificationsQuery({
    page: 0,
    size: 5,
    unreadOnly: false,
  });

  return (
    <Card className="border-0 shadow-none bg-white rounded-none col-span-2 py-0 gap-0">
      <CardHeader className="flex justify-between items-center px-5 py-4">
        <p className="font-medium">Notifications</p>
        <Select>
          <SelectTrigger size="sm" className="border-0 shadow-none text-sm text-brand-gray-muted">
            <SelectValue placeholder="Select time" />
          </SelectTrigger>
          <SelectContent defaultValue={"today"}>
            <SelectGroup>
              <SelectLabel>Time</SelectLabel>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="year">Year</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </CardHeader>
      <Separator />
      <CardContent className="px-5 flex flex-col gap-4">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))
          : data?.data.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
            ))}
      </CardContent>
    </Card>
  );
};

export default NotificationsCard;
