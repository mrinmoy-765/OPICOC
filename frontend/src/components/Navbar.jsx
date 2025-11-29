import React from "react";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Legend from "../assets/Legend.png";
import { IoSearchOutline } from "react-icons/io5";
import { FaCaretDown } from "react-icons/fa";
import { BsCurrencyDollar } from "react-icons/bs";
import NavigationDrawer from "./Drawer";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

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
        <div className="flex items-center">
          <img src={Legend} alt="" className="w-[50px] h-[50px] lg:ml-7" />
          <p className="font-medium font-clash text-2xl text-white ml-1.5">
            Opicoc
          </p>
        </div>
      </div>

      {/* --- ROW 2: Search Bar --- */}
      <div className="w-full px-2 mt-3 lg:mt-0 lg:w-auto lg:px-0 lg:ml-5 flex justify-center">
        <div className="relative w-full lg:w-80">
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
                <a>Item 1</a>
              </li>
              <li>
                <a>Item 2</a>
              </li>
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
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Item 2</a>
              </li>
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
                <span className="badge badge-sm indicator-item">8</span>
              </div>
            </div>
            <div
              tabIndex={0}
              className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow"
            >
              <div className="card-body">
                <span className="text-lg font-bold">8 Items</span>
                <span className="text-info">Subtotal: $999</span>
                <div className="card-actions">
                  <button className="btn btn-primary btn-block">
                    View cart
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* login / user */}
          <button className="btn btn-neutral btn-outline ml-2 mr-0 btn-sm lg:btn-md lg:ml-5 lg:mr-3">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
