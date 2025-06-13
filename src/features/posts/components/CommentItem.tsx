import { cn, formatTime } from "@/lib/utils";
import { CommentDto } from "../types";

const CommentItem = ({
  comment,
  className,
}: {
  comment: CommentDto;
  className?: string;
}) => {
  return (
    <div className={cn("flex gap-4 mb-6", className)}>
      <img
        src="/images/default_avatar.jpg"
        className="rounded-full w-10 h-10"
        alt="User Avatar"
      />
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm font-semibold">User #{comment.userId}</span>
          <div className="rounded-full w-1 h-1 bg-brand-gray-dark" />
          <span className="text-brand-gray-muted text-xs">
            {formatTime(comment.createdAt, false)}
          </span>
        </div>
        <p className="text-sm text-brand-gray-steel">{comment.content}</p>
      </div>
    </div>
  );
};

export default CommentItem;
