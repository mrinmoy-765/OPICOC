import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Auth/Login";
import Registration from "../pages/Auth/Registration";
import VerifyOtp from "../pages/Auth/VerifyOtp";
import ResetPassword from "../pages/Auth/ResetPassword";
import Profile from "../components/User/Profile";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import GetAllUsers from "../pages/Admin/GetAllUsers";
import GetAllAdmin from "../pages/Admin/GetAllAdmin";
import CreateBases from "../pages/Admin/createBases";

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
      {
        path: "/adminDashboard",
        element: <AdminDashboard></AdminDashboard>,
      },
      {
        path: "getAllUsers",
        element: <GetAllUsers></GetAllUsers>,
      },
      {
        path: "getAllAdmins",
        element: <GetAllAdmin></GetAllAdmin>,
      },
      {
        path: "create-bases",
        element: <CreateBases></CreateBases>,
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
    path: "/verify-otp",
    element: <VerifyOtp></VerifyOtp>,
  },
  {
    path: "reset-password",
    element: <ResetPassword></ResetPassword>,
  },
]);

export default router;
