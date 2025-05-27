// SortableQuestion.tsx
import React from "react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import QuestionItem from "../QuestionItem";
import { Question } from "@/features/applications/store";

type SortableQuestionProps = {
  question: Question;
};

const SortableQuestion: React.FC<SortableQuestionProps> = ({ question }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: question.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <QuestionItem question={question} dragHandleProps={{ attributes, listeners }} />
    </div>
  );
};

export default SortableQuestion;
