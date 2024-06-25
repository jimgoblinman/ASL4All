import React from "react";
import image from "../assets/loading_asl4all.gif";

const Loading = () => {
  return (
    <div
      data-testid="loading-screen"
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[#033850] bg-opacity-75 z-10"
    >
      <div className="flex flex-col items-center">
        <img className="w-full mb-4" src={image} />
        <h2 className="text-white text-center">Welcome to ASL4All</h2>
      </div>
    </div>
  );
};

export default Loading;
