import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizonal } from "lucide-react";
import React from "react";

const WriteComment = () => {
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
        />
        <div className="flex justify-between ">
          <Button variant="outline" className=" rounded-none h-[48px]">
            Cancel
          </Button>

          <Button variant={"default"} className=" rounded-none h-[48px]">
            Submit Comment
            <SendHorizonal className="ml-2" size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WriteComment;
