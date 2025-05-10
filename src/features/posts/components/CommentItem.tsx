import React from "react";

const CommentItem = () => {
  return (
    <div className="flex gap-4">
      <img
        src="/images/profile.jpg"
        className="rounded-full w-10 h-10"
        alt=""
      />
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm font-semibold">Guy Hawkings</span>
          <div className="rounded-full w-1 h-1 bg-brand-gray-dark" />
          <span className="text-brand-gray-muted text-xs">1 week ago</span>
        </div>
        <p className="text-sm text-brand-gray-steel">
          I appreciate the precise short videos (10 mins or less each) because
          overly long videos tend to make me lose focus. The instructor is very
          knowledgeable in Web Design and it shows as he shares his knowledge.
          These were my best 6 months of training. Thanks, Vako.
        </p>
      </div>
    </div>
  );
};

export default CommentItem;
