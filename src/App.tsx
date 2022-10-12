import React from 'react';
import bgImage from './images/mortgage_calculator_background.png';
import './App.css';
import { MortgageCalcForm } from './controls/MortgageCalc';

function App() {
  return (
    <div 
      className="App" 
      style={{
          height: '100vh', 
          display:'flex', 
          alignItems: 'center', 
          justifyContent:'center', 
          backgroundImage: `url(${bgImage})`, 
          backgroundSize: '100%'
      }}>

        <MortgageCalcForm/>
      
    </div>
  );
}

export default App;
