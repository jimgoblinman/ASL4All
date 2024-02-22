// MainComponent.js

import React, { useState, useEffect } from 'react';
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
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          {/* Render your main content once loading is complete */}
          <h1>Main Content :)</h1>
        </div>
      )}
    </div>
  );
};

export default MainComponent;