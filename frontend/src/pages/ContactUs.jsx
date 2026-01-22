import React, { useState } from "react";
import { toast } from "react-toastify";
import useAxiosPublic from "../hooks/useAxiosPublic";

const ContactUs = () => {
  const AxiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);
      const res = await AxiosPublic.post("/contact/send", formData);

      if (!res.data.success) {
        toast.error(res.data.message || "Something went wrong");
        return;
      }

      toast.success("Message sent successfully!");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
    }
  };

  return (
    <div className="bg-[#1d1d1d] py-14 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-10">
        <h1 className="text-3xl md:text-4xl font-clash text-center mb-8 text-amber-300">
          Contact Us
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              type="text"
              name="name"
              placeholder="Your Name *"
              value={formData.name}
              onChange={handleChange}
              className="input input-bordered w-full"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email *"
              value={formData.email}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          {/* Subject */}
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className="input input-bordered w-full"
          />

          {/* Message */}
          <textarea
            name="message"
            placeholder="Your Message *"
            value={formData.message}
            onChange={handleChange}
            className="textarea textarea-bordered w-full h-32 resize-none"
          />

          {/* Submit */}
          <button
            type="submit"
            className="w-full md:w-1/3 mx-auto block bg-[#F5B400] py-3 rounded-lg font-semibold hover:bg-yellow-500 transition"
          >
            {loading ? "Sending Message" : " Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
