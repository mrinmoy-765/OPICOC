import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const OTP_EXPIRY_TIME = 5 * 60; // 5 minutes in seconds

const VerifyOtp = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const email = searchParams.get("email");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(OTP_EXPIRY_TIME);

  //  Countdown Timer
  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  // Format mm:ss
  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    if (timeLeft <= 0) {
      alert("OTP expired. Please request a new one.");
      return;
    }

    try {
      setLoading(true);

      await axios.post("http://localhost:5000/api/verify-otp", {
        email,
        otp,
      });

      alert("Email verified successfully!");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleVerify}
        className="w-full max-w-sm bg-white p-6 rounded-xl shadow"
      >
        <h2 className="text-xl font-semibold mb-1">Verify Email</h2>

        <p className="text-sm text-gray-600 mb-3">
          We sent an OTP to <b>{email}</b>
        </p>

        {/* TIMER */}
        <p
          className={`text-sm mb-4 ${
            timeLeft <= 30 ? "text-red-500" : "text-gray-500"
          }`}
        >
          OTP Expires in <b>{formatTime()}</b>
        </p>

        <input
          type="text"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
          placeholder="Enter 6-digit OTP"
          className="w-full border px-3 py-2 rounded mb-4 text-center tracking-widest text-lg"
          required
        />

        <button
          type="submit"
          disabled={loading || timeLeft <= 0}
          className={`w-full py-2 rounded flex justify-center text-white transition ${
            timeLeft <= 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#F5B400] hover:bg-yellow-300"
          }`}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        {/* RESEND PLACEHOLDER */}
        {timeLeft <= 0 && (
          <p className="text-center text-sm mt-4 text-red-500">
            OTP expired. Please try again.
          </p>
        )}
      </form>
    </div>
  );
};

export default VerifyOtp;
