export class AppState {

    public Calculating?: boolean;

    public CurrentCalculator?: string;

    public Error?: any;

    public HomeValue?: number;

    public InterestRate?: any;

    public DownPayment?: number;

    public LoanAmount?: number;

    public LoanTerm?: number;

    public MonthlyPayment?: number;

    constructor() {
        this.Calculating = false;
        this.CurrentCalculator = '1';
        this.HomeValue= 0;
        this.InterestRate= "";
        this.DownPayment= 0;
        this.LoanAmount= 0;
        this.LoanTerm= 30;
        this.MonthlyPayment= 0.00;
      }

  }