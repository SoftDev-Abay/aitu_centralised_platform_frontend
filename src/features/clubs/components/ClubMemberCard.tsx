import { Card, CardContent } from "@/components/ui/card";
import { UserDto } from "../types";

interface ClubMemberCardProps {
  user: Omit<UserDto, "securityKey">; // Exclude id since it's not used in the card
}

const ClubMemberCard = ({ user }: ClubMemberCardProps) => {
  return (
    <Card className="w-full rounded-none">
      <CardContent className="flex gap-6">
        <img
          src="/images/profile.jpg"
          alt={`${user.firstName} ${user.lastName}`}
          className="w-[136px] h-[136px] rounded-full"
        />
        <div>
          <h2 className="text-[20px] font-semibold mb-1.5">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-sm text-brand-gray-muted mb-4">
            {/* No role in API, fallback value */}
            Member
          </p>
          <p className="text-sm text-brand-gray-steel mb-4">
            Department {user.department}
          </p>
          <p className="text-sm text-brand-gray-muted mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit...{" "}
            <strong className="font-medium">READ MORE</strong>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClubMemberCard;
