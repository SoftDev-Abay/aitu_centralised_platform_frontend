import { AvatarGroup } from "@/components/ui/avatar-group";
import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { PostDto } from "../types";
import { getFileDownloadUrl } from "@/lib/helpers";

const fallbackUsers = [
  {
    name: "Bob",
    image: "https://static-cse.canva.com/blob/1991552/1600w-B-cRyoh7b98.jpg",
  },
  {
    name: "Alice",
    image:
      "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg",
  },
  {
    name: "Eve",
    image: "/images/profile.jpg",
  },
  {
    name: "Frank",
    image: "/images/profile.jpg",
  },
];

const PostCard = ({ post }: { post: PostDto }) => {
  return (
    <Card className="shadow-none  rounded-lg mb-6 overflow-hidden bg-gray-100">
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-5">
          <img
            src="/images/profile.jpg"
            className="rounded-full w-12 h-12"
            alt="Author Avatar"
          />
          <div>
            <p className="text-sm text-gray-500">Author:</p>
            <p className="font-medium text-gray-700">User #{post.userId}</p>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-5 line-clamp-4">
          {post.description}
        </p>

        {post.images && post.images.length > 0 ? (
          <img
            src={getFileDownloadUrl(post.images[0])}
            className="w-full h-72 object-cover rounded-md mb-5"
            alt={post.title}
          />
        ) : null}
        

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <AvatarGroup users={fallbackUsers} max={4} size={32} padding={5} />
            <div>
              <p className="text-sm text-gray-500">
                Comments:{" "}
                <strong className="text-gray-900">{post.commentCount}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Heart className="text-gray-500" size={20} />
              <p className="text-sm text-gray-600">
                Likes:{" "}
                <strong className="text-gray-900">{post.likeCount}</strong>
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
