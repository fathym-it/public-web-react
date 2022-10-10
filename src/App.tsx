import React from 'react';
import logo from './logo.svg';

// import MortgageCalcForm from './controls/MortgageCalc';
import './App.css';
import { MortgageCalcForm } from './controls/MortgageCalc';

function App() {
  return (
    <div className="App">
      {
      
      /* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */

      <MortgageCalcForm/>
      }
    </div>
  );
}

export default App;
