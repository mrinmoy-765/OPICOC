import React from "react";
import FooterImg from "../assets/footer_img_1.png";
import Skeleton from "../assets/Footer_img_2.png";
import { AiOutlineMail } from "react-icons/ai";
import { FaLongArrowAltRight } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import logo from "../assets/Legend.png";
import { AiOutlineYoutube, AiFillInstagram } from "react-icons/ai";
import { PiDiscordLogoLight } from "react-icons/pi";
import { BsTwitterX } from "react-icons/bs";
import { IoLogoFacebook } from "react-icons/io5";
import { FiTwitch } from "react-icons/fi";

const iconStyle =
  "lg:w-10 lg:h-10 md:w-8 md:h-8 w-7 h-7  lg:p-1.5 md:pd-2 p-1 text-white lg:border-2 border border-white rounded-full hover:bg-white hover:text-black transition";

const Footer = () => {
  return (
    <div
      className="relative  w-full h-auto bg-cover bg-center"
      style={{ backgroundImage: `url(${FooterImg})` }}
    >
      {/* <div className="absolute inset-0 bg-black/10"></div> */}
      <footer className="footer sm:footer-horizontal bg-transparent text-white p-10">
        <nav>
          <h1 className="lg:text-7xl md:text-5xl text-4xl font-clash">
            OPICOC
          </h1>
          <img
            src={Skeleton}
            alt=""
            className="h-[164px] lg:ml-15 ml-0 my-3.5"
          />
          <div className="flex gap-1">
            <AiOutlineMail className="text-3xl" />
            <span className="text-xl">Support@Opicoc.com</span>
          </div>
        </nav>
        <nav>
          <form>
            <h6 className="text-white font-bold text-3xl mb-2">Newsletter</h6>
            <fieldset className="w-80 md:w-64 flex items-center gap-3 border-b-2 border-b-white py-2">
              <MdEmail className="text-2xl text-white" />

              <input
                type="text"
                placeholder="username@site.com"
                className="flex-1 bg-transparent outline-none text-white placeholder-gray-400"
              />

              <button>
                <FaLongArrowAltRight className="text-white text-2xl" />
              </button>
            </fieldset>
          </form>
          <h1 className="text-2xl font-semibold text-white my-3.5">
            Stay updated
          </h1>
          <p className="text-sm">
            Subscribe to our newsletter for the latest updates and exclusive
            insights!
          </p>
          <p className="lg:mt-10 md:mt-5 mt-4 text-2xl md:text-lg md:font-semibold font-extrabold">
            “Opicoc - Expertly crafted Clash of Clans bases <br /> for
            unbeatable defense and strategy.”
          </p>
        </nav>
        <nav>
          <h6 className="text-white font-bold text-3xl mb-2">Overview</h6>
          <a className="link link-hover">Pricing</a>
          <a className="link link-hover">FAQs</a>
          <a className="link link-hover">Help</a>
          <a className="link link-hover">Home</a>
          <img
            src={logo}
            alt=""
            className="w-[70px] h-[70px] lg:mt-18 md:mt-12 mt:7 hidden lg:block md:block"
          />
        </nav>
      </footer>
      <footer className="footer bg-transparent text-white  px-10 py-4">
        <nav className="md:place-self-center md:justify-self-end">
          <div className="grid grid-flow-col gap-4">
            <AiOutlineYoutube className={iconStyle} />
            <PiDiscordLogoLight className={iconStyle} />
            <BsTwitterX className={iconStyle} />
            <IoLogoFacebook className={iconStyle} />
            <AiFillInstagram className={iconStyle} />
            <FiTwitch className={iconStyle} />
          </div>
        </nav>
      </footer>
      <div className="flex justify-between  text-white text-sm backdrop-blur-sm px-5 lg:py-6 md:py-5 py-3 border-base-300 border-t">
        <div>Terms & Conditions</div>
        <div>© 2025 Copyright by Opicoc</div>
        <div>Privacy Policy</div>
      </div>
    </div>
  );
};

export default Footer;
