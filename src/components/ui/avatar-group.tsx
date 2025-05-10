import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils"; // Assuming you have a `cn` utility for conditional classNames

type User = {
  name: string;
  image?: string;
};

type AvatarGroupProps = {
  users: User[];
  max?: number; // Optional: max visible avatars
  size?: number; // Optional: size of the avatars
  padding?: number; // Optional: padding for "-ml-"
};

export const AvatarGroup = ({
  users,
  max = 3,
  size = 50,
  padding = 25,
}: AvatarGroupProps) => {
  const visibleUsers = users.slice(0, max);
  const extraCount = users.length - visibleUsers.length;

  return (
    <div className="flex items-center">
      {visibleUsers.map((user, index) => (
        <div
          key={user.name}
          className={cn("relative border-2 border-white rounded-full")}
          style={{
            marginLeft: index !== 0 ? `-${padding}px` : undefined,
          }}
        >
          <div className="absolute top-1/2 left-1/2 w-[110%] h-[110%] bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          <Avatar
            className="rounded-full"
            style={{
              width: `${size}px`,
              height: `${size}px`,
            }}
          >
            {user.image && <AvatarImage src={user.image} alt={user.name} />}
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
        </div>
      ))}
      {extraCount > 0 && (
        <div
          className="rounded-full bg-muted text-muted-foreground border-2 border-white flex items-center justify-center text-xs font-medium"
          style={{
            width: size * 0.75,
            height: size * 0.75,
            marginLeft: `-${padding}px`,
          }}
        >
          +{extraCount}
        </div>
      )}
    </div>
  );
};
