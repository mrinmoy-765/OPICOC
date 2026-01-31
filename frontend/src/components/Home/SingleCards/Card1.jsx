import React from "react";

const Card1 = () => {
  return (
    <div className="bg-[#1d1d1d] w-full px-4 md:px-10 py-12">
      {/* Heading */}
      <div className="text-center space-y-3 mb-10">
        <h5 className="text-xl text-white">Defend Like a Pro</h5>
        <h1 className="font-clash text-3xl md:text-4xl text-white">
          Your perfect base is waiting
        </h1>
      </div>

      {/* Card Layout */}
      <div className="flex flex-col lg:flex-row gap-10 justify-around items-center">
        {/* Image */}
        <div className="hover-3d">
          {/* content */}
          <figure className="w-full max-w-[400px] md:max-w-[500px] lg:max-w-[550px] rounded-lg object-cover">
            <img
              src="https://iili.io/fsRZ2rx.jpg"
              loading="lazy"
              alt="Tailwind CSS 3D card"
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

        {/* Text Content */}
        <div className="text-white max-w-xl space-y-4">
          <h1 className="text-3xl md:text-4xl font-clash leading-snug">
            TH18 Special Pushing Base Pack Limited Edition
          </h1>

          <h2 className="text-2xl">$15</h2>
          <p className="text-yellow-400">⭐⭐⭐⭐⭐</p>

          {/* Packs / Badges */}
          <div className="flex flex-wrap gap-3 mt-4">
            <div className="px-4 py-2 rounded-full bg-[#F5B400] text-black">
              Pack 1 x5
            </div>
            <div className="px-4 py-2 rounded-full bg-gray-400 text-black">
              Pack 2 x5
            </div>
            <div className="px-4 py-2 rounded-full bg-gray-400 text-black">
              Pack 1 & 2 x10 - 20% Off
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card1;
