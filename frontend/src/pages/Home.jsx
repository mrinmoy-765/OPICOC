import React from "react";
import Banner from "../components/Home/Banner";
import SingleHomeCards from "../components/Home/SingleHomeCards";
import MultipleCards from "../components/Home/MultipleCards";
import SecondBanner from "../components/Home/SecondBanner";

const Home = () => {
  return (
    <>
      <Banner></Banner>
      <SingleHomeCards></SingleHomeCards>
      <MultipleCards></MultipleCards>
      <SecondBanner></SecondBanner>
    </>
  );
};

export default Home;
