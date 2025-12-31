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
      {/* Left side */}
      <div className="w-2/5">
        <div className="flex flex-col items-center justify-center mt-7">
          <img
            src="https://i.pravatar.cc/150"
            alt="User"
            className="rounded-full"
          />
          <p className="text-red-500 text-2xl">
            <strong>{data.firstName}</strong>
          </p>
          <p>
            <strong>{data.email}</strong>
          </p>
          <p>{data.phone}</p>
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
