import React, { useState } from "react";
import review_img from "../../assets/review.png";
import p_photo from "../../assets/product_img.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import WriteReview from "./WriteReview";

const ReviewSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // responsive slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // default
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      // below 1024px -> 2 slides
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      // below 640px -> 1 slide
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const data = [
    {
      name: "Sarker",
      date: "11 October 2025",
      review: "@Opi | Pro @Adam | Pro  Base building Gods",
      user: "Legends Pro Program | Opi & Adam",
      user_image: review_img, // avatar
      photo: p_photo, // product photo
    },
    {
      name: "Hridoy",
      date: "03 March 2025",
      review: "Amazing base! Pushing made easy.",
      user: "Clash Pro",
      user_image: review_img,
      photo: p_photo,
    },
    {
      name: "Rayhan",
      date: "21 August 2025",
      review: "Best service! Highly recommended.",
      user: "Legends League",
      user_image: review_img,
      photo: p_photo,
    },
  ];

  return (
    <div className="bg-[#1d1d1d] py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-white font-clash text-4xl mb-8">Reviews</h1>

        {/* slider wrapper ensures responsive width */}
        <div className="w-full">
          <Slider {...settings}>
            {data.map((d, index) => (
              <div key={index} className="p-3">
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  {/* product image */}
                  <img
                    src={d.user_image}
                    alt="review product"
                    className="w-full h-48 sm:h-56 md:h-48 lg:h-56 object-cover"
                  />

                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="font-bold text-lg">{d.name}</h2>
                        <p className="text-gray-500 text-sm">{d.date}</p>
                      </div>
                    </div>

                    <p className="mt-3 text-gray-700">{d.review}</p>

                    {/* user info */}
                    <div className="flex items-center gap-3 mt-4">
                      <img
                        src={d.photo}
                        alt="user"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <span className="text-sm text-gray-600">{d.user}</span>
                    </div>

                    <div className="mt-4">
                      <button className="px-4 py-2 bg-[#F5B400] text-black font-medium rounded-md hover:bg-yellow-500 transition">
                        View Product
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* write a review button */}
        <div className="w-full flex items-center justify-center py-7">
          <button
            onClick={() => setIsModalOpen(true)}
            className="group w-full sm:w-1/3 md:w-1/4 lg:w-1/6 bg-white py-3 text-black font-semibold rounded-lg hover:bg-gray-200 transition"
          >
            <span className="inline-block group-hover:translate-x-2 transition duration-300 ease-in-out cursor-pointer">
              Write a Review
            </span>
          </button>
        </div>
      </div>

      {/* Modal (renders WriteReview inside) */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          onClick={() => setIsModalOpen(false)}
        >
          {/* stop propagation so clicks inside modal don't close it */}
          <div
            className="bg-white rounded-lg max-w-3xl w-full mx-4 sm:mx-6 p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
              aria-label="Close"
            >
              ✕
            </button>

            {/* Your WriteReview component will receive a prop to close the modal if needed */}
            <WriteReview onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewSection;
