import React, { useState } from "react";
import Product_Image from "../../../assets/product_Img_2.png";

const Card2 = () => {
  const [quantity, setQuantity] = useState(1);

  const increase = () => setQuantity(quantity + 1);
  const decrease = () => quantity > 1 && setQuantity(quantity - 1);

  return (
    <div className="bg-[#1d1d1d] w-full px-4 md:px-10 py-12">
      {/* Card Layout */}
      <div className="flex flex-col-reverse lg:flex-row gap-10 justify-center items-center">
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

          {/* Buttons */}
          <div className="space-y-4 mt-6">
            {/* Quantity Section */}
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center bg-white rounded-2xl px-7 py-2 gap-4">
                <button
                  onClick={decrease}
                  className="text-xl font-bold text-black"
                >
                  -
                </button>

                <span className="text-lg text-[#F5B400]">{quantity}</span>

                <button
                  onClick={increase}
                  className="text-xl font-bold text-black"
                >
                  +
                </button>
              </div>
            </div>
            <button className="w-full md:w-4/5 bg-[#F5B400] py-3 text-black font-semibold rounded-lg hover:bg-yellow-500 transition">
              Buy Now
            </button>

            <button className="w-full md:w-4/5 bg-[#F5B400] py-3 text-black font-semibold rounded-lg hover:bg-yellow-500 transition">
              Add To Cart
            </button>
          </div>
        </div>
        {/* Image */}
        <div className="shrink-0">
          <img
            src={Product_Image}
            alt=""
            className="w-full max-w-[400px] md:max-w-[500px] lg:max-w-[550px] rounded-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Card2;
