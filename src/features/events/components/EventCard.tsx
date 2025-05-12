import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Locate } from "lucide-react";

const EventCard = () => {
  return (
    <Card className="rounded-none p-0 gap-0">
      <img src="/images/club.png" className="h-[234px]" alt="" />
      {/* <CardContent className="px-0"></CardContent> */}
      <div className="px-4.5 py-4">
        <Badge className="rounded-none bg-brand-gray-bluish text-brand-primary mb-2 ">
          EVENT
        </Badge>
        <p className="font-medium">
          Premiere Pro CC for Beginners: Video Editing in Premiere
        </p>
      </div>
      <Separator />

      <div className="flex justify-between items-center px-4.5 py-4 ">
        <span>01.01.25</span>
        <div className="flex items-center gap-2">
          <Locate size={20} />
          <span className="text-sm">Astana City</span>
        </div>
      </div>
      <div className="flex justify-center font-semibold text-lg p-4 border-t text-brand-primary">
        Learn more
      </div>
    </Card>
  );
};

export default EventCard;
