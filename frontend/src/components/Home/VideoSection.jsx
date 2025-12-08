import React from "react";
import MyVideo from "../../assets/video.mp4";

const VideoSection = () => {
  return (
    <div className="flex lg:flex-row md:flex-row flex-col bg-[#1d1d1d]">
      {/* Video container */}
      <div className="w-full lg:w-1/2 md:w-1/2">
        <video
          src={MyVideo}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        ></video>
      </div>

      {/* Content container */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 md:w-1/2 p-6">
        <div className="w-full flex items-center justify-center py-7">
          <button className="group w-full lg:w-5/6 md:w-5/6 bg-[#D91A1A] py-3 text-white font-semibold rounded-lg hover:bg-red-500 transition">
            <span className="inline-block group-hover:translate-x-2 transition duration-300 ease-in-out cursor-pointer">
              Subscribe
            </span>
          </button>
        </div>

        <h1 className="text-white font-clash text-2xl lg:text-4xl lg:my-3 my-1.5">
          TOP CLASH CONTENT
        </h1>

        <p className="text-white text-xl text-center">
          Free Bases Weekly, Don't Miss Anything!
        </p>
      </div>
    </div>
  );
};

export default VideoSection;
