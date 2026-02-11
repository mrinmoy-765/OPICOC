import React from "react";
import { useState } from "react";
import defaultUser from "../assets/profile-icon.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoSearchOutline } from "react-icons/io5";
import { FaCaretDown } from "react-icons/fa";
import { BsCurrencyDollar } from "react-icons/bs";
import NavigationDrawer from "./Drawer";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthProvider/AuthContext";
import { useCart } from "../context/CartContext";
import Spinner from "./Spinner";
import Swal from "sweetalert2";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileHovered, setProfileHovered] = useState(false);

  const { isAuthenticated, isLoading, user, logout } = useAuth();
  const { cartItems, totalPrice } = useCart();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    // Main Container: Column on mobile, Row on Desktop
    <div className="navbar bg-[#F5B400] shadow-sm flex flex-col h-auto py-2 lg:flex-row lg:py-0">
      {/* --- ROW 1: Logo (Center) & Hamburger (Right) --- */}
      {/* 
          Mobile: relative positioning allows absolute placement of hamburger. 
                  justify-center centers the logo.
          Desktop: static positioning restores flow. justify-start aligns left.
      */}
      <div className="w-full relative flex items-center justify-center lg:w-auto lg:flex-1 lg:justify-start lg:static">
        {/* Hamburger: Absolute Right on mobile, Static Left on Desktop */}
        <GiHamburgerMenu
          className="text-3xl cursor-pointer absolute right-4 lg:static lg:ml-3"
          onClick={() => setDrawerOpen(true)}
        />

        {/* Drawer Component */}
        <NavigationDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        />

        {/* Logo & Text Group */}
        <Link to="/" className="flex items-center">
          <img
            src="https://iili.io/f6mQgA7.png"
            loading="lazy"
            alt=""
            className="w-[50px] h-[50px] lg:ml-7"
          />
          <p className="font-medium font-clash text-2xl text-white ml-1.5">
            Opicoc
          </p>
        </Link>
      </div>

      {/* --- ROW 2: Search Bar --- */}
      <div className="w-full px-2 mt-3 lg:mt-0 lg:w-auto lg:px-0 lg:ml-5 flex justify-center">
        <div className="relative w-full lg:w-80 mr-3">
          <input
            type="text"
            placeholder="Search here"
            className="input input-bordered rounded-xl pr-10 w-full"
          />
          <IoSearchOutline className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
        </div>
      </div>

      {/* --- ROW 3: Shop, Dollar, Cart, Login --- */}
      <div className="w-full flex justify-center items-center mt-3 px-2 lg:mt-0 lg:w-auto lg:justify-end lg:px-0 lg:flex-none">
        <div className="flex items-center">
          {/* shop */}
          <div className="dropdown dropdown-bottom dropdown-center">
            <div
              tabIndex={0}
              role="button"
              className="btn m-1 bg-transparent border-black btn-sm lg:btn-md"
            >
              <span>Shop</span>
              <FaCaretDown />
            </div>
            <ul
              tabIndex="-1"
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
            >
              <li>
                <Link
                  to="/bases/th/18"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  TH 18 Pro Pack
                </Link>
              </li>
              <li>
                <Link
                  to="/bases/th/17"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  TH 17 Pro Pack
                </Link>
              </li>
              <li>
                <Link
                  to="/bases/th/16"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  TH 16 Pro Pack
                </Link>
              </li>
              <li>
                <Link
                  to="/bases/th/15"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  TH 15 Pro Pack
                </Link>
              </li>
              {isAuthenticated && user ? (
                <li>
                  <Link
                    to="custom-base"
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    Custom Base
                  </Link>
                </li>
              ) : (
                <li>
                  <div
                    to=""
                    onClick={() => {
                      Swal.fire({
                        title: "Log in first",
                        text: "Please log in to request a base",
                        icon: "warning",
                        customClass: {
                          popup: "my-swal-popup",
                          title: "my-swal-title",
                          htmlContainer: "my-swal-text",
                          confirmButton: "my-swal-button",
                        },
                      });
                      return;
                    }}
                  >
                    Custom Base
                  </div>
                </li>
              )}
            </ul>
          </div>

          {/* dollar */}
          <div className="dropdown dropdown-center">
            <div
              tabIndex={0}
              role="button"
              className="btn m-1 bg-transparent border-0 ml-1 lg:ml-3 btn-sm lg:btn-md"
            >
              <BsCurrencyDollar className="text-xl" />
            </div>
            <ul
              tabIndex="-1"
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm items-center"
            >
              <li>USD</li>
              <li>EUR</li>
              <li>CAD</li>
              <li>AUD</li>
              <li>SGD</li>
              <li>GBP</li>
            </ul>
          </div>
        </div>

        <div className="flex items-center">
          {/* cart */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle mx-1 lg:mx-2"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 lg:h-7 lg:w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">
                  {cartItems.length}
                </span>
              </div>
            </div>
            <div
              tabIndex={0}
              className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow"
            >
              <div className="card-body">
                <span className="text-lg font-bold">
                  {cartItems.length} Items
                </span>
                <span className="text-info">Subtotal: ${totalPrice}</span>
                <div className="card-actions">
                  <Link
                    to="/cart"
                    className="bg-amber-300 btn btn-block"
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    View Cart
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* user image */}

          {isAuthenticated && user?.image && (
            <div
              className="relative"
              onMouseEnter={() => setProfileHovered(true)}
              onMouseLeave={() => setProfileHovered(false)}
            >
              <Link
                to="/profile"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="User profile"
                    loading="lazy"
                    src={user?.image || defaultUser}
                  />
                </div>
              </Link>
              {profileHovered && (
                <ul className="absolute right-0 mt-2 w-62 bg-base-100 rounded-box shadow p-2 z-50">
                  <li className="p-2">
                    <span className="font-semibold">{user.FirstName}</span>
                  </li>
                  <li className="p-2 pt-0">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {user.email}
                    </span>
                  </li>
                </ul>
              )}
            </div>
          )}

          {/* login /logout user */}
          {isAuthenticated && user ? (
            <button
              onClick={logout}
              className="btn btn-neutral btn-outline ml-2 mr-0 btn-sm lg:btn-md lg:ml-5 lg:mr-3"
            >
              Log out
            </button>
          ) : (
            <Link
              to="/login"
              className="btn btn-neutral btn-outline ml-2 mr-0 btn-sm lg:btn-md lg:ml-5 lg:mr-3"
            >
              Log in
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
