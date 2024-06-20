import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SwipeComponent from './swiper.js';
import TrainingPage from '../../pages/training.jsx';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={SwipeComponent} />
        <Route path='/Training' component={TrainingPage} />
        <Route path='/Training' component={TrainingPage} />
      </Switch>
    </Router>
  );
}

export default App;