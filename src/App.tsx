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
    
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  //#endregion


  public render() {
    console.log("RENDER state: ", this.state);
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
            MonthlyPayment={this.state.MonthlyPayment}
            handleSubmitCalc={(state: AppState) =>this.handleSubmit(state)}
          />
        
      </div>
    );
  }
  // protected [data:any, setData:any] = useState(''): any;


  public handleSubmit = (event: AppState) => {
    // setData(event);
    console.log("data from child: ",event);
    this.setState({
      CurrentCalculator: event.CurrentCalculator,
      HomeValue: Number(event.HomeValue),
      DownPayment: Number(event.DownPayment),
      LoanAmount: Number(event.LoanAmount),
      InterestRate: Number(event.InterestRate),
      LoanTerm: Number(event.LoanTerm)
    },
    () => {
      console.log("State: ",this.state);
      this.calculate();
    });
  }

  protected calculate(): void {
    if (this.state.CurrentCalculator) {
      console.log("app url: ", this.appSvcUrl)
      const calcApi = `${this.appSvcUrl}/MortgageCalculatorStateEntity/${this.state.CurrentCalculator}`;
      console.log("calculating")
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
              console.log("result: ", result)
              this.loadState();

            }, 750);
          },
          (error) => {
            console.error("ERROR: ", error);
            this.setState({
              Error: error,
            });
          }
        );
    }
  }

  // protected loadCalculators(): void {
  //   const calcApi = `${this.appSvcUrl}/CalculatorsStateEntity`;

  //   fetch(calcApi)
  //     .then((res) => res.json())
  //     .then(
  //       (result) => {
  //         this.setState(
  //           {
  //             ...result.Model,
  //             Error: null,
  //           },
  //           () => {
  //             setTimeout(() => {
  //               this.loadState();
  //             }, 750);
  //           }
  //         );
  //       },
  //       (error) => {
  //         this.setState({
  //           Error: error,
  //         });
  //       }
  //     );
  // }

  protected loadState(): void {
    console.log("Load State")
    if (this.state.CurrentCalculator) {
      const calcApi = `${this.appSvcUrl}/MortgageCalculatorStateEntity/${this.state.CurrentCalculator}`;
      console.log("calcAPI = ", calcApi)
      fetch(calcApi)
        .then((res) => res.json())
        .then(
          (result) => {
            if (!result.Model) {
              this.calculate();
            } else {
              console.log("result in load state: ", result)
              this.setState(
                {
                  ...result.Model,
                  Error: null,
                },
                () => {
                  // console.log("State: ", this.state);
                  this.render();
                },
                
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
