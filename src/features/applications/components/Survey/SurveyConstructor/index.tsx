import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSurveyStore } from "@/features/applications/store";
import SortableQuestion from "../SortableQuestion";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { useCreateApplicationFormMutation } from "@/features/applications/applicationFormsApiSlice";
import { formatTime } from "@/lib/utils";

type Props = {
  clubId: string;
};

const SurveyConstructor: React.FC<Props> = ({ clubId }) => {
  const questions = useSurveyStore((state) => state.questions);
  const addQuestion = useSurveyStore((state) => state.addQuestion);
  const [createApplicationForm, { isLoading: _ }] =
    useCreateApplicationFormMutation();

  // State for survey title, description and deadline.
  const [surveyTitle, setSurveyTitle] = useState("");
  const [surveyDescription, setSurveyDescription] = useState("");
  const [deadline, setDeadline] = useState<Date | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleSubmit = async () => {
    const payload = {
      clubId,
      deadline: formatTime(deadline ? deadline.toISOString() : ""),
      templateContent: JSON.stringify({
        title: surveyTitle,
        description: surveyDescription,
        questions: questions,
      }),
      isActive: true,
    };

    try {
      await createApplicationForm(payload).unwrap();
      toast.success("Survey submitted successfully!");
    } catch (err: any) {
      console.error(err);
      toast.error("Error submitting survey");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Survey Title, Description & Deadline */}
      <img
        src="/images/music_stage.webp"
        className="object-cover h-[350px] rounded-xl w-full mb-5"
      />
      <Card className="mb-4 space-y-2 py-6 px-4 border-t-12 border-t-brand-primary">
        <Input
          placeholder="Survey title"
          value={surveyTitle}
          // underline
          onChange={(e) => setSurveyTitle(e.target.value)}
          // style={{ fontSize: "32px", paddingLeft: "4px" }}
          className="text-4xl pr-4 py-5 h-16 border-t-0 border-l-0 border-r-0 rounded-none  shadow-none border-b-1"
        />
        <Input
          placeholder="Survey description"
          value={surveyDescription}
          onChange={(e) => setSurveyDescription(e.target.value)}
          className="text-base pl-3 pt-2 pb-1 pr-4 mb-6  border-t-0 border-l-0 border-r-0 rounded-none  shadow-none border-b-1"
        />
        <div className="flex  items-center gap-10">
          <label className="text-base-semibold block mb-1 font-semibold ml-1">
            Deadline:
          </label>
          <DatePicker
            selected={deadline}
            onChange={(date) => setDeadline(date)}
            placeholderText="Select deadline"
            showTimeSelect
            dateFormat="Pp"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>
      </Card>
      <div className="mb-4">
        <Button onClick={() => addQuestion()} color="success">
          Add New Question
        </Button>
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={({ active, over }) => {
          if (active.id !== over?.id) {
            const oldIndex = questions.findIndex((q) => q.id === active.id);
            const newIndex = questions.findIndex((q) => q.id === over?.id);
            useSurveyStore.getState().reorderQuestions(oldIndex, newIndex);
          }
        }}
      >
        <SortableContext
          items={questions.map((q) => q.id)}
          strategy={verticalListSortingStrategy}
        >
          {questions.map((question) => (
            <SortableQuestion key={question.id} question={question} />
          ))}
        </SortableContext>
      </DndContext>
      <div className="mt-4">
        <Button color="success" onClick={handleSubmit}>
          Submit Survey
        </Button>
      </div>
    </div>
  );
};

export default SurveyConstructor;
