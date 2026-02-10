import React from "react";
import Banner from "../components/Home/Banner";
import MultipleCards from "../components/Home/MultipleCards";
import SecondBanner from "../components/Home/SecondBanner";
import TownHalls from "../components/Home/TownHalls";
import VideoSection from "../components/Home/VideoSection";
import OwnerBanner from "../components/Home/OwnerBanner";
import ReviewSection from "../components/Home/ReviewSection";
import TopSellingBase from "../components/Home/TopSellingBase";

const Home = () => {
  return (
    <>
      <Banner />
      <TopSellingBase />
      <MultipleCards />
      <SecondBanner />
      <TownHalls />
      <VideoSection />
      <OwnerBanner />
      <ReviewSection />
    </>
  );
};

export default Home;
