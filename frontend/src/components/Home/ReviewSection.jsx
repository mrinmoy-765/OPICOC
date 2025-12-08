import React from "react";
import review_img from "../../assets/review.png";
import p_photo from "../../assets/product_img.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ReviewSection = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,

    // --- Responsive breakpoints ---
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  const data = [
    {
      name: "Sarker",
      date: "11 October 2025",
      review: "@Opi | Pro @Adam | Pro  Base building Gods",
      user: "Legends Pro Program | Opi & Adam",
      user_image: review_img,
      photo: p_photo,
    },
    // Duplicate or add more objects to test scrolling
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
    {
      name: "Rayhan",
      date: "21 August 2025",
      review: "Best service! Highly recommended.",
      user: "Legends League",
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
    <div className="bg-[#1d1d1d] py-10 px-10">
      <h1 className="text-white font-clash text-4xl mb-8">Reviews</h1>

      <Slider {...settings}>
        {data.map((d, index) => (
          <div key={index} className="p-3">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {/* product image */}
              <img
                src={d.user_image}
                alt="review product"
                className="w-full h-48 object-cover"
              />

              <div className="p-4">
                <h2 className="font-bold text-lg">{d.name}</h2>
                <p className="text-gray-500 text-sm">{d.date}</p>

                <p className="mt-2 text-gray-700">{d.review}</p>

                {/* user info */}
                <div className="flex items-center gap-3 mt-4">
                  <img
                    src={d.photo}
                    alt="user"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="text-sm text-gray-600">{d.user}</span>
                </div>
                <div className="card-actions mt-3.5">
                  <button className="btn  bg-[#F5B400]">View Product</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* write a review button */}
      <div className="w-full flex items-center justify-center py-7">
        <button className="group w-full lg:w-1/6 md:w-2/6  bg-white py-3 text-black font-semibold rounded-lg hover:bg-gray-200 transition ">
          <span className="inline-block group-hover:translate-x-2 transition duration-300 ease-in-out cursor-pointer">
            Write a Review
          </span>
        </button>
      </div>
    </div>
  );
};

export default ReviewSection;
