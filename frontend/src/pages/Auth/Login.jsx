import React, { useState } from "react";
import { useForm } from "react-hook-form";
import logo from "../../assets/ClashOfClansLogo.png";
import Villager1 from "../../assets/Villager1.png";
import Villager2 from "../../assets/Villager2.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthProvider/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const AxiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      setLoading(true);

      const res = await AxiosPublic.post(
        "/auth/login",
        {
          email: data.email,
          password: data.password,
        },
        { withCredentials: true },
      );

      if (!res.data.success) {
        toast.error(res.data.message);
        return;
      }

      if (res.data.success) {
        toast.success("Login successful");
        await login();
        navigate("/profile");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 py-4 max-w-5xl mx-auto bg-white dark:bg-gray-900 min-h-screen">
      <div className="flex justify-center mb-4">
        <img src={logo} loading="lazy" alt="logo" className="w-72 h-auto" />
      </div>

      <div className="grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 gap-6 items-center">
        <div className="order-1 md:order-1 lg:order-2 flex justify-center">
          <img
            src="https://iili.io/fsYsHKJ.webp"
            loading="lazy"
            alt="ElectroFire"
            className="w-72 md:w-[374px] h-auto"
          />
        </div>

        <div className="order-2 md:order-2 lg:order-1 md:px-12 lg:px-0 sm:px-0">
          <div className="flex items-center gap-2 mb-1">
            <img
              src="https://iili.io/f6mQgA7.png"
              loading="lazy"
              alt=""
              className="h-8 w-8"
            />
            <h1 className="font-clash text-2xl dark:text-white">Opicoc</h1>
          </div>

          <p className="text-xl font-semibold dark:text-white">Get Started</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-5">
            Welcome! We're thrilled to have you
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block font-semibold mb-1 text-sm dark:text-white">
                Email
              </label>
              <input
                type="email"
                className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 outline-none focus:ring focus:ring-yellow-200 bg-white dark:bg-gray-700 text-black dark:text-white"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs dark:text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block font-semibold mb-1 text-sm dark:text-white">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 outline-none focus:ring focus:ring-yellow-200 bg-white dark:bg-gray-700 text-black dark:text-white"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Minimum 6 characters",
                    },
                  })}
                />
                <span
                  className="absolute right-3 top-2.5 cursor-pointer text-gray-500 dark:text-gray-400"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              {errors.password && (
                <p className="text-red-500 text-xs dark:text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Link to="/reset-password">
              <p className="text-end text-[#F5B400] text-sm cursor-pointer mb-1.5 dark:hover:text-yellow-300">
                Forgot password?
              </p>
            </Link>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#F5B400] hover:bg-yellow-300 text-white py-2 rounded-lg transition flex justify-center items-center gap-2"
            >
              {/* Spinner */}
              {loading && (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              )}

              {loading ? "Logging in..." : "Login"}
            </button>
            <span className="dark:text-gray-400">
              Don't have an account yet ?
            </span>
            <Link
              to="/registration"
              className="text-blue-500 underline dark:text-blue-400"
            >
              {" "}
              Sign up
            </Link>
          </form>
        </div>
      </div>
      {/* Bottom Village Images */}
      <div className="flex justify-between items-center mt-6">
        <img src={Villager1} alt="" className="w-24 md:w-32" />
        <img src={Villager2} alt="" className="w-24 md:w-32" />
      </div>
    </div>
  );
};

export default Login;
