import React from "react";
import { useCart } from "../context/CartContext";
import { BsCart3 } from "react-icons/bs";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cartItems, totalPrice, removeFromCart } = useCart();

  return (
    <div className="bg-[#201F31]">
      <div className="max-w-5xl mx-auto px-4 py-10 text-white">
        <h1 className="text-2xl font-semibold mb-6 flex gap-2">
          Your Cart
          <BsCart3 className="mt-2" />
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center">
            <p className="text-3xl mb:5 md:mb-10 lg:mb:12 text-white font-clash">
              Your cart is empty.
            </p>

            <Link
              to="/all-products"
              className="text-xl text-black  bg-amber-300   hover:bg-amber-400 rounded px-4 py-2.5"
            >
              {" "}
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg">
              <thead className="bg-[#2A4A6F]">
                <tr>
                  <th></th>
                  <th className="text-left px-4 py-3 font-medium">Base Name</th>
                  <th className="text-left px-4 py-3 font-medium">Price</th>
                  <th className="text-center px-4 py-3 font-medium">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {cartItems.map((item) => (
                  <tr key={item._id} className="hover:bg-[#2c3947]">
                    <img
                      src={item.productImage}
                      loading="lazy"
                      alt=""
                      className="w-20 h-14 object-cover rounded"
                    />
                    <td className="px-4 py-3 lg:text-lg md:text-lg text-sm">
                      {item.title}
                    </td>
                    <td className="px-4 py-3">${item.price}</td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Total */}
            <div className="flex justify-end mt-6">
              <div className="text-lg font-semibold">
                Total: <span className="text-green-600">${totalPrice}</span>
              </div>
            </div>
          </div>
        )}
        {/* payment policy */}
        <div className="bg-[#2A4A6F] rounded border border-gray-400 text-white text-center px-3.5 py-3 text-lg mt-12">
          <span>
            This shop uses currency conversion. Your order will be processed in
            USD($),even if the currently prices state otherwise.
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
