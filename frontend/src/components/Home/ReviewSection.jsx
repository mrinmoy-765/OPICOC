import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import WriteReview from "./WriteReview";
import defaultDP from "../../assets/profile-icon.png";
import { useAuth } from "../../AuthProvider/AuthContext";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Spinner from "../Spinner";

const ReviewSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  const { isAuthenticated, user } = useAuth();
  const AxiosPublic = useAxiosPublic();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await AxiosPublic.get("/review/get-reviews");
        setReviews(res.data.reviews || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [AxiosPublic]);

  const handleReview = () => {
    if (isAuthenticated && user) {
      setIsModalOpen(true);
    } else {
      Swal.fire({
        title: "Log in first",
        text: "Please log in to write a review",
        icon: "warning",
      });
    }
  };

  // RESPONSIVE SETTINGS
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.5,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  if (loading) {
    return <Spinner />;
  }

  if (!mounted) return null;

  return (
    <div className="bg-[#1d1d1d] py-10">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <h1 className="text-white font-clash text-4xl mb-8">Reviews</h1>

        <div className="w-full overflow-hidden">
          <Slider {...settings}>
            {reviews.map((d) => (
              <div key={d._id} className="p-3">
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  {d.reviewImage && (
                    <img
                      src={d.reviewImage}
                      loading="lazy"
                      alt="review"
                      className="w-full h-48 object-cover"
                    />
                  )}

                  <div className="p-4">
                    <h2 className="font-bold text-lg text-black">
                      {d.FirstName} {d.LastName}
                    </h2>

                    <p className="text-gray-500 text-sm">
                      {new Date(d.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>

                    <p className="mt-3 text-gray-700">{d.review}</p>

                    <div className="flex items-center gap-3 mt-4">
                      <img
                        src={d?.userImage || defaultDP}
                        loading="lazy"
                        alt="user"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <span className="text-sm text-gray-600">{d.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        <div className="w-full flex items-center justify-center py-7">
          <button
            onClick={handleReview}
            className="group w-full sm:w-1/3 md:w-1/4 lg:w-1/6 bg-white py-3 text-black font-semibold rounded-lg hover:bg-gray-200 transition"
          >
            <span className="inline-block group-hover:translate-x-2 transition duration-300">
              Write a Review
            </span>
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg max-w-3xl w-full mx-4 sm:mx-6 p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
            >
              ✕
            </button>

            <WriteReview onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewSection;
