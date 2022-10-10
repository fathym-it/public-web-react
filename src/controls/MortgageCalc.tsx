import React from "react";

export class MortgageCalcForm extends React.Component<any, any> {
    constructor(props:any) {
      super(props);
      this.state = {
        homeValue: 0,
        interestRate: 3.5,
        downPayment: 0,
        loanAmount: 0,
        loanTerm: 30,
        monthlyPayment: 0
    };
  
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    MortgageSummary(props: any){
        return (
            <div>
                <h1>Mortgage Repayment Summary</h1>
                <h3>Total Monthly Payment:</h3>
                <p>{props.payment}</p>
            </div>
        );
    }

//  M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1].

// Here’s a breakdown of each of the variables:

// M = Total monthly payment
// P = The total amount of your loan
// I = Your interest rate, as a monthly percentage
// N = The total amount of months in your timeline for paying off your mortgage

    protected calcPayment(): string{
        let totalMonths = this.state.loanTerm * 12;
        let ir = (this.state.interestRate/12)/100;
        console.log("IR = ", ir);
        let numerator = ir * Math.pow(1+ir,totalMonths);
        let denominator = Math.pow(1+ir,totalMonths) - 1;
        let total = (this.state.loanAmount * (numerator / denominator)).toFixed(2);

        return total;

    }

    handleInputChange(event:any): void{
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });

        console.log("state = ", this.state)
    }
  
    

    

    handleSubmit(event:any) {
        let payment = this.calcPayment();
        this.setState({monthlyPayment: payment})
        event.preventDefault();
    }
  
    render() {
      return (
        <div>
        <form onSubmit={this.handleSubmit}>
            <label>
                Home Value:
                <input type="text" name="homeValue" value={this.state.homeValue} onChange={this.handleInputChange} />
            </label>

            <label>
            Down Payment:
            <input type="text" name="downPayment" value={this.state.downPayment} onChange={this.handleInputChange} />
            </label>

            <label>
            Loan Amount:
            <input type="text" name="loanAmount" value={this.state.loanAmount} onChange={this.handleInputChange} />
            </label>

            <label>
            Interest Rate:
            <input type="text" name="interestRate" value={this.state.interestRate} onChange={this.handleInputChange} />
            </label>

            <label>
            Loan Term:
            <input type="text" name="loanTerm" value={this.state.loanTerm} onChange={this.handleInputChange} />
            </label>
        
          <input type="submit" value="Submit" />
        </form>

        {/* <MortgageSummary payment={this.state.monthlyPayment} /> */}
        <div>
                <h1>Mortgage Repayment Summary</h1>
                <h3>Total Monthly Payment:</h3>
                <p>${this.state.monthlyPayment}</p>
            </div>

        </div>
        
      );
    }
  }