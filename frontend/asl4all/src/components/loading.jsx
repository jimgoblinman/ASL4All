import React from "react";
import image from "../assets/dcpbm9q-c397b862-73c0-459b-9bdb-63c8c8228ca3.gif";

const Loading = () => {
  return (
    <div
      data-testid="loading-screen"
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-10"
    >
      <div className="flex flex-col items-center">
        <img className="w-full mb-4" src={image} />
        <h2 className="text-white">Thanks Greg for Donating</h2>
      </div>
    </div>
  );
};

export default Loading;
