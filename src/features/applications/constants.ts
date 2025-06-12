import { ClubApplicationResponseStatus, ClubApplicationStatus } from "./types";

export const clubApplicationStatuses = Object.values(ClubApplicationStatus);
export const clubApplicationResponseStatuses = Object.values(
  ClubApplicationResponseStatus
);

export const clubApplicationStatusesOptions = clubApplicationStatuses.map(
  (status) => ({
    value: status,
    label: status.replace(/_/g, " ").toLowerCase(),
  })
);
export const clubApplicationResponseStatusesOptions =
  clubApplicationResponseStatuses.map((status) => ({
    value: status,
    label: status.replace(/_/g, " ").toLowerCase(),
  }));
