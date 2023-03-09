import React from 'react';
import './App.css';
import PhotosList from './components/PhotosList/PhotosList';

const App = () => (
  <div className="App" data-testid="main-page">
    <PhotosList />
  </div>
);

export default App;
