import React, { useState, useEffect } from "react";
import defaultDp from "../../assets/profile-icon.png";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Spinner from "../../components/Spinner";

const BaseRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const AxiosSecure = useAxiosSecure();

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const safeCurrentPage = Math.min(
    currentPage,
    Math.max(1, Math.ceil(requests.length / itemsPerPage)),
  );

  const totalPages = Math.ceil(requests.length / itemsPerPage);

  const paginatedRequests = requests.slice(
    (safeCurrentPage - 1) * itemsPerPage,
    safeCurrentPage * itemsPerPage,
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  React.useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await AxiosSecure.get("/request/get-requests");
        setRequests(res.data.requests || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [AxiosSecure]);

  if (loading) {
    return <Spinner></Spinner>;
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedRequests.map((d, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/*  image */}
            {d.requestImage && (
              <img
                src={d.requestImage}
                loading="lazy"
                alt="review product"
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <div>
                <span className="text-md font-semibold text-gray-500 italic">
                  {d.request}
                </span>
              </div>
              <div className="flex justify-between items-start mt-7">
                <div>
                  <h2 className="font-bold text-lg dark:text-black py-1">
                    {d.FirstName} {d.LastName}
                  </h2>

                  <p className="text-gray-500 text-sm">
                    {new Date(d.createdAt).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <p className="mt-3 text-gray-700 line-clamp-3">{d.review}</p>

              {/* user info */}
              <div className="flex items-center gap-3 mt-2">
                <img
                  src={d?.userImage || defaultDp}
                  loading="lazy"
                  alt="user"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="text-sm text-gray-600">{d.email}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-end mt-6">
          <div className="join">
            <button
              className="btn btn-sm join-item"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>

            {getPages().map((page, idx) => (
              <button
                key={idx}
                className={`btn btn-sm join-item ${
                  currentPage === page ? "btn-primary" : "btn-outline"
                }`}
                disabled={page === "..."}
                onClick={() => typeof page === "number" && setCurrentPage(page)}
              >
                {page}
              </button>
            ))}

            <button
              className="btn btn-sm join-item"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
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

export default BaseRequests;
