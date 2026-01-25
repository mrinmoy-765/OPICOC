import React, { useState, useEffect, useMemo } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import AdminListTable from "./AdminListTable";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";

const GetAllAdmin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const AxiosSecure = useAxiosSecure();

  // Fetch users ONCE
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await AxiosSecure.get("/admin/get-admins");
        setUsers(res.data.users);
      } catch (error) {
        console.error(error);
        toast.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [AxiosSecure]);

  // Memoized search (prevents unnecessary re-renders)
  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      `${user.FirstName} ${user.LastName} ${user.email}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    );
  }, [users, searchTerm]);

  if (loading) return <Spinner></Spinner>;

  return (
    <div className="my-7 px-4 sm:px-6 lg:px-8">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        {/* Dashboard button */}
        <div className="flex justify-center items-center gap-4">
          <Link
            to="/adminDashboard"
            className="group inline-flex justify-center items-center bg-green-500 py-3 px-6 text-black font-semibold rounded-lg hover:bg-green-700 hover:text-white transition w-full sm:w-auto"
          >
            <span className="group-hover:translate-x-2 transition duration-300 ease-in-out">
              Go to Dashboard
            </span>
          </Link>

          <button className="btn">
            Admin{" "}
            <div className="badge badge-sm  bg-amber-300">{users.length}</div>
          </button>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search admin"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full sm:max-w-sm"
        />
      </div>

      {/* Results */}
      {filteredUsers.length === 0 ? (
        <div className="text-center text-red-500 py-10">
          No users match your search.
        </div>
      ) : (
        <AdminListTable users={filteredUsers} />
      )}
    </div>
  );
};

export default GetAllAdmin;
