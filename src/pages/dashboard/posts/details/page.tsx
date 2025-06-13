import { useParams } from "react-router-dom";
import { useSetNavbarTitle } from "@/components/layout/shared/navbar/use-set-navbar-title";
import Section from "@/components/ui/section";
import SmartBreadcrumbs from "@/components/ui/smart-bread-crumbs";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { LoaderIcon } from "lucide-react";
import CommentItem from "@/features/posts/components/CommentItem";
import { Separator } from "@/components/ui/separator";
import WriteComment from "@/features/posts/components/WriteComment";
import {
  useGetCommentsByPostIdQuery,
  useGetPostByIdQuery,
} from "@/features/posts/postsApiSlice";
import { getFileDownloadUrl } from "@/lib/helpers";
import { AvatarGroup } from "@/components/ui/avatar-group";
import { formatTime } from "@/lib/utils";
import HtmlRenderer from "@/components/shared/html-render";

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
    image: "/images/default_avatar.jpg",
  },
  {
    name: "Frank",
    image: "/images/default_avatar.jpg",
  },
];

const PostDetailsPage = () => {
  const { id } = useParams();
  const { data: post, isLoading: isPostLoading } = useGetPostByIdQuery({
    id: id!,
  });

  const { data: comments, isLoading: isCommentsLoading } =
    useGetCommentsByPostIdQuery(id!);

  useSetNavbarTitle("Posts");

  if (isPostLoading || isCommentsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Section
        variant="narrow"
        className="pt-[80px] pb-[76px] bg-brand-gray-bluish"
      >
        <SmartBreadcrumbs />
        <h1 className="text-[32px] max-w-[409px] font-bold mb-10 leading-12">
          {post?.title ?? "Loading..."}
        </h1>
        <div className="flex justify-between gap-20">
          <div className="flex items-center gap-3">
            <img
              src="/images/default_avatar.jpg"
              className="rounded-full w-12.5 h-12.5"
              alt="Author avatar"
            />
            <div>
              <p className="text-brand-gray-muted text-sm">Author:</p>
              <p className="font-semibold">User #{post?.userId ?? "..."}</p>
            </div>
          </div>
          <Button
            variant="dark"
            className="w-full max-w-[404px] rounded-none h-[60px] font-semibold"
          >
            Subscribe
          </Button>
        </div>
      </Section>

      <Section variant="narrow" className="pb-[76px] bg-white h-full flex-grow">
        <Carousel
          className="w-full mb-7.5 relative"
          style={{ transform: "translateY(-10px)" }}
        >
          <CarouselContent>
            {post?.images?.map((imageName) => (
              <CarouselItem
                className="h-[492px]"
                key={`carousel_item_${imageName}`}
              >
                <img
                  src={getFileDownloadUrl(imageName)}
                  alt="Post Image"
                  className="w-full"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="flex justify-between items-stretch mb-12.5">
          <div className="flex gap-3 items-center">
            <AvatarGroup users={fallbackUsers} max={4} size={32} padding={15} />
            <div>
              <p className=" font-semibold">512</p>
              <p className="leading-4 text-sm text-brand-gray-muted">
                Students read
              </p>
            </div>
          </div>
          <div className="flex gap-7">
            <div className="flex flex-col justify-end">
              <div className=" flex gap-2">
                <span className="text-brand-gray-muted">Published at:</span>
                <span className="font-medium">
                  {formatTime(post?.createdAt ?? "", false)}
                </span>
              </div>
            </div>
            <div className="flex flex-col justify-end">
              <div className=" flex gap-2">
                <span className="text-brand-gray-muted">Comments:</span>
                <span className="font-medium">{post?.commentCount}</span>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl mb-5 font-semibold">Description</h2>
        <div className="text-brand-gray-steel mb-10">
          {/* <div className="text-brand-gray-steel mb-10 whitespace-pre-line"> */}
          {post?.description ? (
            <HtmlRenderer className="content" unsafeHtml={post.description} />
          ) : (
            "No description provided."
          )}
        </div>

        <WriteComment postId={id!} />

        <h2 className="text-2xl mt-7.5 mb-7.5 font-semibold">Comments</h2>

        {/* List Comments */}
        {comments?.length ? (
          <div>
            {comments.map((comment, index) => (
              <>
                <CommentItem key={comment.id} comment={comment} />
                {index !== comments.length - 1 && (
                  <Separator className="my-7.5 opacity-60" />
                )}
              </>
            ))}
          </div>
        ) : (
          <p>No comments yet.</p>
        )}

        {/* <CommentItem /> */}
        {/* <CommentItem /> */}

        <Button className="gap-3 rounded-none mt-4.5">
          Load more
          <LoaderIcon />
        </Button>
      </Section>
    </>
  );
};

export default PostDetailsPage;
