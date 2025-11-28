import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Legend from "../assets/Legend.png";
import { IoSearchOutline } from "react-icons/io5";
import { FaCaretDown } from "react-icons/fa";
import { BsCurrencyDollar } from "react-icons/bs";

const Navbar = () => {
  return (
    <div className="navbar bg-[#F5B400] shadow-sm">
      <div className="navbar-start">
        <GiHamburgerMenu className="text-3xl ml-3" />
        <img src={Legend} alt="" className="w-[50px] h-[50px] ml-7" />
        <p className="font-medium font-clash text-2xl text-white ml-1.5">
          Opicoc
        </p>
        {/* search bar */}
        <div className="relative w-80 ml-5">
          <input
            type="text"
            placeholder="Search here"
            className="input input-bordered  rounded-xl pr-10"
          />
          <IoSearchOutline className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
        </div>
      </div>
      <div className="navbar-end">
        {/* shop */}
        <div className="dropdown dropdown-bottom dropdown-center">
          <div
            tabIndex={0}
            role="button"
            className="btn m-1 bg-transparent border-black"
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
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn m-1 bg-transparent border-0 ml-3"
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
        {/* cart */}
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle mx-2"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />{" "}
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
          <button className="btn btn-neutral btn-outline ml-5 mr-3">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
