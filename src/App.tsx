import React, { useState } from 'react';
import bgImage from './images/mortgage_calculator_background.png';
import {AppState} from './models/AppState';
import './App.css';
import { MortgageCalcForm } from './controls/MortgageCalc';

class AppProperties {}

class CalculatorState {
  public Lookup!: string;

  public Name!: string;
}

export default class App extends React.Component<AppProperties, AppState> {

  //#region Fields
  protected appSvcUrl: string;

  // protected valueChangeDebounce: any;
  //#endregion

  //#region Properties
  //#endregion

  //#region Constructors
  constructor(props: AppProperties) {
    super(props);

    // this.dndOptions = {} as TouchBackendOptions;

    this.appSvcUrl = (window as any).LCU.State.APIRoot;

    this.state = {
      ...new AppState(),
    };
  }
  //#endregion


  public render() {
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

          <MortgageCalcForm 
            state={this.state} 
            handleSubmitCalc={(state: AppState) =>this.handleSubmit(state)}
          />
        
      </div>
    );
  }
  // protected [data:any, setData:any] = useState(''): any;


  public handleSubmit = (event: any) => {
    // setData(event);
    console.log("data from child: ",event);
    console.log("State: ", this.state);
  }

  protected calculate(): void {
    if (this.state.CurrentCalculator) {
      const calcApi = `${this.appSvcUrl}/MortgageCalculatorStateEntity/${this.state.CurrentCalculator}`;

      fetch(calcApi, {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            setTimeout(() => {
              this.loadState();
            }, 1000);
          },
          (error) => {
            this.setState({
              Error: error,
            });
          }
        );
    }
  }

  protected loadCalculators(): void {
    const calcApi = `${this.appSvcUrl}/CalculatorsStateEntity`;

    fetch(calcApi)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState(
            {
              ...result.Model,
              Error: null,
            },
            () => {
              setTimeout(() => {
                this.loadState();
              }, 750);
            }
          );
        },
        (error) => {
          this.setState({
            Error: error,
          });
        }
      );
  }

  protected loadState(): void {
    if (this.state.CurrentCalculator) {
      const calcApi = `${this.appSvcUrl}/MortgageCalculatorStateEntity/${this.state.CurrentCalculator}`;

      fetch(calcApi)
        .then((res) => res.json())
        .then(
          (result) => {
            if (!result.Model) {
              this.calculate();
            } else {
              this.setState(
                {
                  ...result.Model,
                  Error: null,
                },
                () => {
                  // console.log(this.state);
                }
              );
            }
          },
          (error) => {
            this.setState({
              Error: error,
            });
          }
        );
    }
  }
}

// export default App;
