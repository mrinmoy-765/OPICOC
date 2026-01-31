import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const OTP_TIME = 5 * 60; // 5 minutes in seconds

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

  // 1. CHECK FOR SAVED SESSION ON LOAD
  useEffect(() => {
    const savedEmail = localStorage.getItem("reset_email");
    const savedExpiry = localStorage.getItem("reset_expiry");

    if (savedEmail && savedExpiry) {
      const now = Date.now();
      const expiryTime = parseInt(savedExpiry, 10);
      const remainingSeconds = Math.floor((expiryTime - now) / 1000);

      if (remainingSeconds > 0) {
        // Restore session
        setEmail(savedEmail);
        setTimeLeft(remainingSeconds);
        setStep(2);
      } else {
        // Session expired, clear it
        clearSession();
      }
    }
  }, []);

  // 2. COUNTDOWN TIMER LOGIC
  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      // Re-calculate based on expiry timestamp to stay accurate across tab switches
      const savedExpiry = localStorage.getItem("reset_expiry");
      if (savedExpiry) {
        const remaining = Math.floor(
          (parseInt(savedExpiry) - Date.now()) / 1000,
        );
        if (remaining <= 0) {
          setTimeLeft(0);
          clearInterval(interval);
        } else {
          setTimeLeft(remaining);
        }
      } else {
        setTimeLeft((prev) => prev - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = () => {
    const min = Math.floor(timeLeft / 60);
    const sec = timeLeft % 60;
    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  const clearSession = () => {
    localStorage.removeItem("reset_email");
    localStorage.removeItem("reset_expiry");
    setStep(1);
    setEmail("");
    setOtp("");
    setNewPassword("");
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

      // SAVE TO LOCAL STORAGE
      const expiryTime = Date.now() + OTP_TIME * 1000;
      localStorage.setItem("reset_email", email);
      localStorage.setItem("reset_expiry", expiryTime.toString());

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
        clearSession(); // Clear storage on success
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // HANDLER FOR "TRY AGAIN" (When OTP expires)
  const handleTryAgain = () => {
    clearSession();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-1 text-black dark:text-white">
          Reset Password
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-5">
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
              className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded text-black dark:text-white bg-white dark:bg-gray-700"
              required
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
            <p className="text-sm text-gray-600 dark:text-gray-400">
              OTP sent to <b>{email}</b>
            </p>

            {/* TIMER */}
            <p
              className={`text-sm ${
                timeLeft <= 30
                  ? "text-red-500"
                  : "text-gray-600 dark:text-gray-400"
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
              className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded text-center tracking-widest text-black dark:text-white bg-white dark:bg-gray-700"
              required
              disabled={timeLeft <= 0}
            />

            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={6}
                className="w-full border border-gray-300 dark:border-gray-600 px-3 py-2 rounded text-black dark:text-white bg-white dark:bg-gray-700"
                disabled={timeLeft <= 0}
              />
              <span
                className="absolute right-3 top-2.5 cursor-pointer text-gray-500 dark:text-gray-400"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {timeLeft > 0 ? (
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#F5B400] text-white py-2 rounded hover:bg-yellow-300 transition"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            ) : (
              // Show Try Again button when expired
              <button
                type="button"
                onClick={handleTryAgain}
                className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
              >
                OTP Expired. Try Again?
              </button>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
