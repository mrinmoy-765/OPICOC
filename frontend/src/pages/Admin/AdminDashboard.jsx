import React from "react";
import Legend from "../../assets/Legend.png";
import { useAuth } from "../../AuthProvider/AuthContext";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const { user } = useAuth();
  return (
    <div className="my-3.5">
      <div className="badge badge-soft badge-success text-start">
        {user?.FirstName}
      </div>
      <br />
      <div className="badge badge-soft badge-accent text-start">
        {user?.email}
      </div>
      <p className="text-end text-lg font-semibold mr-4">Welcome, Dashboard</p>
      <div className="flex justify-end items-center">
        <span className="font-bold text-7xl font-clash text-amber-300">
          Opicoc
        </span>

        <img src={Legend} alt="" className="w-[100px] h-[100px]" />
      </div>

      {/* Links */}
      <div className="flex flex-wrap justify-center items-center gap-5 mt-7">
        <Link to="/getAllUsers" className="btn btn-outline btn-warning">
          Users
        </Link>
        <Link to="/getAllAdmins" className="btn btn-outline btn-warning">
          Admins
        </Link>
        <button className="btn btn-outline btn-warning">Get Bases</button>
        <button className="btn btn-outline btn-warning">Add Bases</button>
        <button className="btn btn-outline btn-warning">Reviews</button>
        <button className="btn btn-outline btn-warning">Sales Info</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
