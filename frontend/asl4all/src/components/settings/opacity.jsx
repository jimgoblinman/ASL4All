import { useState, useEffect } from "react";

export default function Opacity() {
  const [slider, setSlider] = useState(75);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--box-opacity",
      `${slider / 100}`
    );
  }, [slider]);

  return (
    <div className="flex justify-center items-center overflow-hidden">
      <div className="bg-black/75 p-5 rounded-[1rem] bg-blur-md min-w-0 w-full max-w-md">
        <label>{`${slider}% `}</label>
        (For the text box)
        <div className="flex justify-center items-center max-w-full w-full">
          <span>0</span>
          <input
            type="range"
            min="0"
            max="100"
            value={slider}
            onChange={(e) => setSlider(e.target.value)}
            className="slider mx-2 py-0 w-full min-w-0"
          ></input>
          <span>100</span>
        </div>
      </div>
    </div>
  );
}
