import React from "react";
import Banner from "../components/Home/Banner";
import SingleHomeCards from "../components/Home/SingleHomeCards";
import MultipleCards from "../components/Home/MultipleCards";

const Home = () => {
  return (
    <>
      <Banner></Banner>
      <SingleHomeCards></SingleHomeCards>
      <MultipleCards></MultipleCards>
    </>
  );
};

export default Home;
