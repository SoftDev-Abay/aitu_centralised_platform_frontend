import { Badge } from "@/components/ui/badge";

type StatusBadgeProps = {
  status: string;
};
type StatusMapItem = {
  name: string; // Assuming 'name' is not used, but kept for type consistency
  label: string;
  variant: "destructive" | "success" | "info" | "muted";
  status: "accepted" | "rejected" | "in_review" | "answered";
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const statusMap: StatusMapItem[] = [
    {
      name: "IN_REVIEW",
      label: "In review",
      variant: "muted", // IN_REVIEW
      status: "in_review",
    },
    {
      name: "ACCEPTED",
      label: "Accepted",
      variant: "success", // ACCEPTED
      status: "accepted",
    },
    {
      name: "REJECTED",
      label: "Rejected",
      variant: "destructive", // REJECTED
      status: "rejected",
    },
    {
      name: "ANSWERED",
      label: "Answered",
      variant: "info", // ANSWERED
      status: "answered",
    },
  ];

  const { label, variant } =
    statusMap.find((item) => item.name === status) || statusMap[0];

  return <Badge variant={variant}>{label}</Badge>;
};

export default StatusBadge;
