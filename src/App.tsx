import React from 'react';
import './App.css';
import Game from './Game';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Game />
      </header>
    </div>
  );
};

export default App;
