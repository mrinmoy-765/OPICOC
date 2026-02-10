import React, { useState, useEffect } from "react";
import { useAuth } from "../../AuthProvider/AuthContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Spinner from "../../components/Spinner";

const AdminDashboard = () => {
  const [unreadCount, setUnreadCount] = useState();
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const AxiosSecure = useAxiosSecure();

  // Fetch users ONCE
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await AxiosSecure.get("/contact/unread-count");
        setUnreadCount(res.data.count);
      } catch (error) {
        console.error(error);
        toast.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [AxiosSecure]);
  if (loading) return <Spinner></Spinner>;
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

        <img
          src="https://iili.io/f6mQgA7.png"
          loading="lazy"
          alt=""
          className="w-[100px] h-[100px]"
        />
      </div>

      {/* Links */}
      <div className="flex flex-wrap justify-center items-center gap-5 mt-7">
        <Link to="/getAllUsers" className="btn btn-outline btn-warning">
          Users
        </Link>
        <Link to="/getAllAdmins" className="btn btn-outline btn-warning">
          Admins
        </Link>
        <Link to="/create-bases" className="btn btn-outline btn-warning">
          Add Bases
        </Link>
        <Link to="/get-bases" className="btn btn-outline btn-warning">
          See All Bases
        </Link>
        <Link to="/get-requests" className="btn btn-outline btn-warning">
          Base Requests
        </Link>
        <Link to="/getNewsLetter" className="btn btn-outline btn-warning">
          News Letter
        </Link>
        <Link to="/contact-messages" className="btn btn-outline btn-warning">
          Inbox{" "}
          <div className="badge badge-sm badge-warning">
            {unreadCount > 0 && <span>{unreadCount}</span>}
          </div>
        </Link>
        <Link to="/about-list" className="btn btn-outline btn-warning">
          About
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
