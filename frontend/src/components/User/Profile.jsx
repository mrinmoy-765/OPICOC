import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";

const Profile = () => {
  const AxiosSecure = useAxiosSecure();

  const { data, isPending, error } = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      const res = await AxiosSecure.get("/user/data");
      return res.data.userData;
    },
  });

  //console.log("Data", data);

  if (isPending) return <p>Loading...</p>;
  if (error) return <p>Failed to load profile</p>;

  return (
    <div className="lg:flex py-5">
      {/* left side */}
      <div className="w-full lg:w-2/5 px-4">
        <div
          className="
    flex flex-row items-center gap-4
    md:flex-col md:items-center 
    lg:flex-col lg:items-center
    mt-7
  "
        >
          {/* Avatar */}
          <div className="w-28 h-28 sm:w-32 sm:h-32">
            <img
              src="https://i.pravatar.cc/150"
              alt="User"
              className="rounded-full w-full h-full object-cover"
            />
          </div>

          {/* User Info */}
          <div className="text-center space-y-1">
            <p className="text-red-500 text-xl font-semibold">
              {data.firstName}
            </p>
            <p className="text-sm break-all">{data.email}</p>
            {data?.phone && (
              <p className="text-sm text-gray-600">{data.phone}</p>
            )}
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="w-full">
        <ProfileInfo user={data} />
        <ChangePassword />
      </div>
    </div>
  );
};

export default Profile;
