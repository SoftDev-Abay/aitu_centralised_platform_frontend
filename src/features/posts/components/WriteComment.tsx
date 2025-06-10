import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizonal } from "lucide-react";
import { useState } from "react";
import { useAddCommentToPostMutation } from "@/features/posts/postsApiSlice";

const WriteComment = ({ postId }: { postId: string }) => {
  const [content, setContent] = useState("");
  const [addComment, { isLoading }] = useAddCommentToPostMutation();

  const handleSubmit = async () => {
    if (!content) return;

    try {
      await addComment({ content, postId }).unwrap();
      setContent(""); // Reset input after successful submission
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-[648px] w-full">
      <div className="px-5 py-4 border-b border-brand-gray-light font-medium">
        Write Comment
      </div>
      <div className="px-5.5 py-6">
        <p className="mb-1.5 text-sm">Comment</p>
        <Textarea
          placeholder="Write your comment here..."
          className="resize-none mb-6 rounded-none h-[128px]"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="flex justify-between ">
          <Button
            variant="outline"
            className="rounded-none h-[48px]"
            onClick={() => setContent("")}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            className="rounded-none h-[48px]"
            onClick={handleSubmit}
            disabled={isLoading || !content}
          >
            Submit Comment
            <SendHorizonal className="ml-2" size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WriteComment;
