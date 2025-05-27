// StarsEditor.tsx
import React from "react";
import SimpleSelect, { Option} from "@/components/form/SimpleSelect"
import {
  useSurveyStore,
  Question,
} from "../../../store";
import { Star as OutlinedStar } from "lucide-react";

type StarsEditorProps = {
  question: Question;
};

const StarsEditor: React.FC<StarsEditorProps> = ({ question }) => {
  const updateQuestion = useSurveyStore((state) => state.updateQuestion);
  const starRating = question.starRating || 5;

  const selectOptions: Option[] = Array.from({ length: 8 }, (_, index) => ({
    label: (index + 3).toString(),
    value: index + 3,
  }));

  const handleChange = (option: Option | null) => {
    if (option) {
      updateQuestion(question.id, { starRating: option.value });
    }
  };

  const stars = Array.from({ length: starRating }, (_, index) => (
    <OutlinedStar key={index} size={22} className="text-yellow-500" />
  ));

  return (
    <div>
      <div className="mb-3">
        <SimpleSelect
          options={selectOptions}
          value={selectOptions.find((opt) => opt.value === starRating) || null}
          onChange={handleChange}
          width="fit-content"
        />
      </div>
      <div className="flex justify-around mt-2">{stars}</div>
    </div>
  );
};

export default StarsEditor;
