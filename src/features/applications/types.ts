export type ClubApplicationRequestCreateDto = {
  formId: string;
  answerContent: string;
  status: "IN_REVIEW" | "ANSWERED";
};

export type ClubApplicationRequestResponseDto = {
  requestId: string;
  response: "ACCEPTED" | "REJECTED";
  responseMessage?: string;
};

export type ClubApplicationRequestDto = {
  id: string;
  createdBy: string;
  createdAt: string;
  clubId: string;
  formId: string;
  status: "IN_REVIEW" | "ANSWERED";
  response?: "ACCEPTED" | "REJECTED";
  responseMessage?: string;
  respondedDate?: string;
  answerContent: string;
};

export type ClubApplicationFormCreateDto = {
  clubId: string;
  deadline: string;
  templateContent: string;
};

export type ClubApplicationFormDto = {
  id: string;
  createdBy: string;
  createdAt: string;
  clubId: string;
  deadline: string;
  templateContent: string;
};

export type ApplicationsByFormParams = { formId: string };
export type ApplicationIdParam = { id: string };
export type ClubIdParam = { clubId: string };
