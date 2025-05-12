import { Card, CardContent } from "@/components/ui/card";

const ClubMemberCard = () => {
  return (
    <Card className="w-full rounded-none">
      <CardContent className="flex gap-6">
        <img
          src="/images/profile.jpg"
          alt=""
          className="w-[136px] h-[136px] rounded-full"
        />
        <div>
          <h2 className="text-[20px] font-semibold mb-1.5">Abay Abayev</h2>
          <p className="text-sm text-brand-gray-muted mb-4">President</p>
          <p className="text-sm text-brand-gray-steel mb-4">
            Department FK
          </p>
          <p className="text-sm text-brand-gray-muted  mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at
            erat id ligula efficitur facilisis. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Quisque at erat id ligula efficitur
            facilisis.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Quisque at erat id ligula efficitur facilisis... <strong className="font-medium">READ MORE</strong>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClubMemberCard;
