import React from "react";

type ProfileCardProps = {
  person: {
    image: string;
    name: string;
    role: string;
  };
};

const ProfileCard: React.FC<ProfileCardProps> = ({ person }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <img
        src={person.image}
        alt={person.name}
        className="w-full h-[312px] object-cover"
      />
      <div className="pt-4 pb-5 border border-t-0 w-full">
        <div className="font-semibold">{person.name}</div>
        <div className="text-sm text-brand-gray-muted">{person.role}</div>
      </div>
    </div>
  );
};

export default ProfileCard;
