import React from "react";
import Image1 from "../../assets/Product_img.png";

const MultipleCards = () => {
  return (
    <div className="bg-[#1d1d1d] md:px-10 lg:px-12 px-5">
      {/* heading */}
      <div className="text-center text-white pb-8 lg:pb-18 pt-0 space-y-3.5">
        <p className="">Where strategy meets structure.</p>
        <h1 className="font-clash text-4xl">BUY BEST CLASH OF CLANS BASES</h1>
      </div>
      {/* card grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 content-center">
        {/* card-1 */}
        <div className="card bg-base-100  shadow-sm">
          <figure className="bg-[#7a7979]">
            <img
              src={Image1}
              alt="image not found"
              className="w-[300px] h-[300px]"
            />
          </figure>
          <div className="card-body bg-[#1d1d1d]">
            <p className="text-white">⭐⭐⭐⭐⭐(44)</p>
            <h2 className="card-title font-clash text-white">
              TH18 Pushing Base Pack Limited
            </h2>
            <h4 className="text-white font-clash">$19.77 USD</h4>
            <div className="card-actions justify-start">
              <button className="group w-full md:w-2/5 bg-[#F5B400] py-3 text-black font-semibold rounded-lg hover:bg-yellow-600 transition">
                <span className="inline-block group-hover:animate-bounce">
                  Add To Cart
                </span>
              </button>
            </div>
          </div>
        </div>
        {/* card-2 */}
        <div className="card bg-base-100  shadow-sm">
          <figure className="bg-[#7a7979]">
            <img
              src={Image1}
              alt="image not found"
              className="w-[300px] h-[300px]"
            />
          </figure>
          <div className="card-body bg-[#1d1d1d]">
            <p className="text-white">⭐⭐⭐⭐⭐(44)</p>
            <h2 className="card-title font-clash text-white">
              TH18 Pushing Base Pack Limited
            </h2>
            <h4 className="text-white font-clash">$19.77 USD</h4>
            <div className="card-actions justify-start">
              <button className="group w-full md:w-2/5 bg-[#F5B400] py-3 text-black font-semibold rounded-lg hover:bg-yellow-600 transition">
                <span className="inline-block group-hover:animate-bounce">
                  Add To Cart
                </span>
              </button>
            </div>
          </div>
        </div>
        {/* card-3 */}
        <div className="card bg-base-100  shadow-sm">
          <figure className="bg-[#7a7979]">
            <img
              src={Image1}
              alt="image not found"
              className="w-[300px] h-[300px]"
            />
          </figure>
          <div className="card-body bg-[#1d1d1d]">
            <p className="text-white">⭐⭐⭐⭐⭐(44)</p>
            <h2 className="card-title font-clash text-white">
              TH18 Pushing Base Pack Limited
            </h2>
            <h4 className="text-white font-clash">$19.77 USD</h4>
            <div className="card-actions justify-start">
              <button className="group w-full md:w-2/5 bg-[#F5B400] py-3 text-black font-semibold rounded-lg hover:bg-yellow-600 transition">
                <span className="inline-block group-hover:animate-bounce">
                  Add To Cart
                </span>
              </button>
            </div>
          </div>
        </div>
        {/* card-4 */}
        <div className="card bg-base-100 shadow-sm">
          <figure className="bg-[#7a7979]">
            <img
              src={Image1}
              alt="image not found"
              className="w-[300px] h-[300px]"
            />
          </figure>
          <div className="card-body bg-[#1d1d1d]">
            <p className="text-white">⭐⭐⭐⭐⭐(44)</p>
            <h2 className="card-title font-clash text-white">
              TH18 Pushing Base Pack Limited
            </h2>
            <h4 className="text-white font-clash">$19.77 USD</h4>
            <div className="card-actions justify-start">
              <button className="group w-full md:w-2/5 bg-[#F5B400] py-3 text-black font-semibold rounded-lg hover:bg-yellow-600 transition">
                <span className="inline-block group-hover:animate-bounce">
                  Add To Cart
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* show all button */}
      <div className="w-full flex items-center justify-center py-7">
        <button className="group w-full lg:w-1/6 md:w-2/6  bg-[#F5B400] py-3 text-black font-semibold rounded-lg hover:bg-yellow-600 transition ">
          <span className="inline-block group-hover:translate-x-2 transition duration-300 ease-in-out cursor-pointer">
            Show All
          </span>
        </button>
      </div>
    </div>
  );
};

export default MultipleCards;
