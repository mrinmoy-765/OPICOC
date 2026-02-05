import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BaseListTable = ({ bases = [], onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const safeCurrentPage = Math.min(
    currentPage,
    Math.max(1, Math.ceil(bases.length / itemsPerPage)),
  );

  const totalPages = Math.ceil(bases.length / itemsPerPage);

  const paginatedBases = bases.slice(
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

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Image</th>
            <th className="text-center">Title</th>
            <th className="text-center">Price</th>
            <th className="text-center">Badge</th>
            <th className="text-center">Town Hall</th>
            <th className="text-center">Labels & Links</th>
            <th className="text-center">Created</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>

        <tbody className="text-center">
          {paginatedBases.map((base) => (
            <tr key={base._id}>
              <td>
                <img
                  src={base?.productImage}
                  loading="lazy"
                  alt={base?.title}
                  className="w-20 h-14 object-cover rounded"
                />
              </td>

              <td>{base?.title}</td>
              <td>${base?.price}</td>
              <td>{base?.badge}</td>
              <td className="max-w-xs truncate">{base?.townHall}</td>

              {/* Links column */}
              <td>
                <div className="flex flex-wrap justify-center gap-1">
                  {Array.isArray(base.links) && base.links.length > 0 ? (
                    base.links.map((link) => (
                      <a
                        key={link._id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="badge badge-outline badge-sm"
                      >
                        {link.label}
                      </a>
                    ))
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </div>
              </td>

              <td>
                {new Date(base.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </td>

              {/* Actions */}
              <td>
                <div className="flex justify-center gap-2">
                  <Link
                    to={`/admin/edit-base/${base._id}`}
                    className="btn btn-xs btn-outline btn-info"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => onDelete(base._id)}
                    className="btn btn-xs btn-outline btn-error"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
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

export default BaseListTable;
