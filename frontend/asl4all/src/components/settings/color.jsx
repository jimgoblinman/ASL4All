import React, { useState } from 'react';
import { ChromePicker } from 'react-color';

export default function ColorPicker() {
  const [textColor, setTextColor] = useState('#000000'); // Set initial text color here

  const handleChange = (newColor) => {
    setTextColor(newColor.hex);
    document.body.style.color = newColor.hex;
  };

  return (
    <div className='flex justify-center items-center'>
      <ChromePicker color={textColor} onChange={handleChange} />
    </div>
  );
}