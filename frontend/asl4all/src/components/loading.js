// Loading.js

import React from 'react';

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-10">
      <div className="flex flex-col items-center">
        <video
          className="w-32 h-32 mb-4"
          autoPlay
          loop
          muted
          playsInline
          src="../assets/loading-video.mp4"
        />
        <h2 className="text-white">Loading...</h2>
      </div>
    </div>
  );
};

export default Loading;
