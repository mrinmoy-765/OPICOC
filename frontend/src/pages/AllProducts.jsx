import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useCart } from "../context/CartContext";

const AllProducts = () => {
  const AxiosPublic = useAxiosPublic();
  const { addToCart } = useCart();
  const [bases, setBases] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
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

  // Search filtering
  const filteredBases = bases.filter(
    (base) =>
      base.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      base.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    currentPage * itemsPerPage
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
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pages;
  };

  if (loading) {
    return "loading....";
  }

  return (
    <div className="bg-[#1d1d1d] pt-2 pb-10 px-5">
      {/* Right: Search and Sort */}
      <div className="flex flex-col md:flex-row items-center gap-4 w-full md:justify-end mb-3">
        <input
          type="text"
          placeholder="Search Bases"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full md:max-w-md"
        />
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 content-center">
        {paginatedBases.map((base) => (
          <div key={base._id} className="card bg-base-100 shadow-sm">
            <figure className="bg-[#7a7979]">
              <img
                src={base.productImage}
                alt={base.title}
                className="w-full h-[300px] object-cover"
              />
            </figure>

            <div className="card-body bg-[#1d1d1d]">
              <p className="text-white">⭐⭐⭐⭐⭐</p>

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
                  <span className="inline-block group-hover:animate-bounce">
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
