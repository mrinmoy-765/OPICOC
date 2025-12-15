import React, { useState } from "react";
import { useForm } from "react-hook-form";
import logo from "../assets/ClashOfClansLogo.png";
import ElectroFire from "../assets/ElectroFire.png";
import Villager1 from "../assets/Villager1.png";
import Villager2 from "../assets/Villager2.png";
import Legend from "../assets/Legend.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    console.log("Login Data:", data);

    // Simulate login delay
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="px-6 py-4 max-w-5xl mx-auto">
      {/* Logo */}
      <div className="flex justify-center mb-4">
        <img src={logo} alt="logo" className="w-72 h-auto" />
      </div>

      {/* Grid */}
      <div className="grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 gap-6 items-center">
        {/* IMAGE FIRST ON SMALL DEVICES */}
        <div className="order-1 md:order-1 lg:order-2 flex justify-center">
          <img
            src={ElectroFire}
            alt="ElectroFire"
            className="w-72 md:w-[374px] h-auto"
          />
        </div>

        {/* FORM */}
        <div className="order-2 md:order-2 lg:order-1 md:px-12 lg:px-0 sm:px-0">
          <div className="flex items-center gap-2 mb-1">
            <img src={Legend} alt="" className="h-8 w-8" />
            <h1 className="font-clash text-2xl">Opicoc</h1>
          </div>

          <p className="text-xl font-semibold">Get Started</p>
          <p className="text-sm text-gray-600 mb-5">
            Welcome! We're thrilled to have you
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block font-semibold mb-1 text-sm">Email</label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring focus:ring-yellow-200"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block font-semibold mb-1 text-sm">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  className="w-full border border-gray-300 rounded px-3 py-2 outline-none focus:ring focus:ring-yellow-200"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Minimum 6 characters",
                    },
                  })}
                />
                <span
                  className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              {errors.password && (
                <p className="text-red-500 text-xs">
                  {errors.password.message}
                </p>
              )}
            </div>

            <p className="text-end text-[#F5B400] text-sm cursor-pointer">
              Forgot password?
            </p>

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
            <span className="text-gray-600">Don't have an account yet ?</span>
            <Link to="/registration" className="text-blue-500 underline">
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
