// import { AvatarGroup } from "@/components/ui/avatar-group";
// import { Card, CardContent } from "@/components/ui/card";
// import { Heart } from "lucide-react";

// const users = [
//   {
//     name: "Bob",
//     image: "https://static-cse.canva.com/blob/1991552/1600w-B-cRyoh7b98.jpg",
//   },
//   {
//     name: "Alice",
//     image:
//       "https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg",
//   },
//   {
//     name: "Bob",
//     image: "https://static-cse.canva.com/blob/1991552/1600w-B-cRyoh7b98.jpg",
//   },
//   {
//     name: "Bob",
//     image: "https://static-cse.canva.com/blob/1991552/1600w-B-cRyoh7b98.jpg",
//   },
// ];

// const PostCard = () => {
//   return (
//     <Card className="rounded-none">
//       <CardContent>
//         <div className="flex gap-2 mb-7.5">
//           <img
//             src="/images/profile.jpg"
//             className="rounded-full w-[50px] h-[50px]"
//             alt=""
//           />
//           <div>
//             {/* <div className="flex flex-col"> */}
//             <p className="text-sm  mb-1">Author:</p>
//             <p className="font-medium text-brand-secondary">Abay Abayev</p>
//           </div>
//         </div>
//         <p className="text-sm text-brand-gray-steel mb-10">
//           Alpha Sigma Phi (AΣΦ) is a fraternity at Colorado State University
//           that provides its members with an enriching brotherhood experience
//           through academic betterment, philanthropic work, and close-knit
//           friendships between brothers.
//         </p>
//         <img src="/images/club.png" className="mb-5 w-full " alt="" />
//         <div className="flex justify-between items-stretch">
//           <AvatarGroup users={users} max={4} size={32} padding={15} />
//           <div>
//             <p className="font-semibold text-sm leading-4">512</p>
//             <p className="text-xs text-brand-gray-muted">Abay Abayev</p>
//           </div>
//           <div className="flex flex-col justify-end">
//             <p className="text-sm text-brand-gray-muted">
//               Comments: <strong className="text-brand-primary">154</strong>
//             </p>
//           </div>
//           <div className="flex flex-col justify-end">
//             <div className="flex gap-2.5 items-end">
//               <Heart className="text-brand-gray-muted" />
//               <p className="text-sm text-brand-gray-muted leading-5">
//                 Comments: <strong className="text-brand-primary">154</strong>
//               </p>
//             </div>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default PostCard;

import { AvatarGroup } from "@/components/ui/avatar-group";
import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { PostDto } from "../types";
import FetchedImg from "@/features/images/FetchedImg";

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
    <Card className="rounded-none">
      <CardContent>
        <div className="flex gap-2 mb-7.5">
          <img
            src="/images/profile.jpg"
            className="rounded-full w-[50px] h-[50px]"
            alt=""
          />
          <div>
            <p className="text-sm mb-1">Author:</p>
            <p className="font-medium text-brand-secondary">
              User #{post.userId}
            </p>
          </div>
        </div>

        <p className="text-sm text-brand-gray-steel mb-10 line-clamp-4">
          {post.description}
        </p>

        <FetchedImg imgId={post.imageId} className="mb-5 w-full" />
        {/* <img src="/images/club.png" className="mb-5 w-full" alt="Post" /> */}

        <div className="flex justify-between items-stretch">
          <AvatarGroup users={fallbackUsers} max={4} size={32} padding={15} />
          <div>
            <p className="font-semibold text-sm leading-4">{post.likeCount}</p>
            <p className="text-xs text-brand-gray-muted">Likes</p>
          </div>
          <div className="flex flex-col justify-end">
            <p className="text-sm text-brand-gray-muted">
              Comments: <strong className="text-brand-primary">154</strong>
            </p>
          </div>
          <div className="flex flex-col justify-end">
            <div className="flex gap-2.5 items-end">
              <Heart className="text-brand-gray-muted" />
              <p className="text-sm text-brand-gray-muted leading-5">
                Likes:{" "}
                <strong className="text-brand-primary">{post.likeCount}</strong>
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
