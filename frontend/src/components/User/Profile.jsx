import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";
import ProfileImageUpload from "./ProfileImageUpload";
import { Link } from "react-router-dom";
import { useAuth } from "../../AuthProvider/AuthContext";
import defaultImage from "../../assets/profile-icon.png";
import Spinner from "../Spinner";

const Profile = () => {
  const AxiosSecure = useAxiosSecure();
  const [preview, setPreview] = useState(null);

  const { user } = useAuth();
  // console.log("User role", user.role);

  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      const res = await AxiosSecure.get("/user/data");
      return res.data.userData;
    },
  });

  if (isPending) return <Spinner></Spinner>;
  if (error) return <p>Failed to load profile</p>;

  const imageSrc = preview || data?.image || defaultImage;

  return (
    <div className="lg:flex py-5">
      {/* LEFT SIDE */}
      <div className="w-full lg:w-2/5 px-4">
        <div className="flex flex-row md:flex-col items-center gap-4 mt-7">
          {/* Avatar */}
          <div className="w-28 h-28 sm:w-32 sm:h-32">
            <img
              src={imageSrc}
              alt="User"
              className="rounded-full w-full h-full object-cover border"
            />
          </div>

          {/* User Info */}
          <div className="text-center space-y-2">
            <p className="text-red-500 text-xl font-semibold">
              {data.firstName}
            </p>
            <p className="text-sm break-all">{data.email}</p>

            {/* Upload */}
            <ProfileImageUpload refetch={refetch} setPreview={setPreview} />
            {/* admin dashboard */}
            {user?.role === "admin" && (
              <Link
                to="/adminDashboard"
                className="group w-full  bg-green-500 py-3 px-7 text-black font-semibold rounded-lg hover:bg-green-700 transition hover:text-white"
              >
                <span className="inline-block group-hover:translate-x-2 transition duration-300 ease-in-out cursor-pointer">
                  Go to Dashboard
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full">
        <ProfileInfo user={data} />
        <ChangePassword />
      </div>
    </div>
  );
};

export default Profile;
