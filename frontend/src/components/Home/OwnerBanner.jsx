import React from "react";

const OwnerBanner = () => {
  return (
    <div className="bg-[#1d1d1d] py-14">
      <p className="text-white text-2xl text-center">
        The Best Clash of Clans Base Building.
      </p>
      <div className="flex gap-1.5 items-center justify-center">
        <img
          src="https://iili.io/f6mQgA7.png"
          loading="lazy"
          alt=""
          className="w-[50px] h-[50px]"
        />
        <h1 className="text-2xl md:text-4xl lg:text-4xl font-clash text-white mt-2">
          Opicoc CoC Info
        </h1>
        <img
          src="https://iili.io/f6mQgA7.png"
          loading="lazy"
          alt=""
          className="w-[50px] h-[50px]"
        />
      </div>
      <img
        src="https://iili.io/fsRZFdQ.jpg"
        loading="lazy"
        alt="image not found"
        className="object-contain mt-7 lg:mt-14 md:mt-10"
      />
    </div>
  );
};

export default OwnerBanner;
