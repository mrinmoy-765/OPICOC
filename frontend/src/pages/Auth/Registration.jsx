import React, { useState } from "react";
import { useForm } from "react-hook-form";
import logo from "../../assets/ClashOfClansLogo.png";
import Breaker1 from "../../assets/Breaker_3.png";
import Breaker2 from "../../assets/Breaker_8.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { toast } from "react-toastify";

const Registration = () => {
  const navigate = useNavigate();
  const AxiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const res = await AxiosPublic.post("/auth/register", {
        FirstName: data.firstname,
        LastName: data.lastname,
        email: data.email,
        password: data.password,
      });

      // Backend responded ( an error )
      if (!res.data.success) {
        toast.error(res.data.message);
        return;
      }

      toast.success(res.data.message);

      navigate(`/verify-otp?email=${data.email}`);
    } catch (error) {
      //  Axios error (server crash / network)
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 py-4 max-w-5xl mx-auto bg-white dark:bg-[#1D232A] min-h-screen">
      {/* Logo */}
      <div className="flex justify-center mb-4">
        <img src={logo} loading="lazy" alt="logo" className="w-72 h-auto" />
      </div>

      {/* Grid */}
      <div className="grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 gap-6 items-center">
        {/* IMAGE FIRST ON SMALL DEVICES */}
        <div className="order-1 md:order-1 lg:order-2 flex justify-center">
          <img
            src="https://iili.io/fsYiyPa.webp"
            loading="lazy"
            alt="ElectroFire"
            className="lg:w-auto w- md:w-auto lg:h-[498px] md:h-[498px] h-auto"
          />
        </div>

        {/* FORM */}
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
            {/* First Name */}
            <div>
              <label className="block font-semibold mb-1 text-sm dark:text-white">
                First Name
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 outline-none focus:ring focus:ring-yellow-200 bg-white dark:bg-gray-700 text-black dark:text-white"
                {...register("firstname", {
                  required: "First name is required",
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Name must contain letters only",
                  },
                })}
              />
              {errors.firstname && (
                <p className="text-red-500 text-xs dark:text-red-400">
                  {errors.firstname.message}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="block font-semibold mb-1 text-sm dark:text-white">
                Last Name
              </label>
              <input
                type="lastname"
                className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 outline-none focus:ring focus:ring-yellow-200 bg-white dark:bg-gray-700 text-black dark:text-white"
                {...register("lastname", {
                  required: "Last Name is required",
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Name must contain letters only",
                  },
                })}
              />
              {errors.lastname && (
                <p className="text-red-500 text-xs dark:text-red-400">
                  {errors.lastname.message}
                </p>
              )}
            </div>

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

              {loading ? "Signing up..." : "Sign Up"}
            </button>
            <span className="dark:text-gray-400">
              Already have an account ?
            </span>
            <Link
              to="/login"
              className="text-blue-500 underline dark:text-blue-400"
            >
              {" "}
              Sign in
            </Link>
          </form>
        </div>
      </div>
      {/* Bottom Village Images */}
      <div className="flex justify-between items-center mt-6">
        <img src={Breaker1} alt="" className="w-24 md:w-32" />
        <img src={Breaker2} alt="" className="w-24 md:w-32" />
      </div>
    </div>
  );
};

export default Registration;
