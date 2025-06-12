import { useParams, useSearchParams } from "react-router-dom";

import { useGetApplicationFormByIdQuery } from "@/features/applications/applicationFormsApiSlice";
import DynamicSurveyForm, {
  Survey,
} from "@/features/applications/components/Survey/DynamicSurveyForm";
import Section from "@/components/ui/section";
import { useGetApplicationByIdQuery } from "@/features/applications/applicationRequestsApiSlice";

const ViewSurveyResponcePage = () => {
  const { id: responceId } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const surveyIdParam = searchParams.get("surveyId");

  const {
    data: surveyData,
    isLoading: isSurveyDataLoading,
    isError: isSurveyDataError,
  } = useGetApplicationFormByIdQuery({ id: surveyIdParam as string });

  const { data: responceData, isLoading: isResponceDataLoading } =
    // const { data: responceData, isLoading: isResponceDataLoading, isError:isResponceDataError } =
    useGetApplicationByIdQuery(
      { id: responceId as string },
      { skip: !surveyIdParam }
    );

  let surveyDataInternal: Survey | null = null;
  let surveyResponceInternal: any | null = null;

  if (surveyData?.templateContent) {
    const parsed =
      typeof surveyData.templateContent === "string"
        ? JSON.parse(surveyData.templateContent)
        : surveyData.templateContent;

    surveyDataInternal = {
      title: parsed.title,
      description: parsed.description,
      questions: parsed.questions,
    };
  }
  if (responceData?.answerContent) {
    const parsed =
      typeof responceData.answerContent === "string"
        ? JSON.parse(responceData.answerContent)
        : responceData.answerContent;

    surveyResponceInternal = {
      surveyTitle: parsed.title,
      surveyDescription: parsed.description,
      responses: parsed.responses,
    };
  }

  console.log("Survey Data:", surveyData);
  console.log("Survey Data Response:", surveyData);
  console.log("Is Survey Data Loading:", isSurveyDataLoading);
  console.log("Is Survey Data Error:", isSurveyDataError);
  if (responceData && responceData.answerContent) {
    console.log("responceData:", JSON.parse(responceData.answerContent));
  }

  return (
    <Section
      variant="wide"
      className="pt-[80px] pb-[37px] bg-brand-gray-bluish h-full flex-grow"
    >
      <img
        src="/images/music_stage.webp"
        className="object-cover h-[350px] rounded-xl w-full mb-5"
      />
      {isResponceDataLoading ? (
        <div>Loading survey...</div>
      ) : isSurveyDataError || !surveyData ? (
        <div>Error loading survey</div>
      ) : (
        surveyDataInternal && (
          <DynamicSurveyForm
            survey={surveyDataInternal}
            surveyId={String(surveyIdParam)}
            initialResponses={surveyResponceInternal.responses}
            readonly
          />
        )
      )}
    </Section>
  );
};

export default ViewSurveyResponcePage;
