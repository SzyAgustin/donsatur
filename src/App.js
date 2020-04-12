import React from 'react';
import logo from './logo.svg';
import './App.css';

import MainComp from './pages/main/main.component';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          <MainComp />
        </p>
      </header>
    </div>
  );
}

export default App;
