import { css, SerializedStyles } from "@emotion/react";
import { Box, Button, Card, InputAdornment, TextField } from "@mui/material";
import React from "react";
import { AppState } from "../models/AppState";

class MortgageCalcProperties {
  public handleSubmitCalc?: (state: AppState) => void;

  public state?: AppState;
}

export class MortgageCalcForm extends React.Component<MortgageCalcProperties, AppState> {

    protected inputCss: SerializedStyles;

    constructor(props:any) {
      super(props);
      if(!this.props.state){
        // this.state = new AppState();
        this.state = {
          HomeValue: 0,
          InterestRate: 0,
          DownPayment: 0,
          LoanAmount: 0,
          LoanTerm: 30,
          MonthlyPayment: 0.00
      };
    }
    else {
      this.state = this.props.state;
    }

      this.inputCss = css`
      padding: 10px;
    `;
  
      this.handleInputChange = this.handleInputChange.bind(this);
      // this.handleSubmit = this.handleSubmit.bind(this);
    }

    // MortgageSummary(props: any){
    //     return (
    //       <>
    //         <div>
    //             <h3>Mortgage Repayment Summary</h3>
    //             <h4>Total Monthly Payment</h4>
    //             <p>{props.payment}</p>
    //         </div>
    //       </>
    //     );
    // }

    public render() {
      return (
        <Box sx={{ width: 450, display:'flex', alignItems: 'center', justifyContent:'center' }}>
            <Card variant="outlined" sx={{paddingTop: '20px', flex:1, justifyContent: 'center', width: 450, backgroundColor: 'rgba(255,255,255, 0.9)'}}>
                <h1>Mortgage Calculator</h1>
                <form onSubmit={this.handleSubmit} style={{flex: 1, flexDirection: "column", width: 450}}>
                    <div style={{padding: '10px'}}>
                        <TextField 
                            id="outlined-basic" 
                            label="Home Value" 
                            variant="outlined" 
                            name="HomeValue" 
                            value={this.convert2string(this.state.HomeValue)} 
                            onChange={this.handleInputChange} 
                            sx={{width: '300px'}}
                            InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    $
                                  </InputAdornment>
                                ),
                              }}
                        />
                    </div>

                    <div style={{padding: '10px'}}>
                        <TextField 
                            id="outlined-basic" 
                            label="Down Payment" 
                            variant="outlined" 
                            name="DownPayment" 
                            value={this.convert2string(this.state.DownPayment)} 
                            onChange={this.handleInputChange} 
                            sx={{width: '300px'}}
                            InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    $
                                  </InputAdornment>
                                ),
                              }}
                        />
                    </div>

                    <div style={{padding: '10px'}}>
                        <TextField 
                            id="outlined-basic" 
                            label="Loan Amount" 
                            variant="outlined" 
                            name="LoanAmount" 
                            value={this.convert2string(this.state.LoanAmount)} 
                            onChange={this.handleInputChange} 
                            sx={{width: '300px'}}
                            InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    $
                                  </InputAdornment>
                                ),
                              }}
                        />
                    </div>

                    <div style={{padding: '10px'}}>
                        <TextField 
                            id="outlined-basic" 
                            label="Interest Rate" 
                            variant="outlined" 
                            name="InterestRate" 
                            value={this.state.InterestRate} 
                            onChange={this.handleInputChange} 
                            sx={{width: '300px'}}
                            InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    %
                                  </InputAdornment>
                                ),
                              }}
                        />
                    </div>

                    <div style={{padding: '10px'}}>
                        <TextField 
                            id="outlined-basic" 
                            label="Loan Term" 
                            variant="outlined" 
                            name="LoanTerm" 
                            value={this.state.LoanTerm} 
                            onChange={this.handleInputChange} 
                            sx={{width: '300px'}}
                            InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    years
                                  </InputAdornment>
                                ),
                              }}
                        />
                    </div>
                
                    <Button type="submit" variant="contained">Calculate</Button>
                </form>

            {/* <MortgageSummary payment={this.state.monthlyPayment} /> */}
            <div>
                    <h3>Mortgage Repayment Summary</h3>
                    <h4>Total Monthly Payment</h4>
                    <h3>${this.state.MonthlyPayment}</h3>
            </div>
        </Card>

        </Box>
        
      );
    }

//HELPERS

//  M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1].
// M = Total monthly payment
// P = The total amount of your loan
// I = Your interest rate, as a monthly percentage
// N = The total amount of months in your timeline for paying off your mortgage

// protected calcPayment(): string{
//   let totalMonths = this.state.loanTerm * 12;
//   let ir = (this.state.interestRate/12)/100;
//   let numerator = ir * Math.pow(1+ir,totalMonths);
//   let denominator = Math.pow(1+ir,totalMonths) - 1;
//   let total = (this.state.loanAmount * (numerator / denominator)).toFixed(2);

//   return total;

// }

// protected calcLoanAmount(name: string){
//   if(name === "homeValue" || name === "downPayment"){
//     // let la = Number(this.props?.state?.HomeValue?.replace(/,/g,'')) - Number(this.props?.state?.DownPayment?.replace(/,/g,''));
//   if((this.state?.HomeValue >= 0) && (this.state?.DownPayment >= 0)){
//     let la = this.state?.HomeValue - this.state?.DownPayment;
//     // console.log("loan amount = ", la)
//     if(la >= 0){
//         this.setState({
//             LoanAmount: la
//         })
//     }
//   }
      
//   }
// }

protected convert2string(num: any): string{
  if(typeof num === "string"){
      num = num.replace(/,/g,'');
  }

  let n = Number(num).toLocaleString();
  // console.log("n: ",n);
  return n;
}

protected handleInputChange(event:any): void{
  const target = event.target;
  let value = target.type === 'checkbox' ? target.checked : target.value;
  const name = target.name;

  let regex= /^[0-9]+\.?[0-9]*$/;

  value = value.replace(/,/g,'');

  if(value.match(regex) || value === '' ){
      // console.log("it is a number!")

      this.setState({
          [name]: value
        }
        // ,() => {
        //     if(name === "homeValue" || name === "downPayment"){
        //         this.calcLoanAmount(name)
        //     }
        //   }
          );
  }
  else{
      // console.log("not a number!")

  }
  // console.log("state = ", this.state)
}

protected handleSubmit(event:any) {
  // let payment = this.calcPayment();
  // this.setState({monthlyPayment: payment})
  if(this.props.handleSubmitCalc){
    this.props.handleSubmitCalc(this.state)
  }
  event.preventDefault();
}


  }