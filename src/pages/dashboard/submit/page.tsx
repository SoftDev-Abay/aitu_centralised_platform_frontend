import React from "react";
import { useParams } from "react-router-dom";

import { useGetApplicationFormByIdQuery } from "@/features/applications/applicationFormsApiSlice";
import DynamicSurveyForm, {
  Survey,
} from "@/features/applications/components/Survey/DynamicSurveyForm";
import Section from "@/components/ui/section";

const Page = () => {
  const { slug } = useParams(); // slug = surveyId
  const surveyId = slug;

  const { data, isLoading, isError } = useGetApplicationFormByIdQuery(
    { id: surveyId as string },
    { skip: !surveyId }
  );

  let surveyData: Survey | null = null;

  if (data?.templateContent) {
    const parsed =
      typeof data.templateContent === "string"
        ? JSON.parse(data.templateContent)
        : data.templateContent;

    surveyData = {
      title: parsed.title,
      description: parsed.description,
      questions: parsed.questions,
    };
  }

  return (
    <Section
      variant="wide"
      className="pt-[80px] pb-[37px] bg-brand-gray-bluish h-full flex-grow"
    >
      {isLoading ? (
        <div>Loading survey...</div>
      ) : isError || !surveyData ? (
        <div>Error loading survey</div>
      ) : (
        <DynamicSurveyForm survey={surveyData} surveyId={String(surveyId)} />
      )}
    </Section>
  );
};

export default Page;
