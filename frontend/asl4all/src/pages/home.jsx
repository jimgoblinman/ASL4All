import React, { useState, useEffect } from 'react';
import { Menu } from '../components/components';
import styles from './home.module.css';
import Loading from '../components/loading.js';

const MainComponent = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data or perform any asynchronous operation here
    fetchData().then(() => setLoading(false));
  }, []);

  const fetchData = async () => {
    // Simulating data fetching with setTimeout
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulating a 2-second loading time
    // Once data is fetched, setLoading to false
  };

  return (
    <>
      <div className={styles.wrapper}>
        <Menu />
        <div className={styles.media}></div>
        <div className={styles.text_box}>
          <div>C</div>
          <p>AC</p>
          <p>Lets Go</p>
        </div>
      </div>
      <div className='z-10'>
        {loading ? (
          <Loading />
        ) : (
          <div>
            {/* Render your main content once loading is complete */}
            <video src="../assets/loading-video.mp4" controls></video>
          </div>
        )}
      </div>
    </>
  );
};

export default MainComponent;