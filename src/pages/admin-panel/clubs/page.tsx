import { Card, CardContent } from "@/components/ui/card";
import Section from "@/components/ui/section";
import { useGetClubsQuery } from "@/features/clubs/clubsApiSlice";
import { EyeIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const AdminClubListPage = () => {
  const { data: clubs, isLoading, isError } = useGetClubsQuery();

  return (
    <Section variant="wide" className="pt-10 pb-12 h-full flex-grow bg-brand-gray-bluish">
      <h1 className="text-3xl font-bold mb-6">ALl Clubs</h1>

      <div className="flex flex-col gap-3.5">
        {clubs?.map((club) => (
          <Card className="w-full ">
            <CardContent className="flex gap-3 justify-between ">
              <div className="flex gap-4 justify-between items-center">
                <div className="flex flex-col gap-2">
                  <span>Id</span>
                  <strong className="font-semibold">{club.id}</strong>
                </div>
                <div className="flex flex-col gap-2">
                  <span>name</span>
                  <strong className="font-semibold">{club.name}</strong>
                </div>

                <div className="flex flex-col gap-2">
                  <span>status</span>
                  <strong className="font-semibold">{club.status}</strong>
                </div>
                <div className="flex flex-col gap-2">
                  <span>admins count</span>
                  <strong className="font-semibold">
                    {club.admins.length}
                  </strong>
                </div>
                <div className="flex flex-col gap-2">
                  <span>members count</span>
                  <strong className="font-semibold">
                    {club.members.length}
                  </strong>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <Link to={`/admin-panel/clubs/view/${club.id}`}>
                  <EyeIcon />
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
};

export default AdminClubListPage;
