import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import Spinner from "../Spinner";

const MultipleCards = () => {
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
    <div className="bg-[#1d1d1d] md:px-10 lg:px-12 px-5">
      {/* heading */}
      <div className="text-center text-white pb-8 lg:pb-18 pt-0 space-y-3.5">
        <p className="">Where strategy meets structure.</p>
        <h1 className="font-clash text-4xl">BUY BEST CLASH OF CLANS BASES</h1>
      </div>
      {/* card grid */}
      {/* card grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 content-center">
        {bases.slice(0, 4).map((base) => (
          <div key={base._id} className="card bg-base-100 shadow-sm">
            <figure className="bg-[#7a7979]">
              <img
                src={base.productImage}
                loading="lazy"
                alt={base.title}
                className="w-full h-[300px] object-cover"
              />
            </figure>

            <div className="card-body bg-[#1d1d1d]">
              <p className="text-white">⭐⭐⭐⭐⭐</p>

              <h2 className="card-title font-clash text-white">{base.title}</h2>

              <div className="flex justify-between items-center">
                <h4 className="text-white font-clash">${base.price} USD</h4>
                <span className="badge">{base?.badge}</span>
              </div>

              {/* Short description */}
              <p className="text-gray-300 text-sm line-clamp-3">
                {base.description}
              </p>

              {/* See more */}
              <label
                htmlFor={`modal-${base._id}`}
                className="text-[#F5B400] cursor-pointer text-sm hover:underline"
              >
                See more
              </label>

              <div className="card-actions justify-start mt-3">
                <button
                  onClick={() =>
                    addToCart({
                      _id: base._id,
                      title: base.title,
                      price: base.price,
                      productImage: base.productImage,
                    })
                  }
                  className="group w-full md:w-2/5 bg-[#F5B400] py-3 text-black font-semibold rounded-lg hover:bg-yellow-600 transition"
                >
                  <span className="inline-block group-hover:animate-bounce">
                    Add To Cart
                  </span>
                </button>
              </div>
            </div>

            {/* Modal */}
            <input
              type="checkbox"
              id={`modal-${base._id}`}
              className="modal-toggle"
            />
            <div className="modal">
              <div className="modal-box bg-[#1d1d1d] text-white max-w-2xl">
                <h3 className="font-clash text-xl mb-4">{base.title}</h3>
                <p className="text-gray-300">{base.description}</p>

                <div className="modal-action">
                  <label
                    htmlFor={`modal-${base._id}`}
                    className="btn bg-[#F5B400] text-black hover:bg-yellow-600"
                  >
                    Close
                  </label>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* show all button */}
      <div className="w-full flex items-center justify-center py-7">
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

export default MultipleCards;
