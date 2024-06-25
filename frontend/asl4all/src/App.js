// App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home";
import Training from "./pages/training";
import SwipeComponent from "./components/swiper/swiper";

import SettingsProvider from "./components/settings/settingsContext.jsx";

export default function App() {
  return (
    <Router>
      <SwipeComponent />
      <SettingsProvider>
        <React.StrictMode>
          <Routes>
            <Route path="/ASL4All/" element={<Home />} />
            <Route path="/training" element={<Training />} />
            <Route path="/*" element={<Navigate to="/ASL4All/" />} />
          </Routes>
        </React.StrictMode>
      </SettingsProvider>
    </Router>
  );
}
