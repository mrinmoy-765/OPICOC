import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useCart } from "../context/CartContext";
import { GiPowerLightning } from "react-icons/gi";
import { useRef } from "react";
import { FaOpencart } from "react-icons/fa6";
import Spinner from "../components/Spinner";

const AllProducts = () => {
  const AxiosPublic = useAxiosPublic();
  const { addToCart } = useCart();
  const [bases, setBases] = useState([]);
  const [townHall, setTownHall] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [sortOption, setSortOption] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const itemsPerPage = 9;
  const totalPages = Math.ceil(bases.length / itemsPerPage);

  // Fetch bases ONCE
  useEffect(() => {
    const fetchBases = async () => {
      try {
        setLoading(true);
        const res = await AxiosPublic.get("/admin/get-bases");
        setBases(res.data.bases);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBases();
  }, [AxiosPublic]);

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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // Search filtering
  const filteredBases = bases.filter(
    (base) =>
      base.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      base.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      base.townHall.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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

    const suggestions = townHall
      .flatMap((item) =>
        item.townhalls ? item.townhalls.split(",").map((th) => th.trim()) : [],
      )
      .filter((name) => name.toLowerCase().includes(searchTerm.toLowerCase()));

    console.log("townHallSuggestions:", suggestions);
    return suggestions;
  }, [searchTerm, townHall]);

  // Sorting after filtering
  const sortedBases = [...filteredBases].sort((a, b) => {
    if (sortOption === "price-low") return a.price - b.price;
    if (sortOption === "price-high") return b.price - a.price;
    if (sortOption === "date-newest")
      return new Date(b.date) - new Date(a.date);
    if (sortOption === "date-oldest")
      return new Date(a.date) - new Date(b.date);
    return 0;
  });

  const paginatedBases = sortedBases.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const getPages = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        );
      }
    }
    return pages;
  };

  if (loading) {
    return <Spinner></Spinner>;
  }

  return (
    <div className="bg-[#1d1d1d] pt-2 pb-10 px-5">
      {/* Right: Search and Sort */}
      <div className="flex flex-col md:flex-row items-center gap-4 w-full md:justify-end mb-3">
        <div className="lg:w-1/4 md:w-screen w-full">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search bases"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            className="input input-bordered"
            autoComplete="off"
          />
          {showSuggestions && townHallSuggestions.length > 0 && (
            <ul
              ref={dropdownRef}
              className="absolute z-50 mt-1  rounded-lg border border-gray-200 bg-white dark:bg-black  shadow-lg max-h-48 overflow-y-auto"
            >
              {townHallSuggestions.map((suggestion, idx) => (
                <li
                  key={idx}
                  className="px-4 py-2 cursor-pointer hover:bg-amber-100 dark:hover:bg-gray-500 transition text-sm"
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

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="select select-bordered w-full md:max-w-xs"
        >
          <option value="">Sort By</option>
          <option value="date-newest">Newest Bases</option>
          <option value="price-low">Price (Lowest)</option>
          <option value="price-high">Price (Highest)</option>
        </select>
      </div>

      {/* card grid */}
      {paginatedBases.length === 0 ? (
        <div className="text-center text-red-500 py-10 text-xl font-semibold">
          No bases match your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 content-center">
          {paginatedBases.map((base) => (
            <div key={base._id} className="card bg-base-100 shadow-sm">
              <figure className="bg-transparent">
                <img
                  src={base.productImage}
                  loading="lazy"
                  alt={base.title}
                  className="w-full h-[300px] object-cover"
                />
              </figure>

              <div className="card-body bg-[#1d1d1d]">
                <div className="lg:flex md:flex lg:justify-between lg:items-center md:justify-between md:items-center">
                  <p className="text-white">⭐⭐⭐⭐⭐</p>
                  <div className="flex justify-center items-center mt-2 lg:mt-0 md:mt-0">
                    <GiPowerLightning className="text-white text-2xl" />
                    <span className="text-white text-sm">
                      This pack is validate for{" "}
                      {Math.ceil(
                        (new Date(base.seasonEndDate) - new Date()) /
                          (1000 * 3600 * 24),
                      )}{" "}
                      days
                    </span>
                  </div>
                </div>

                <h2 className="card-title font-clash text-white  hover:text-gray-300">
                  {base.title}
                </h2>

                <div className="flex justify-between items-center">
                  <h4 className="text-white font-clash">${base.price} USD</h4>
                  <span className="badge">{base?.badge}</span>
                </div>

                {/* Short description */}
                <p className="text-gray-300 text-sm line-clamp-3">
                  {base.description}
                </p>

                {/* See more */}
                <label
                  htmlFor={`modal-${base._id}`}
                  className="text-[#F5B400] cursor-pointer text-sm hover:underline"
                >
                  See more
                </label>

                <div className="card-actions justify-start mt-3">
                  <button
                    onClick={() =>
                      addToCart({
                        _id: base._id,
                        title: base.title,
                        price: base.price,
                        productImage: base.productImage,
                      })
                    }
                    className="group w-full md:w-2/5 bg-[#F5B400] py-3 text-black font-semibold rounded-lg hover:bg-yellow-600 transition"
                  >
                    <span className="group-hover:animate-bounce flex justify-center items-center gap-2">
                      <FaOpencart className="text-2xl" />
                      Add To Cart
                    </span>
                  </button>
                </div>
              </div>

              {/* Modal */}
              <input
                type="checkbox"
                id={`modal-${base._id}`}
                className="modal-toggle"
              />
              <div className="modal">
                <div className="modal-box bg-[#1d1d1d] text-white max-w-2xl">
                  <h3 className="font-clash text-xl mb-4">{base.title}</h3>
                  <p className="text-gray-300">{base.description}</p>

                  <div className="modal-action">
                    <label
                      htmlFor={`modal-${base._id}`}
                      className="btn bg-[#F5B400] text-black hover:bg-yellow-600"
                    >
                      Close
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-end mt-6">
          <div className="join">
            <button
              className="btn btn-sm join-item bg-white text-black"
              onClick={() => setCurrentPage((p) => p - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>

            {getPages().map((page, idx) => (
              <button
                key={idx}
                className={`btn btn-sm join-item  ${
                  currentPage === page ? "btn bg-amber-300" : "btn bg-gray-200"
                }`}
                disabled={page === "..."}
                onClick={() => typeof page === "number" && setCurrentPage(page)}
              >
                {page}
              </button>
            ))}

            <button
              className="btn btn-sm join-item bg-white text-black"
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
