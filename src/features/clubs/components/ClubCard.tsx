// import { User } from "lucide-react";
// import { Button } from "@/components/ui/button";
// const ClubCard = () => {
//   return (
//     <div className="w-full rounded-3xl">
//       <img src="/images/club.png" alt="" className="w-full h-57 rounded-t-lg" />
//       <div className="flex flex-col gap-5 px-[31px] py-[35px] bg-brand-gray-bluish rounded-lg shadow-sm">
//         <div className="flex justify-between items-center text-sm text-brand-gray-steel font-medium" >
//           <span>01.01.25</span>
//           <div className="flex gap-1 items-center">
//             <User size={20} className="text-brand-secondary"/>
//             <span className="text-gray-500">155</span>
//           </div>
//         </div>

//         <h2 className="text-xl font-semibold">Learn Python Programming Masterclass</h2>
//         <p className=" text-sm">The Python Mega Course: Build 10 Real World Applications</p>
//         <Button variant="dark" className="w-full max-w-[200px]"> Registration </Button>
//       </div>
//     </div>
//   );
// };

// export default ClubCard;

import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClubDto } from "../types";
import FetchedImg from "@/features/images/FetchedImg";
import { Link } from "react-router-dom";

interface ClubCardProps {
  club: ClubDto;
}

const ClubCard = ({ club }: ClubCardProps) => {
  return (
    <div className="w-full rounded-3xl">
      {club?.imageIds && club.imageIds.length > 0 && club.imageIds[0] ? (
        <FetchedImg
          imgId={club.imageIds[0]}
          className="w-full h-57 rounded-t-lg"
        />
      ) : (
        <img
          src="/images/club.png"
          alt="Default Club"
          className="w-full h-57 rounded-t-lg"
        />
      )}

      <div className="flex flex-col gap-5 px-[31px] py-[35px] bg-brand-gray-bluish rounded-lg shadow-sm">
        <div className="flex justify-between items-center text-sm text-brand-gray-steel font-medium">
          <span>
            {new Date(
              club.forms?.[0]?.createdAt || club.id
            ).toLocaleDateString()}
          </span>
          <div className="flex gap-1 items-center">
            <User size={20} className="text-brand-secondary" />
            <span className="text-gray-500">{club.members?.length ?? 0}</span>
          </div>
        </div>

        <h2 className="text-xl font-semibold truncate">{club.name}</h2>
        <p className="text-sm line-clamp-2">{club.description}</p>
        <Link to={`/survey/submit/${club.forms?.[0]?.id}`}>
          <Button variant="dark" className="w-full max-w-[200px]">
            Registration
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ClubCard;
