import React, { useState } from "react";

const NewsLetterTable = ({ emails }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(emails.length / itemsPerPage);

  const paginatedEmails = emails.slice(
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
  return (
    <div className="overflow-x-auto md:px-30">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th className="text-center">Email</th>
            <th className="text-center">Date</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {paginatedEmails.map((user) => (
            <tr key={user._id}>
              <td>{user.email}</td>
              <td>
                {new Date(user.createdAt).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-end mt-6">
          <nav className="inline-flex items-center space-x-1">
            <button
              className="btn btn-sm btn-outline"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>

            {getPages().map((page, index) => (
              <button
                key={index}
                className={`btn btn-sm ${
                  currentPage === page ? "btn-primary" : "btn-outline"
                } ${page === "..." ? "cursor-default" : ""}`}
                onClick={() => typeof page === "number" && setCurrentPage(page)}
                disabled={page === "..."}
              >
                {page}
              </button>
            ))}

            <button
              className="btn btn-sm btn-outline"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default NewsLetterTable;
