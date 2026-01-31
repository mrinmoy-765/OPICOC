import React from "react";
import { Link } from "react-router-dom";

const TownHalls = () => {
  return (
    <div className="bg-[#1d1d1d] px-10">
      <h1 className="md:text-4xl lg:text-4xl font-clash text-white mb-3">
        Choose Base
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {/* th 1 */}
        <div className="card bg-[#1d1d1d] w-auto">
          <div className="hover-3d">
            {/* content */}
            <figure className="max-w-100 rounded-2xl">
              <img
                src="https://iili.io/fsYiZAB.webp"
                loading="lazy"
                alt="3D card"
                className="w-[286px] h-[286px]"
              />
            </figure>
            {/* 8 empty divs needed for the 3D effect */}
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="card-body items-center text-center">
            <h2 className="card-title font-clash text-white">Town Hall 18</h2>
          </div>
        </div>
        {/* th 2 */}
        <div className="card bg-[#1d1d1d] w-auto">
          <div className="hover-3d">
            {/* content */}
            <figure className="max-w-100 rounded-2xl">
              <img
                src="https://iili.io/fsYitwP.webp"
                loading="lazy"
                alt="3D card"
                className="w-[286px] h-[286px]"
              />
            </figure>

            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="card-body items-center text-center">
            <h2 className="card-title font-clash text-white">Town Hall 17</h2>
          </div>
        </div>
        {/* th 3 */}
        <div className="card bg-[#1d1d1d] w-auto">
          <div className="hover-3d">
            {/* content */}
            <figure className="max-w-100 rounded-2xl">
              <img
                src="https://iili.io/fsYsFAN.webp"
                loading="lazy"
                alt="3D card"
                className="w-[286px] h-[286px]"
              />
            </figure>

            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>

          <div className="card-body items-center text-center">
            <h2 className="card-title font-clash text-white">Town Hall 16</h2>
          </div>
        </div>
        {/* th 4 */}
        <div className="card bg-[#1d1d1d] w-auto">
          <div className="hover-3d">
            {/* content */}
            <figure className="max-w-100 rounded-2xl">
              <img
                src="https://iili.io/fsYWdzP.webp"
                loading="lazy"
                alt="3D card"
                className="w-[286px] h-[286px]"
              />
            </figure>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>

          <div className="card-body items-center text-center">
            <h2 className="card-title font-clash text-white">Town Hall 15</h2>
          </div>
        </div>
      </div>
      {/* show all button */}
      <div className="w-full flex items-center justify-center lg:pt-7 lg:pb-14 pb-9">
        <button className="group w-full lg:w-1/6 md:w-2/6  bg-[#F5B400] py-3 text-black font-semibold rounded-lg hover:bg-yellow-600 transition ">
          <Link
            to="/all-products"
            className="inline-block group-hover:translate-x-2 transition duration-300 ease-in-out cursor-pointer"
          >
            Show All
          </Link>
        </button>
      </div>
    </div>
  );
};

export default TownHalls;
