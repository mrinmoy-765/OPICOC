import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Auth/Login";
import Registration from "../pages/Auth/Registration";
import AdminLogin from "../pages/Auth/AdminLogin";
import VerifyOtp from "../pages/Auth/VerifyOtp";
import ResetPassword from "../pages/Auth/ResetPassword";
import Profile from "../components/User/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/profile",
        element: <Profile></Profile>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/registration",
    element: <Registration></Registration>,
  },
  {
    path: "/admin-login",
    element: <AdminLogin></AdminLogin>,
  },
  {
    path: "/verify-otp",
    element: <VerifyOtp></VerifyOtp>,
  },
  {
    path: "reset-password",
    element: <ResetPassword></ResetPassword>,
  },
]);

export default router;
