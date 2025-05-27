// AnswerEditor.tsx
import React from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import SortableAnswer from "../SortableAnswer";
import { useSurveyStore, Question, MultipuleAnswersT } from "../../../store";
import IconPicker from "../IconPicker";

type AnswerEditorProps = {
  question: Question;
};

const AnswerEditor: React.FC<AnswerEditorProps> = ({ question }) => {
  const currentAnswers = question.answers || ["Option 1"];
  const updateAnswers = (newAnswers: string[]) => {
    useSurveyStore
      .getState()
      .updateQuestion(question.id, { answers: newAnswers });
  };

  const addAnswer = () => {
    updateAnswers([...currentAnswers, `Option ${currentAnswers.length + 1}`]);
  };

  const handleAnswerChange = (index: number, newValue: string) => {
    const mutated = currentAnswers.map((ans, i) =>
      i === index ? newValue : ans
    );
    updateAnswers(mutated);
  };

  const deleteAnswer = (index: number) => {
    if (currentAnswers.length > 1) {
      updateAnswers(currentAnswers.filter((_, i) => i !== index));
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={({ active, over }) => {
        if (active.id !== over?.id) {
          const oldIndex = currentAnswers.findIndex(
            (_, i) => i.toString() === active.id
          );
          const newIndex = currentAnswers.findIndex(
            (_, i) => i.toString() === over?.id
          );
          if (oldIndex !== -1 && newIndex !== -1) {
            updateAnswers(arrayMove(currentAnswers, oldIndex, newIndex));
          }
        }
      }}
    >
      <SortableContext
        items={currentAnswers.map((_, i) => i.toString())}
        strategy={verticalListSortingStrategy}
      >
        {currentAnswers.map((ans, index) => (
          <SortableAnswer
            key={index}
            id={index.toString()}
            answer={ans}
            questionType={question.type}
            onChange={(val) => handleAnswerChange(index, val)}
            onDelete={() => deleteAnswer(index)}
          />
        ))}
      </SortableContext>
      <div className="flex items-center gap-2 my-2">
        <span className="w-6 text-center">
          {/* <FaRegCircle size={22} /> */}
          <IconPicker type={question.type as MultipuleAnswersT} />
        </span>
        <button
          className="border border-dashed border-gray-400 rounded p-2 text-gray-600"
          onClick={addAnswer}
        >
          Add Option {currentAnswers.length + 1}
        </button>
      </div>
    </DndContext>
  );
};

export default AnswerEditor;
