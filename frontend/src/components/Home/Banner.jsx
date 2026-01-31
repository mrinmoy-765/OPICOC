import React from "react";
import { AiOutlineYoutube, AiFillInstagram } from "react-icons/ai";
import { PiDiscordLogoLight } from "react-icons/pi";
import { BsTwitterX } from "react-icons/bs";
import { IoLogoFacebook } from "react-icons/io5";
import { FiTwitch } from "react-icons/fi";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const iconStyle =
  "lg:w-10 lg:h-10 md:w-8 md:h-8 w-5 h-5 lg:p-1.5 md:p-2 p-1 text-white lg:border-2 border border-white rounded-full hover:bg-white hover:text-black transition";

const Banner = () => {
  const BannerImage = "https://iili.io/fsRQbm7.jpg";
  const BannerIMage2 = "https://iili.io/fsRZK7V.jpg";
  const BannerImage3 = "https://iili.io/fsRZchX.webp";

  const banners = [BannerImage, BannerIMage2, BannerImage3];

  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: false,
  };

  return (
    <div className="relative w-full">
      <Slider {...settings}>
        {banners.map((img, index) => (
          <div key={index}>
            <img
              src={img}
              loading="lazy"
              alt={`Banner ${index + 1}`}
              className="w-full h-auto object-cover"
            />
          </div>
        ))}
      </Slider>

      {/* Social Icons */}
      <div
        className="
          absolute 
          top-1/2 -translate-y-1/2 
          left-4 md:left-10 
          flex flex-col 
          space-y-3 md:space-y-7 lg:space-y-10 
          bg-black/20 backdrop-blur-md 
          rounded-full
          p-2
        "
      >
        <a
          href="https://www.youtube.com/@Opi333coc"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AiOutlineYoutube className={iconStyle} />
        </a>
        <a
          href="https://discord.gg/GfwZjJjUe"
          target="_blank"
          rel="noopener noreferrer"
        >
          <PiDiscordLogoLight className={iconStyle} />
        </a>
        <a
          href="https://x.com/OpOpib17?t=9NyAI1oSbQvxoPBbua2aCg&s=09"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BsTwitterX className={iconStyle} />
        </a>
        <a
          href="https://www.facebook.com/share/17TREB27rL/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IoLogoFacebook className={iconStyle} />
        </a>
        <a
          href="https://www.instagram.com/opi333coc/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AiFillInstagram className={iconStyle} />
        </a>
        <a
          href="https://m.twitch.tv/opi_333"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FiTwitch className={iconStyle} />
        </a>
      </div>
    </div>
  );
};

export default Banner;
