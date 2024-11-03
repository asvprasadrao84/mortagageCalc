import React, { useState } from 'react';
import LoanForm from './LoanForm';
import LoanSummary from './LoanSummary';
import AmortizationTable from './AmortizationTable';
import InvestmentGrowth from './InvestmentGrowth';

const Calculator = () => {
  const [loans, setLoans] = useState([{
    id: 1,
    principalAmount: '',
    interestRate: '',
    termYears: '',
    prepayments: [],
  }]);
  
  const [calculationPeriod, setCalculationPeriod] = useState(12); // Default 12 months
  const [results, setResults] = useState(null);

  const handleCalculate = () => {
    // Calculation logic will be implemented here
    const calculatedResults = calculateLoanDetails(loans, calculationPeriod);
    setResults(calculatedResults);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-primary mb-8 text-center">
          Mortgage Calculator
        </h1>
        
        <LoanForm 
          loans={loans}
          setLoans={setLoans}
          calculationPeriod={calculationPeriod}
          setCalculationPeriod={setCalculationPeriod}
          onCalculate={handleCalculate}
        />

        {results && (
          <>
            <LoanSummary results={results} />
            <AmortizationTable results={results} />
            <InvestmentGrowth />
          </>
        )}
      </div>
    </div>
  );
};

export default Calculator;