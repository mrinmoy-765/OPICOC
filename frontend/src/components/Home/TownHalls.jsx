import React from "react";
import TownHall from "../../assets/TH18.png";

const TownHalls = () => {
  return (
    <div className="bg-[#1d1d1d] px-10">
      <h1 className="md:text-4xl lg:text-4xl font-clash text-white">
        Choose Base
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {/* th 1 */}
        <div className="card bg-[#1d1d1d] w-auto">
          <figure className="px-10 pt-10 bg-[#1d1d1d]">
            <img
              src={TownHall}
              alt="town hall"
              className="w-[286px] h-[286px]"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title font-clash text-white">Town Hall 18</h2>
          </div>
        </div>
        {/* th 2 */}
        <div className="card bg-[#1d1d1d] w-auto">
          <figure className="px-10 pt-10 bg-[#1d1d1d]">
            <img
              src={TownHall}
              alt="town hall"
              className="w-[286px] h-[286px]"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title font-clash text-white">Town Hall 18</h2>
          </div>
        </div>
        {/* th 3 */}
        <div className="card bg-[#1d1d1d] w-auto">
          <figure className="px-10 pt-10 bg-[#1d1d1d]">
            <img
              src={TownHall}
              alt="town hall"
              className="w-[286px] h-[286px]"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title font-clash text-white">Town Hall 18</h2>
          </div>
        </div>
        {/* th 4 */}
        <div className="card bg-[#1d1d1d] w-auto">
          <figure className="px-10 pt-10 bg-[#1d1d1d]">
            <img
              src={TownHall}
              alt="town hall"
              className="w-[286px] h-[286px]"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title font-clash text-white">Town Hall 18</h2>
          </div>
        </div>
      </div>
      {/* show all button */}
      <div className="w-full flex items-center justify-center lg:pt-7 lg:pb-14 pb-9">
        <button className="group w-full lg:w-1/6 md:w-2/6  bg-[#F5B400] py-3 text-black font-semibold rounded-lg hover:bg-yellow-600 transition ">
          <span className="inline-block group-hover:translate-x-2 transition duration-300 ease-in-out cursor-pointer">
            Show All
          </span>
        </button>
      </div>
    </div>
  );
};

export default TownHalls;
