import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ReplyModal from "./ReplyModal";
import { BsFillBookmarkCheckFill } from "react-icons/bs";

const AdminContactMessages = () => {
  const AxiosSecure = useAxiosSecure();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const safeCurrentPage = Math.min(
    currentPage,
    Math.max(1, Math.ceil(messages.length / itemsPerPage)),
  );

  const totalPages = Math.ceil(messages.length / itemsPerPage);

  // Slice bookings for current page
  const paginatedMessages = messages.slice(
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
    fetchMessages();
  }, [AxiosSecure]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await AxiosSecure.get("/contact/all");
      setMessages(res.data.messages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      const res = await AxiosSecure.patch(`/contact/mark-read/${id}`);

      if (res.data.success) {
        fetchMessages(); // REFRESH DATA
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p className="text-center">Loading messages...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-clash mb-6">Contact Messages</h1>

      <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4">
        {paginatedMessages.map((msg) => (
          <div key={msg._id} className="card w-full bg-base-100 shadow-sm">
            <div className="card-body">
              <h2 className="card-title">
                Name: <span className="text-gray-400">{msg.name}</span>
              </h2>
              <p>
                Email: <span className="text-blue-500 italic">{msg.email}</span>
              </p>
              <p className="font-semibold">Subject: {msg.subject || "-"}</p>
              <p>{msg.message}</p>
              <span className="text-sm text-gray-500">
                {new Date(msg.createdAt).toLocaleDateString()}
              </span>
              <p className="font-bold italic flex gap-1.5">
                MSG NO # {msg._id}{" "}
                {msg.isRead && (
                  <BsFillBookmarkCheckFill className="text-2xl text-green-500" />
                )}
              </p>

              {!msg.isRead && (
                <button
                  onClick={() => markAsRead(msg._id)}
                  className="btn btn-xs btn-success w-1/4"
                >
                  Mark as Read
                </button>
              )}

              <div className="card-actions justify-end">
                <button
                  onClick={() => {
                    setSelectedEmail(msg.email);
                    setIsModalOpen(true);
                  }}
                  className="btn bg-sky-500 text-white hover:bg-sky-700"
                >
                  Reply
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-end mt-6">
          <nav className="inline-flex items-center space-x-1">
            <button
              className="btn btn-sm btn-outline"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={safeCurrentPage === 1}
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

      {/* Modal */}
      <ReplyModal
        isOpen={isModalOpen}
        email={selectedEmail}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default AdminContactMessages;
