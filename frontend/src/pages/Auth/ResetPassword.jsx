import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const OTP_TIME = 5 * 60; // 5 minutes

const ResetPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const AxiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  //Countdown Timer
  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = () => {
    const min = Math.floor(timeLeft / 60);
    const sec = timeLeft % 60;
    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  // STEP 1: SEND OTP
  const sendOtp = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await AxiosPublic.post("/auth/send-reset-otp", { email });
      if (!res.data.success) {
        toast.error(res.data.message);
        return;
      } else {
        toast.success(res.data.message);
      }
      setTimeLeft(OTP_TIME);
      setStep(2);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // STEP 2: RESET PASSWORD
  const resetPassword = async (e) => {
    e.preventDefault();

    if (timeLeft <= 0) {
      toast.warning("OTP expired. Please try again.");
      return;
    }

    try {
      setLoading(true);
      const res = await AxiosPublic.post("/auth/reset-password", {
        email,
        otp,
        newPassword,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
      setStep(1);
      setEmail("");
      setOtp("");
      setNewPassword("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-1">Reset Password</h2>
        <p className="text-sm text-gray-600 mb-5">
          {step === 1
            ? "Enter your email to receive OTP"
            : "Enter OTP and new password"}
        </p>

        {/* STEP 1 */}
        {step === 1 && (
          <form onSubmit={sendOtp} className="space-y-4">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#F5B400] text-white py-2 rounded hover:bg-yellow-300 transition"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <form onSubmit={resetPassword} className="space-y-4">
            <p className="text-sm text-gray-500">
              OTP sent to <b>{email}</b>
            </p>

            {/* TIMER */}
            <p
              className={`text-sm ${
                timeLeft <= 30 ? "text-red-500" : "text-gray-500"
              }`}
            >
              Expires in <b>{formatTime()}</b>
            </p>

            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              placeholder="6-digit OTP"
              className="w-full border px-3 py-2 rounded text-center tracking-widest"
              required
            />

            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={6}
                className="w-full border px-3 py-2 rounded"
              />
              <span
                className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button
              type="submit"
              disabled={loading || timeLeft <= 0}
              className={`w-full py-2 rounded text-white transition ${
                timeLeft <= 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#F5B400] hover:bg-yellow-300"
              }`}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>

            {timeLeft <= 0 && (
              <p className="text-center text-sm text-red-500">
                OTP expired. Please Try again.
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
