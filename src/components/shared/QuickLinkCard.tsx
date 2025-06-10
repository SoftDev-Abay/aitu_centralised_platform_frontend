import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface QuickLinkCardProps {
  icon: React.ReactNode;
  iconBg?: string;
  title: string;
  subtitle?: string;
  url: string;
  className?: string;
}

const QuickLinkCard = ({
  icon,
  iconBg = "bg-gray-200",
  title,
  subtitle,
  url,
  className,
}: QuickLinkCardProps) => (
  <Link
    className={cn(className, "bg-white p-6 flex gap-6 items-center")}
    to={url}
  >
    <div className={`py-4.5 px-4.5 flex items-center rounded-md ${iconBg}`}>
      {icon}
    </div>
    <div className="flex flex-col gap-1.5">
      <h2 className="text-2xl leading-7">{title}</h2>
      {subtitle && <p className="text-brand-gray-steel text-sm">{subtitle}</p>}
    </div>
  </Link>
);

export default QuickLinkCard;
