import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const ReplyModal = ({ isOpen, onClose, email }) => {
  const AxiosSecure = useAxiosSecure();

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setSubject("");
      setMessage("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subject.trim() || !message.trim()) {
      toast.error("Subject and message are required");
      return;
    }

    try {
      setLoading(true);

      const res = await AxiosSecure.post("/contact/reply", {
        email,
        subject,
        message,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        onClose();
      } else {
        toast.error(res.data.message || "Failed to send email");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-xl w-full max-w-lg p-6 relative">
        {/* Header */}
        <h2 className="text-2xl font-semibold mb-4">
          Reply to <span className="text-blue-600 font-medium">{email}</span>
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Subject */}
          <div>
            <label className="label font-semibold">Subject</label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter email subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          {/* Message */}
          <div>
            <label className="label font-semibold">Message</label>
            <textarea
              rows="6"
              className="textarea textarea-bordered w-full"
              placeholder="Write your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-outline"
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Email"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReplyModal;
