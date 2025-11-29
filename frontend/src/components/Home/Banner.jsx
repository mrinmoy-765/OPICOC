import React from "react";
import BannerImage from "../../assets/Hero_Banner.png";
import { AiOutlineYoutube, AiFillInstagram } from "react-icons/ai";
import { PiDiscordLogoLight } from "react-icons/pi";
import { BsTwitterX } from "react-icons/bs";
import { IoLogoFacebook } from "react-icons/io5";
import { FiTwitch } from "react-icons/fi";

const iconStyle =
  "lg:w-10 lg:h-10 md:w-8 md:h-8 w-5 h-5  lg:p-1.5 md:pd-2 p-1 text-white lg:border-2 border border-white rounded-full hover:bg-white hover:text-black transition";

const Banner = () => {
  return (
    <div className="relative w-full">
      {/* Background Image */}
      <img src={BannerImage} alt="" className="w-full h-auto object-cover" />

      {/* Social Icons — vertically centered */}
      <div
        className="
          absolute 
          top-1/2 -translate-y-1/2 
          left-4 md:left-10 
          flex flex-col 
          space-y-3
          md:space-y-7
          lg:space-y-10 
          bg-black/20 backdrop-blur-md 
          rounded-full
        "
      >
        {/* All icons styled same as first one */}
        <AiOutlineYoutube className={iconStyle} />
        <PiDiscordLogoLight className={iconStyle} />
        <BsTwitterX className={iconStyle} />
        <IoLogoFacebook className={iconStyle} />
        <AiFillInstagram className={iconStyle} />
        <FiTwitch className={iconStyle} />
      </div>
    </div>
  );
};

export default Banner;
