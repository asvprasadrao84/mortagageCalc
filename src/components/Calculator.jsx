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
    prepayments: []
  }]);
  
  const [calculationPeriod, setCalculationPeriod] = useState(12);
  const [results, setResults] = useState(null);
  const [currency, setCurrency] = useState('$');

  const calculateEMI = (principal, annualRate, years) => {
    const monthlyRate = (annualRate / 100) / 12;
    const totalMonths = years * 12;
    const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths) / 
      (Math.pow(1 + monthlyRate, totalMonths) - 1);
    return emi;
  };

  const handleCalculate = () => {
    // Validate inputs
    for (const loan of loans) {
      if (!loan.principalAmount || !loan.interestRate || !loan.termYears) {
        alert('Please fill in all required fields for each loan');
        return;
      }
    }

    const calculatedResults = loans.map(loan => {
      const emi = calculateEMI(
        Number(loan.principalAmount),
        Number(loan.interestRate),
        Number(loan.termYears)
      );
      const totalAmount = emi * (loan.termYears * 12);
      const totalInterest = totalAmount - loan.principalAmount;
      
      return {
        id: loan.id,
        monthlyEMI: emi,
        totalInterest,
        totalAmount,
        principalAmount: Number(loan.principalAmount),
        periodPrincipalPaid: (emi * calculationPeriod) - 
          (calculateEMI(loan.principalAmount, loan.interestRate, loan.termYears) * calculationPeriod * 
          (loan.termYears * 12 - calculationPeriod) / (loan.termYears * 12))
      };
    });
    
    setResults(calculatedResults);
  };

  const addLoan = () => {
    setLoans([...loans, {
      id: loans.length + 1,
      principalAmount: '',
      interestRate: '',
      termYears: '',
      prepayments: []
    }]);
  };

  const removeLoan = (id) => {
    if (loans.length > 1) {
      setLoans(loans.filter(loan => loan.id !== id));
    }
  };

  const updateLoan = (id, field, value) => {
    setLoans(loans.map(loan => 
      loan.id === id ? { ...loan, [field]: value } : loan
    ));
  };

  const addPrepayment = (loanId) => {
    setLoans(loans.map(loan => {
      if (loan.id === loanId) {
        return {
          ...loan,
          prepayments: [...loan.prepayments, { amount: '', month: '' }]
        };
      }
      return loan;
    }));
  };

  const removePrepayment = (loanId, prepaymentIndex) => {
    setLoans(loans.map(loan => {
      if (loan.id === loanId) {
        const updatedPrepayments = loan.prepayments.filter((_, index) => index !== prepaymentIndex);
        return { ...loan, prepayments: updatedPrepayments };
      }
      return loan;
    }));
  };

  const updatePrepayment = (loanId, prepaymentIndex, field, value) => {
    setLoans(loans.map(loan => {
      if (loan.id === loanId) {
        const updatedPrepayments = loan.prepayments.map((prepayment, index) => {
          if (index === prepaymentIndex) {
            return { ...prepayment, [field]: value };
          }
          return prepayment;
        });
        return { ...loan, prepayments: updatedPrepayments };
      }
      return loan;
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Currency Selector */}
      <div className="mb-6">
        <label htmlFor="currency" className="block text-sm font-medium text-gray-700 px-2">
          Select Currency:
        </label>
        <select
          id="currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
        >
          <option value="$">USD ($)</option>
          <option value="€">Euro (€)</option>
          <option value="₹">INR (₹)</option>
          <option value="¥">Yen (¥)</option>
        </select>
      </div>

      <LoanForm 
        loans={loans}
        onAddLoan={addLoan}
        onRemoveLoan={removeLoan}
        onUpdateLoan={updateLoan}
        onAddPrepayment={addPrepayment}
        onRemovePrepayment={removePrepayment}
        onUpdatePrepayment={updatePrepayment}
        calculationPeriod={calculationPeriod}
        setCalculationPeriod={setCalculationPeriod}
        onCalculate={handleCalculate}
        currency={currency}
      />

      {results && (
        <>
          <LoanSummary results={results} currency={currency} />
          <AmortizationTable results={results} currency={currency} />
          <InvestmentGrowth currency={currency} />
        </>
      )}
    </div>
  );
};

export default Calculator;