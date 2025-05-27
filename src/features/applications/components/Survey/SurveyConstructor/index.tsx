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
import { format } from "date-fns";

type Props = {
  clubId: string;
};

export function formatTime(date: string) {
  return format(new Date(date), "yyyy-MM-dd HH:mm:ss");
}

const SurveyConstructor: React.FC<Props> = ({ clubId }) => {
  const questions = useSurveyStore((state) => state.questions);
  const addQuestion = useSurveyStore((state) => state.addQuestion);
  const [createApplicationForm, { isLoading: isSubmitting }] =
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
    <div>
      {/* Survey Title, Description & Deadline */}
      <Card className="mb-4 space-y-2 py-6 px-4">
        <Input
          placeholder="Survey title"
          value={surveyTitle}
          // underline
          onChange={(e) => setSurveyTitle(e.target.value)}
          style={{ fontSize: "32px", paddingLeft: "4px" }}
        />
        <Input
          placeholder="Survey description"
          value={surveyDescription}
          // underline
          onChange={(e) => setSurveyDescription(e.target.value)}
          style={{
            fontSize: "16px",
            paddingTop: "10px",
            paddingLeft: "4px",
            paddingBottom: "6px",
            marginBottom: "25px",
          }}
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
