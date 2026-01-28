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
import GetAllBases from "../pages/Admin/GetAllBases";
import EditBase from "../pages/Admin/EditBase";
import AllProducts from "../pages/AllProducts";
import Cart from "../pages/CartPage";
import TermsConditions from "../pages/TermsConditions";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import Faq from "../pages/Faq";
import ContactUs from "../pages/ContactUs";
import AdminContactMessages from "../pages/Admin/AdminContactMessages";
import AboutList from "../pages/Admin/AboutList";
import CreateAboutForm from "../pages/Admin/createAboutForm";
import EditAbout from "../pages/Admin/EditAbout";
import About from "../pages/About";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import NotFound from "../components/NotFound";

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
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
      {
        path: "/adminDashboard",
        element: (
          <AdminRoute>
            <AdminDashboard></AdminDashboard>
          </AdminRoute>
        ),
      },
      {
        path: "getAllUsers",
        element: (
          <AdminRoute>
            <GetAllUsers></GetAllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "getAllAdmins",
        element: (
          <AdminRoute>
            <GetAllAdmin></GetAllAdmin>
          </AdminRoute>
        ),
      },
      {
        path: "create-bases",
        element: (
          <AdminRoute>
            <CreateBases></CreateBases>
          </AdminRoute>
        ),
      },
      {
        path: "get-bases",
        element: (
          <AdminRoute>
            <GetAllBases></GetAllBases>
          </AdminRoute>
        ),
      },
      {
        path: "admin/edit-base/:id",
        element: (
          <AdminRoute>
            <EditBase></EditBase>
          </AdminRoute>
        ),
      },
      {
        path: "/all-products",
        element: <AllProducts></AllProducts>,
      },
      {
        path: "/cart",
        element: <Cart></Cart>,
      },
      {
        path: "/terms-conditions",
        element: <TermsConditions></TermsConditions>,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy></PrivacyPolicy>,
      },
      {
        path: "/FAQ's",
        element: <Faq></Faq>,
      },
      {
        path: "/contact-us",
        element: <ContactUs></ContactUs>,
      },
      {
        path: "/contact-messages",
        element: (
          <AdminRoute>
            <AdminContactMessages></AdminContactMessages>
          </AdminRoute>
        ),
      },
      {
        path: "/about-list",
        element: (
          <AdminRoute>
            <AboutList></AboutList>
          </AdminRoute>
        ),
      },
      {
        path: "/create-about",
        element: (
          <AdminRoute>
            <CreateAboutForm></CreateAboutForm>
          </AdminRoute>
        ),
      },
      {
        path: "/edit-about/:id",
        element: (
          <AdminRoute>
            <EditAbout></EditAbout>
          </AdminRoute>
        ),
      },
      {
        path: "/about",
        element: <About></About>,
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
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
