import Section from "@/components/ui/section";
import SurveyConstructor from "@/features/applications/components/Survey/SurveyConstructor";
import React from "react";
import { useNavigate } from "react-router-dom";

const SurveyCreatePage = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const clubId = searchParams.get("clubId");
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!clubId) {
      navigate("/error?code=404&message=NotFound&redirect=/public/post", {
        replace: true,
      });
    }
  }, [clubId, navigate]);

  if (!clubId) {
    return null; // or a loading spinner
  }

  return (
    <Section
      variant="wide"
      className="pt-[80px] pb-[37px] bg-brand-gray-bluish h-full flex-grow"
    >
      <SurveyConstructor clubId={clubId} />
    </Section>
  );
};

export default SurveyCreatePage;
