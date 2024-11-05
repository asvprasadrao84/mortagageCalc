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
    customName: ''
  }]);
  
  const [calculationPeriod, setCalculationPeriod] = useState(12);
  const [results, setResults] = useState(null);
  const [currency, setCurrency] = useState('$');

  const calculateMonthlyRate = (annualRate) => {
    return (annualRate / 100) / 12;
  };

  const calculateEMI = (principal, annualRate, years) => {
    const monthlyRate = calculateMonthlyRate(annualRate);
    const totalMonths = years * 12;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
                (Math.pow(1 + monthlyRate, totalMonths) - 1);
    return emi;
  };

  const calculateAmortizationSchedule = (principal, annualRate, years, prepayments = [], months) => {
    const monthlyRate = calculateMonthlyRate(annualRate);
    let remainingPrincipal = principal;
    let totalInterest = 0;
    let totalPrincipal = 0;
    const schedule = [];
    const totalMonths = years * 12;

    // Sort prepayments by month
    /*const sortedPrepayments = [...prepayments]
      .filter(p => p.amount && p.month)
      .sort((a, b) => Number(a.month) - Number(b.month));
	  */
	 
	 const sortedPrepayments = Array.isArray(prepayments) ? 
     prepayments.filter(p => p.amount && p.month).sort((a, b) => Number(a.month) - Number(b.month)) : [];

    for (let month = 1; month <= totalMonths; month++) {
      const interestPayment = remainingPrincipal * monthlyRate;
      const emi = calculateEMI(remainingPrincipal, annualRate, years - ((month - 1) / 12));
      const principalPayment = emi - interestPayment;

      // Apply any prepayments for this month
      const prepayment = sortedPrepayments.find(p => Number(p.month) === month);
      const prepaymentAmount = prepayment ? Number(prepayment.amount) : 0;

      // Update remaining principal
      remainingPrincipal = Math.max(0, remainingPrincipal - principalPayment - prepaymentAmount);
      
      // Update totals
      totalInterest += interestPayment;
      totalPrincipal += principalPayment + prepaymentAmount;

      schedule.push({
        month,
        payment: emi,
        interestPayment,
        principalPayment,
        prepaymentAmount,
        remainingPrincipal,
        totalInterest,
        totalPrincipal
      });

      // Break if loan is fully paid
      if (remainingPrincipal === 0) break;
    }

    return {
      schedule,
      totalInterest,
      totalPrincipal,
      totalPayment: totalInterest + totalPrincipal,
      actualTermMonths: schedule.length
    };
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
      const principal = Number(loan.principalAmount);
      const annualRate = Number(loan.interestRate);
      const years = Number(loan.termYears);
      
      const emi = calculateEMI(principal, annualRate, years);
      const amortization = calculateAmortizationSchedule(
        principal,
        annualRate,
        years,
        loan.prepayments,
        calculationPeriod
      );

      // Calculate full term totals
      const fullTermAmortization = calculateAmortizationSchedule(
        principal,
        annualRate,
        years,
        loan.prepayments,
        years * 12
      );

      return {
        id: loan.id,
        customName: loan.customName,
        monthlyEMI: emi,
        totalInterest: fullTermAmortization.totalInterest,
        totalAmount: principal + fullTermAmortization.totalInterest,
        // Period-specific calculations
        periodInterestPaid: amortization.totalInterest,
        periodPrincipalPaid: amortization.totalPrincipal,
        periodTotalPaid: amortization.totalPayment,
        // Original loan details
        principalAmount: principal,
        interestRate: annualRate,
        termYears: years
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
      prepayments: [],
      customName: ''
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
        <label htmlFor="currency" className="block text-sm font-medium text-gray-700">
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
          <LoanSummary 
            results={results} 
            currency={currency} 
            calculationPeriod={calculationPeriod}
          />
          <AmortizationTable 
            results={results} 
            currency={currency}
          />
          <InvestmentGrowth 
            currency={currency}
          />
        </>
      )}
    </div>
  );
};

export default Calculator;