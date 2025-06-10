import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import RadioGroupInput, { Option as RadioOption } from "../RadioGroupInput";
import CheckboxGroupInput, {
  Option as CheckboxOption,
} from "../CheckboxGroupInput";
import RatingStars from "../RatingStars";
import { Question } from "@/features/applications/store";
import { Card } from "@/components/ui/card";
import { useCreateApplicationRequestMutation } from "@/features/applications/applicationRequestsApiSlice";
import toast from "react-hot-toast";

export type Survey = {
  title: string;
  description: string;
  questions: Question[];
};

type DynamicSurveyFormProps = {
  survey: Survey;
  surveyId: string;
  initialResponses?: Record<string, any>;
  readonly?: boolean;
};

const DynamicSurveyForm: React.FC<DynamicSurveyFormProps> = ({
  survey,
  surveyId,
  initialResponses = {},
  readonly = false,
}) => {
  const [responses, setResponses] =
    useState<Record<string, any>>(initialResponses);
  const [createApplicationRequest, { isLoading }] =
    useCreateApplicationRequestMutation();

  const handleResponseChange = (questionId: string, value: any) => {
    setResponses((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleCheckboxChange = (
    questionId: string,
    option: string,
    checked: boolean
  ) => {
    const current = responses[questionId] || [];
    if (checked) {
      setResponses((prev) => ({ ...prev, [questionId]: [...current, option] }));
    } else {
      setResponses((prev) => ({
        ...prev,
        [questionId]: current.filter((v: string) => v !== option),
      }));
    }
  };

  const renderQuestion = (question: Question) => {
    const commonCard = (children: React.ReactNode) => (
      <Card key={question.id} className="mb-4 px-4">
        <label className="text-xl block  mb-1">{question.text}</label>
        {children}
      </Card>
    );

    switch (question.type) {
      case "text":
        return commonCard(
          <Input
            placeholder="Your answer"
            value={responses[question.id] || ""}
            onChange={(e) => handleResponseChange(question.id, e.target.value)}
            readOnly={readonly}
            className="text-lg"
          />
        );

      case "multipulechoice":
        const radioOptions: RadioOption[] =
          question.answers?.map((opt) => ({ label: opt, value: opt })) || [];
        return commonCard(
          <RadioGroupInput
            title={question.text}
            name={question.id}
            options={radioOptions}
            value={responses[question.id] || ""}
            onChange={(val) => handleResponseChange(question.id, val)}
            readOnly={readonly}
          />
        );

      case "checkbox":
        const checkboxOptions: CheckboxOption[] =
          question.answers?.map((opt) => ({ label: opt, value: opt })) || [];
        return commonCard(
          <CheckboxGroupInput
            title={question.text}
            name={question.id}
            options={checkboxOptions}
            value={responses[question.id] || []}
            onChange={(vals) => handleResponseChange(question.id, vals)}
            readOnly={readonly}
          />
        );

      case "stars":
        const currentRating =
          responses[question.id] ?? question.starRating ?? 0;
        return commonCard(
          <RatingStars
            value={currentRating}
            onChange={(val) => handleResponseChange(question.id, val)}
            max={10}
            size={22}
            readOnly={readonly}
          />
        );

      default:
        return commonCard(
          <Input
            placeholder="Your answer"
            value={responses[question.id] || ""}
            onChange={(e) => handleResponseChange(question.id, e.target.value)}
            readOnly={readonly}
          />
        );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      formId: surveyId,
      answerContent: JSON.stringify({
        surveyTitle: survey.title,
        surveyDescription: survey.description,
        responses,
      }),
      status: "IN_REVIEW" as const,
    };

    try {
      await createApplicationRequest(payload).unwrap();
      toast.success("Survey submitted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Error submitting survey.");
    }
  };

  return (
    <div className="py-4">
      <div className="mx-auto">
        <Card className="mb-4 space-y-2 py-6 px-4 border-t-12 border-t-brand-primary">
          <h1 className="text-3xl font-semibold">{survey.title}</h1>
          <p className="">{survey.description}</p>
        </Card>

        <form onSubmit={handleSubmit}>
          {survey.questions.map((q) => renderQuestion(q))}

          {!readonly && (
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit Survey"}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default DynamicSurveyForm;
