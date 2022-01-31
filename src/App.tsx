import React from 'react';
import './App.css';
import Game from './Game';
import SwipeProvider from './SwipeControls/SwipeProvider';

const App: React.FC = () => {
  return (
    <div className="App">
      <SwipeProvider>
        <div className="App-header">
          <Game />
        </div>
      </SwipeProvider>
    </div>
  );
};

export default App;
