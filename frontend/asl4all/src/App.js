// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home';
import Feedback from './pages/feedback';
import Training from './pages/training';
import SwipeComponent from './components/swiper/swiper';

import SettingsProvider from './components/settings/main/settingsContext.jsx'

export default function App() {
  return (
    <Router>
      <SwipeComponent />
      <SettingsProvider>
        <React.StrictMode>
        <Routes>
          <Route path='/asl4all' element={<Home />} />
          <Route path='/training' element={<Training />} />
          <Route path='/feedback' element={<Feedback />} />
          <Route path='/*' element={<Navigate to='/asl4all/' />} />
        </Routes>
      </React.StrictMode>
      </SettingsProvider>
    </Router>
  );
}