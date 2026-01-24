import React, { useState, useEffect, useMemo } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import BaseListTable from "./BaseListTable";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useRef } from "react";

const GetAllBases = () => {
  const [bases, setBases] = useState([]);
  const [townHall, setTownHall] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const AxiosSecure = useAxiosSecure();
  const AxiosPublic = useAxiosPublic();

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

  // Fetch Townhall for search suggestion
  useEffect(() => {
    const fetchTownHalls = async () => {
      try {
        setLoading(true);
        const res = await AxiosPublic.get("/admin/get-townHall");
        setTownHall(res.data.townHall || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTownHalls();
  }, [AxiosPublic]);

  // Memoized search (prevents unnecessary re-renders)
  const filteredBases = useMemo(() => {
    return bases.filter((base) => {
      const linksText = Array.isArray(base.links)
        ? base.links.map((link) => `${link.label} ${link.url}`).join(" ")
        : "";

      return `${base.title} ${base.price} ${base.townHall} ${linksText}`
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
              "success",
            );
            setBases(bases.filter((base) => base._id !== baseId));
          } else {
            toast.error(res.data.message);
          }
        });
      }
    });
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !inputRef.current.contains(e.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter townhall suggestions based on searchTerm
  const townHallSuggestions = useMemo(() => {
    if (!searchTerm) return [];

    console.log("townHall data:", townHall);
    console.log("searchTerm:", searchTerm);

    const suggestions = townHall
      .flatMap((item) =>
        item.townhalls ? item.townhalls.split(",").map((th) => th.trim()) : [],
      )
      .filter((name) => name.toLowerCase().includes(searchTerm.toLowerCase()));

    console.log("townHallSuggestions:", suggestions);
    return suggestions;
  }, [searchTerm, townHall]);

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
        <div className="relative w-full sm:max-w-sm">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search by title, link, price, town hall"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            className="input input-bordered w-full"
            autoComplete="off"
          />

          {showSuggestions && townHallSuggestions.length > 0 && (
            <ul
              ref={dropdownRef}
              className="absolute z-50 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg max-h-48 overflow-y-auto"
            >
              {townHallSuggestions.map((suggestion, idx) => (
                <li
                  key={idx}
                  className="px-4 py-2 cursor-pointer hover:bg-amber-100 transition text-sm"
                  onClick={() => {
                    setSearchTerm(suggestion);
                    setShowSuggestions(false);
                  }}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
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
