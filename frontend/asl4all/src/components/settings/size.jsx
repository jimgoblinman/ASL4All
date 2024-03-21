import { useState, useEffect } from 'react';

export default function Size() {
  const [slider, setSlider] = useState(24);

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--text-size',
      `${slider * 0.0836}rem`
    );
  }, [slider]);

  return (
    <div className='flex justify-center items-center'>
      <div className='bg-black/75 p-5 rounded-[0.7rem] bg-blur-md min-w-0 w-full max-w-md'>
        <label>{`${slider}pt `}</label>
        <div className='flex justify-center items-center max-w-full w-full'>
          <span>12</span>
          <input
            type='range'
            min='12'
            max='48'
            value={slider}
            onChange={(e) => setSlider(e.target.value)}
            className='slider mx-2 py-0 w-full min-w-0'
          ></input>
          <span>48</span>
        </div>
      </div>
    </div>
  );
}
