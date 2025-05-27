import React, { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import SimpleSelect, { Option } from "@/components/form/SimpleSelect";
import { useSurveyStore, Question, MultipuleAnswersT } from "../../../store";
import AnswerEditor from "../AnswerEditor";
import StarsEditor from "../StarsEditor";
import { Card } from "@/components/ui/card";
import { GripHorizontal, Trash2, Copy } from "lucide-react";
import IconPicker from "../IconPicker";

type DragHandleProps = {
  attributes?: any;
  listeners?: any;
};

type QuestionItemProps = {
  question: Question;
  dragHandleProps?: DragHandleProps;
};

const QuestionItem: React.FC<QuestionItemProps> = ({
  question,
  dragHandleProps,
}) => {
  const updateQuestion = useSurveyStore((state) => state.updateQuestion);
  const removeQuestion = useSurveyStore((state) => state.removeQuestion);
  const getQuestionCount = useSurveyStore((state) => state.getQuestionCount);
  const [collapsed, setCollapsed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateQuestion(question.id, { text: e.target.value });
  };

  const handleTypeChange = (option: Option | null) => {
    if (option) {
      updateQuestion(question.id, { type: option.value as MultipuleAnswersT });
    }
  };

  const questionTypeOptions: Option[] = [
    { label: "Multiple Choice", value: "multipulechoice" },
    { label: "Stars", value: "stars" },
    { label: "Checkbox", value: "checkbox" },
    { label: "Text", value: "text" },
  ];

  const handleFocus = () => {
    setCollapsed(false);
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    // If the newly focused element is not inside our container, collapse the question.
    if (
      containerRef.current &&
      !containerRef.current.contains(e.relatedTarget as Node)
    ) {
      setCollapsed(true);
    }
  };

  const handleRemoveQuestion = () => {
    if (getQuestionCount() > 1) removeQuestion(question.id);
  };

  return (
    <Card className="px-4 pt-2 pb-4 my-2 relative">
      {/* Focusable container for the question content */}
      <div
        className="cursor-grab flex justify-center items-center mb-2"
        {...dragHandleProps?.attributes}
        {...dragHandleProps?.listeners}
      >
        <GripHorizontal size={22} />
      </div>
      <div
        ref={containerRef}
        tabIndex={0}
        onFocusCapture={handleFocus}
        onBlurCapture={handleBlur}
      >
        {/* Top Bar: Drag Handle */}
        <div className="flex gap-6 items-stretch">
          <Input
            placeholder="Enter your question"
            value={question.text}
            onChange={handleTextChange}
            className="flex-grow"
            // wrapperClassname="flex-grow"
          />
          <SimpleSelect
            icon={<IconPicker type={question.type as MultipuleAnswersT} />}
            options={questionTypeOptions}
            value={
              questionTypeOptions.find((opt) => opt.value === question.type) ||
              questionTypeOptions[0]
            }
            onChange={handleTypeChange}
            innerHeight="56px"
          />
        </div>
        {!collapsed && (
          <>
            <div className="mt-4 border-b pb-6 mb-4">
              {question.type === "multipulechoice" ||
              question.type === "checkbox" ? (
                <AnswerEditor question={question} />
              ) : question.type === "stars" ? (
                <StarsEditor question={question} />
              ) : question.type === "text" ? (
                <Input placeholder="Text answer" />
              ) : null}
            </div>

            <div className="flex justify-end gap-6 mb-2">
              <Copy size={22} className="cursor-pointer" />
              <Trash2
                size={22}
                onClick={handleRemoveQuestion}
                className="cursor-pointer"
              />
            </div>
          </>
        )}
      </div>
    </Card>
  );
};

export default QuestionItem;
