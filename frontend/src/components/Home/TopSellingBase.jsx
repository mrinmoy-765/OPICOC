import React, { useState, useEffect } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useCart } from "../../context/CartContext";
import Spinner from "../Spinner";
import { FaOpencart } from "react-icons/fa6";

const TopSellingBase = () => {
  const [bases, setBases] = useState([]);
  const [loading, setLoading] = useState(true);

  const AxiosPublic = useAxiosPublic();
  const { addToCart } = useCart();

  // Fetch bases ONCE
  useEffect(() => {
    const fetchBases = async () => {
      try {
        setLoading(true);
        const res = await AxiosPublic.get("/admin/get-bases");
        setBases(res.data.bases);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBases();
  }, [AxiosPublic]);

  if (loading) {
    <Spinner />;
  }

  return (
    <div className="bg-[#1d1d1d] mt-0 w-full px-4 md:px-10 py-12">
      {/* Heading */}
      <div className="text-center space-y-3 mb-10">
        <h5 className="text-xl text-white">Defend Like a Pro</h5>
        <h1 className="font-clash text-3xl md:text-4xl text-white">
          Your perfect base is waiting
        </h1>
      </div>
      {/* card layout 1 */}
      <div className="flex flex-col lg:flex-row gap-10 justify-around items-center mt-10 lg:mt-50">
        {/* Image */}
        <div className="hover-3d">
          {/* content */}
          <figure className="w-full max-w-[500px] md:max-w-[650px] lg:w-[700px] h-[300px] md:h-[500px] lg:h-[500px] rounded-lg ">
            <img
              src={bases[0]?.productImage}
              loading="lazy"
              alt="Tailwind CSS 3D card"
              className="w-full h-full object-cover"
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
            {bases[0]?.title}
          </h1>

          <h2 className="text-2xl">${bases[0]?.price}</h2>
          <p className="text-yellow-400">⭐⭐⭐⭐⭐</p>

          {bases[0]?.description}

          {/* Packs / Badges */}
          <div className="flex flex-wrap gap-3 mt-4">
            <div className="px-4 py-2 rounded-full bg-[#F5B400] text-black">
              <span>TownHall : {bases[0]?.townHall}</span>
            </div>
            <div className="px-4 py-2 rounded-full bg-gray-400 text-black">
              <span>Pack {bases[0]?.badge}</span>
            </div>
            <div className="px-4 py-2 rounded-full bg-gray-400 text-black">
              <span>MaxSell: {bases[0]?.maxSell}</span>
            </div>
          </div>
          <div className="card-actions  mt-8 lg:mt-11">
            <button
              onClick={() =>
                addToCart({
                  _id: bases[0]?._id,
                  title: bases[0]?.title,
                  price: bases[0]?.price,
                  productImage: bases[0]?.productImage,
                })
              }
              className="group w-full md:w-2/5 bg-[#F5B400] py-3 text-black font-semibold rounded-lg hover:bg-yellow-600 transition"
            >
              <span className="flex justify-center items-center gap-2 group-hover:animate-bounce">
                <FaOpencart className="text-2xl" />
                Add To Cart
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* card layout 2 */}
      <div className="flex flex-col-reverse lg:flex-row gap-10 justify-around items-center my-15 mt-10 lg:mt-50">
        {/* Text Content */}
        <div className="text-white max-w-xl space-y-4">
          <h1 className="text-3xl md:text-4xl font-clash leading-snug">
            {bases[1]?.title}
          </h1>

          <h2 className="text-2xl">${bases[1]?.price}</h2>
          <p className="text-yellow-400">⭐⭐⭐⭐⭐</p>

          {bases[1]?.description}

          {/* Packs / Badges */}
          <div className="flex flex-wrap gap-3 mt-4">
            <div className="px-4 py-2 rounded-full bg-[#F5B400] text-black">
              {bases[1]?.townHall}{" "}
            </div>
            <div className="px-4 py-2 rounded-full bg-gray-400 text-black">
              Pack {bases[1]?.badge}
            </div>
            <div className="px-4 py-2 rounded-full bg-gray-400 text-black">
              MaxSell {bases[1]?.maxSell}
            </div>
          </div>

          {/* Buttons */}
          <div className="card-actions  mt-8 lg:mt-11">
            <button
              onClick={() =>
                addToCart({
                  _id: bases[1]?._id,
                  title: bases[1]?.title,
                  price: bases[1]?.price,
                  productImage: bases[1]?.productImage,
                })
              }
              className="group w-full md:w-2/5 bg-[#F5B400] py-3 text-black font-semibold rounded-lg hover:bg-yellow-600 transition"
            >
              <span className="flex justify-center items-center gap-2 group-hover:animate-bounce">
                <FaOpencart className="text-2xl" />
                Add To Cart
              </span>
            </button>
          </div>
        </div>
        {/* Image */}
        <div className="hover-3d">
          {/* content */}
          <figure className="w-full max-w-[500px] md:max-w-[650px] lg:w-[700px] h-[300px] md:h-[500px] lg:h-[500px] rounded-lg ">
            <img
              src={bases[1]?.productImage}
              loading="lazy"
              alt="Tailwind CSS 3D card"
              className="w-full h-full object-cover"
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
      </div>
      {/* card layout-3 */}
      <div className="flex flex-col lg:flex-row gap-10 justify-around items-center mt-10 lg:mt-50">
        {/* Image */}
        <div className="hover-3d">
          {/* content */}
          <figure className="w-full max-w-[500px] md:max-w-[650px] lg:w-[700px] h-[300px] md:h-[500px] lg:h-[500px] rounded-lg ">
            <img
              src={bases[2]?.productImage}
              loading="lazy"
              alt="Tailwind CSS 3D card"
              className="w-full h-full object-cover"
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
            {bases[2]?.title}
          </h1>

          <h2 className="text-2xl">${bases[0]?.price}</h2>
          <p className="text-yellow-400">⭐⭐⭐⭐⭐</p>

          {bases[2]?.description}

          {/* Packs / Badges */}
          <div className="flex flex-wrap gap-3 mt-4">
            <div className="px-4 py-2 rounded-full bg-[#F5B400] text-black">
              <span> {bases[3]?.townHall}</span>
            </div>
            <div className="px-4 py-2 rounded-full bg-gray-400 text-black">
              <span>Pack {bases[2]?.badge}</span>
            </div>
            <div className="px-4 py-2 rounded-full bg-gray-400 text-black">
              <span>MaxSell: {bases[2]?.maxSell}</span>
            </div>
          </div>
          <div className="card-actions  mt-8 lg:mt-11">
            <button
              onClick={() =>
                addToCart({
                  _id: bases[2]?._id,
                  title: bases[2]?.title,
                  price: bases[2]?.price,
                  productImage: bases[2]?.productImage,
                })
              }
              className="group w-full md:w-2/5 bg-[#F5B400] py-3 text-black font-semibold rounded-lg hover:bg-yellow-600 transition"
            >
              <span className="flex justify-center items-center gap-2 group-hover:animate-bounce">
                <FaOpencart className="text-2xl" />
                Add To Cart
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSellingBase;
