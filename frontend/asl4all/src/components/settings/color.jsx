import React, { useState } from "react";
import { ChromePicker } from "react-color";

export default function ColorPicker() {
  const [textColor, setTextColor] = useState("#FFFFFF"); // Set initial text color here

  const handleChange = (newColor) => {
    setTextColor(newColor.hex);
    document.body.style.color = newColor.hex;
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-black/75 p-5 rounded-[0.7rem] bg-blur-md min-w-0 w-full max-w-md">
        <div className="flex justify-center max-w-full w-full">
          <ChromePicker color={textColor} onChange={handleChange} />
        </div>
      </div>
    </div>
  );
}
