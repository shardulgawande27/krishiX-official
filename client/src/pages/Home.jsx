import React from "react";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="w-full h-screen bg-[#1a1a1a] text-white flex justify-center items-center">
        <h2 className="text-3xl">Home</h2>
      </div>
    </>
  );
};

export default Home;
