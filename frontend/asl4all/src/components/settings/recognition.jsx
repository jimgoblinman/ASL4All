import { useState } from 'react';

export default function Recognition() {
  const [slider, setSlider] = useState(0.25);

  /*
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--text-size',
      `${slider * 0.0836}rem`
    );
  }, [slider]);
  */

  return (
    <div className='flex justify-center items-center'>
      <div className='bg-black/75 p-5 rounded-[0.7rem] bg-blur-md min-w-0 w-full max-w-md'>
        <label>{`${slider}s `}</label>
        <div className='flex justify-center items-center max-w-full w-full'>
          <span>0.25s</span>
          <input
            type='range'
            min='0.25'
            max='1.5'
            step='0.25'
            value={slider}
            onChange={(e) => setSlider(parseFloat(e.target.value))}
            className='slider mx-2 py-0 w-full min-w-0'
          ></input>
          <span>1.5s</span>
        </div>
      </div>
    </div>
  );
}