export enum ClubApplicationStatus {
  IN_REVIEW = "IN_REVIEW",
  ANSWERED = "ANSWERED",
}
export enum ClubApplicationResponseStatus {
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}

export type ClubApplicationRequestCreateDto = {
  formId: string;
  answerContent: string;
  status: ClubApplicationStatus;
};

export type ClubApplicationRequestResponseDto = {
  requestId: string;
  response: ClubApplicationResponseStatus;
  responseMessage?: string;
};

export type ClubApplicationRequestDto = {
  id: string;
  createdBy: string;
  createdAt: string;
  clubId: string;
  formId: string;
  status: ClubApplicationStatus;
  response?: ClubApplicationResponseStatus;
  responseMessage?: string;
  respondedDate?: string;
  answerContent: string;
};

export type PaginatedClubApplicationRequestsDto = {
  count: number;
  data: ClubApplicationRequestDto[];
};

export type ClubApplicationFormCreateDto = {
  clubId: string;
  deadline: string;
  templateContent: string;
  isActive: boolean;
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
