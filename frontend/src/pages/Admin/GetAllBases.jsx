import React, { useState, useEffect, useMemo } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import BaseListTable from "./BaseListTable";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const GetAllBases = () => {
  const [bases, setBases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const AxiosSecure = useAxiosSecure();

  // Fetch bases ONCE
  useEffect(() => {
    const fetchBases = async () => {
      try {
        setLoading(true);
        const res = await AxiosSecure.get("/admin/get-bases");
        setBases(res.data.bases);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBases();
  }, [AxiosSecure]);

  // Memoized search (prevents unnecessary re-renders)
  const filteredBases = useMemo(() => {
    return bases.filter((base) => {
      const linksText = Array.isArray(base.links)
        ? base.links.map((link) => `${link.label} ${link.url}`).join(" ")
        : "";

      return `${base.title} ${base.price} ${linksText}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    });
  }, [bases, searchTerm]);

  //delete product
  const handleDelete = (baseId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        AxiosSecure.delete(`/admin/deleteBase/${baseId}`).then((res) => {
          if (res.data.success) {
            Swal.fire(
              "Deleted!",
              "Base has been removed successfully.",
              "success"
            );
            setBases(bases.filter((base) => base._id !== baseId));
          } else {
            toast.error(res.data.message);
          }
        });
      }
    });
  };

  if (loading) return <p>Loading...</p>;

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
            Total Bases{" "}
            <div className="badge badge-sm  bg-amber-300">{bases.length}</div>
          </button>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search bases by title, price, label"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full sm:max-w-sm"
        />
      </div>

      {/* Results */}
      {filteredBases.length === 0 ? (
        <div className="text-center text-red-500 py-10">
          No bases match your search.
        </div>
      ) : (
        <BaseListTable bases={filteredBases} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default GetAllBases;
