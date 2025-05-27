import { Square, Circle, AlignLeft, Star, Type } from "lucide-react";

import { MultipuleAnswersT } from "@/features/applications/store";

const IconPicker = ({ type }: { type: MultipuleAnswersT }) => {
  switch (type) {
    case "checkbox":
      return <Square size={22} />;
    case "multipulechoice":
      return <Circle size={22} />;
    case "text":
      return <AlignLeft size={22} />;
    case "stars":
      return <Star size={22} />;
    default:
      return <Type size={22} />;
  }
};

export default IconPicker;
