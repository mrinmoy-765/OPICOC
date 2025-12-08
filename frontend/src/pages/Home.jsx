import React from "react";
import Banner from "../components/Home/Banner";
import SingleHomeCards from "../components/Home/SingleHomeCards";
import MultipleCards from "../components/Home/MultipleCards";
import SecondBanner from "../components/Home/SecondBanner";
import TownHalls from "../components/Home/TownHalls";
import VideoSection from "../components/Home/VideoSection";
import InfoSection from "../components/Home/InfoSection";
import ReviewSection from "../components/Home/ReviewSection";

const Home = () => {
  return (
    <>
      <Banner></Banner>
      <SingleHomeCards></SingleHomeCards>
      <MultipleCards></MultipleCards>
      <SecondBanner></SecondBanner>
      <TownHalls></TownHalls>
      <VideoSection></VideoSection>
      <InfoSection></InfoSection>
      <ReviewSection></ReviewSection>
    </>
  );
};

export default Home;
