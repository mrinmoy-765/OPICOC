import React from "react";

const SecondBanner = () => {
  return (
    <div className="bg-[#1d1d1d] py-10">
      <h1 className="font-clash text-white text-center text-2xl md:text-4xl lg:text-4xl mb-5 lg:mb-10 ">
        The ultimate Clash of Clans showdown is here!
      </h1>
      <img
        src="https://iili.io/fsRZ7pI.jpg"
        loading="lazy"
        alt=""
        className="w-full h-auto object-contain"
      />
    </div>
  );
};

export default SecondBanner;
