// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { Book, Instagram, Mail, Notebook, Timer, Twitter } from "lucide-react";
// import { cn } from "@/lib/utils"; // Assuming you have a `cn` utility for class merging

// const DetailsCard = ({
//   className,
//   headerClassName,
//   contentClassName,
// }: {
//   className?: string;
//   headerClassName?: string;
//   contentClassName?: string;
// }) => {
//   return (
//     <Card className={cn("bg-white pt-0 w-full rounded-none", className)}>
//       <CardHeader
//         className={cn(
//           "pt-6 pb-[23px] border-b border-b-brand-gray-light-muted",
//           headerClassName
//         )}
//       >
//         <h2 className="text-center text-2xl font-semibold">Event</h2>
//       </CardHeader>
//       <CardContent className={cn(contentClassName)}>
//         <div className="flex flex-col gap-4 mb-[27px]">
//           <div className="w-full flex gap-2">
//             <Timer />
//             <div className="flex-1 pt-0.5 flex flex-col gap-0.5">
//               <div className="flex justify-between text-sm">
//                 <span>Start Date</span>
//                 <span className="text-brand-gray-muted">09:00 - 21.06.25</span>
//               </div>
//               <div className="flex justify-between text-sm">
//                 <span>End Date</span>
//                 <span className="text-brand-gray-muted">09:00 - 21.06.25</span>
//               </div>
//             </div>
//           </div>

//           <div className="w-full flex gap-2 items-center">
//             <Book />
//             <div className="flex-1 flex justify-between text-sm">
//               <span>Format</span>
//               <span className="text-brand-gray-muted">Online</span>
//             </div>
//           </div>
//           <div className="w-full flex gap-2 items-center">
//             <Notebook />
//             <div className="flex-1 flex justify-between text-sm">
//               <span>Address</span>
//               <span className="text-brand-gray-muted">Astana</span>
//             </div>
//           </div>
//         </div>
//         <p className="font-medium mb-4.5">Share this event:</p>

//         <div className="flex gap-2">
//           <div className="p-3.5 bg-brand-gray-light">
//             <Twitter className="text-brand-gray-muted" size={20} />
//           </div>
//           <div className="p-3.5 bg-brand-gray-light">
//             <Mail className="text-brand-gray-muted" size={20} />
//           </div>
//           <div className="p-3.5 bg-brand-gray-light">
//             <Instagram className="text-brand-gray-muted" size={20} />
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default DetailsCard;

// src/features/events/components/DetailsCard.tsx

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Book, Instagram, Mail, Notebook, Timer, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";

interface DetailsCardProps {
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  startDate: string;
  endDate: string;
  format: string;
  address: string;
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const datePart = date.toLocaleDateString("en-GB");
  return `${time} - ${datePart}`;
};

const DetailsCard = ({
  className,
  headerClassName,
  contentClassName,
  startDate,
  endDate,
  format,
  address,
}: DetailsCardProps) => {
  return (
    <Card className={cn("bg-white pt-0 w-full rounded-none", className)}>
      <CardHeader
        className={cn(
          "pt-6 pb-[23px] border-b border-b-brand-gray-light-muted",
          headerClassName
        )}
      >
        <h2 className="text-center text-2xl font-semibold">Event</h2>
      </CardHeader>
      <CardContent className={cn(contentClassName)}>
        <div className="flex flex-col gap-4 mb-[27px]">
          <div className="w-full flex gap-2">
            <Timer />
            <div className="flex-1 pt-0.5 flex flex-col gap-0.5">
              <div className="flex justify-between text-sm">
                <span>Start Date</span>
                <span className="text-brand-gray-muted">
                  {formatDate(startDate)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>End Date</span>
                <span className="text-brand-gray-muted">
                  {formatDate(endDate)}
                </span>
              </div>
            </div>
          </div>

          <div className="w-full flex gap-2 items-center">
            <Book />
            <div className="flex-1 flex justify-between text-sm">
              <span>Format</span>
              <span className="text-brand-gray-muted capitalize">
                {format.toLowerCase()}
              </span>
            </div>
          </div>

          <div className="w-full flex gap-2 items-center">
            <Notebook />
            <div className="flex-1 flex justify-between text-sm">
              <span>Address</span>
              <span className="text-brand-gray-muted">{address}</span>
            </div>
          </div>
        </div>

        <p className="font-medium mb-4.5">Share this event:</p>
        <div className="flex gap-2">
          <div className="p-3.5 bg-brand-gray-light">
            <Twitter className="text-brand-gray-muted" size={20} />
          </div>
          <div className="p-3.5 bg-brand-gray-light">
            <Mail className="text-brand-gray-muted" size={20} />
          </div>
          <div className="p-3.5 bg-brand-gray-light">
            <Instagram className="text-brand-gray-muted" size={20} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DetailsCard;
