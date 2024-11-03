export const calculateEMI = (principal, annualRate, years) => {
  const monthlyRate = (annualRate / 100) / 12;
  const totalMonths = years * 12;
  
  const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths) / 
    (Math.pow(1 + monthlyRate, totalMonths) - 1);
    
  return emi;
};

export const calculateAmortizationSchedule = (principal, annualRate, years, prepayments = []) => {
  const monthlyRate = (annualRate / 100) / 12;
  const totalMonths = years * 12;
  let remainingPrincipal = principal;
  const schedule = [];
  let totalInterest = 0;
  
  const monthlyPayment = calculateEMI(principal, annualRate, years);

  for (let month = 1; month <= totalMonths; month++) {
    const interestPayment = remainingPrincipal * monthlyRate;
    let principalPayment = monthlyPayment - interestPayment;
    
    // Apply any prepayments for this month
    const prepayment = prepayments.find(p => p.month === month);
    if (prepayment) {
      principalPayment += Number(prepayment.amount);
    }

    remainingPrincipal -= principalPayment;
    totalInterest += interestPayment;

    schedule.push({
      month,
      monthlyPayment,
      principalPayment,
      interestPayment,
      remainingPrincipal: Math.max(0, remainingPrincipal),
      totalInterest
    });

    if (remainingPrincipal <= 0) break;
  }

  return schedule;
};

export const calculateLoanSummary = (loans, periodMonths) => {
  return loans.map(loan => {
    const schedule = calculateAmortizationSchedule(
      Number(loan.principalAmount),
      Number(loan.interestRate),
      Number(loan.termYears),
      loan.prepayments
    );

    const periodSchedule = schedule.slice(0, periodMonths);
    
    return {
      loanId: loan.id,
      monthlyEMI: schedule[0].monthlyPayment,
      totalInterest: schedule[schedule.length - 1].totalInterest,
      totalAmount: Number(loan.principalAmount) + schedule[schedule.length - 1].totalInterest,
      periodInterestPaid: periodSchedule.reduce((sum, month) => sum + month.interestPayment, 0),
      periodPrincipalPaid: periodSchedule.reduce((sum, month) => sum + month.principalPayment, 0),
      schedule
    };
  });
};

export const calculateInvestmentGrowth = (currentValue, inflationRate, years) => {
  const projectedValue = currentValue * Math.pow(1 + (inflationRate / 100), years);
  return projectedValue;
};