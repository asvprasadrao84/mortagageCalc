import React from 'react';

const LoanSummary = ({ results, currency, calculationPeriod }) => {
  const formatCurrency = (amount) => {
    const currencyMap = {
      '$': 'USD',
      '€': 'EUR',
      '₹': 'INR',
      '¥': 'JPY'
    };

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyMap[currency],
      minimumFractionDigits: currency === '¥' ? 0 : 2,
      maximumFractionDigits: currency === '¥' ? 0 : 2
    }).format(amount);
  };

 if (!results || results.length === 0) return null;

  const totalMonthlyPayment = results.reduce((sum, loan) => sum + loan.monthlyEMI, 0);
  const totalInterest = results.reduce((sum, loan) => sum + loan.totalInterest, 0);
  const totalAmount = results.reduce((sum, loan) => sum + loan.totalAmount, 0);
  const totalPeriodInterest = results.reduce((sum, loan) => sum + (loan.periodInterestPaid || 0), 0);
  const totalPeriodPrincipal = results.reduce((sum, loan) => sum + (loan.periodPrincipalPaid || 0), 0);


 return (
    <div className="mt-8 bg-white rounded-lg shadow">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
          Loan Summary
        </h3>
        
        {/* Total Summary Card */}
        <div className="bg-primary text-white rounded-lg p-6 mb-6">
          <h4 className="text-lg font-semibold mb-4">Combined Totals</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-200">Total Monthly EMI</p>
              <p className="text-2xl font-bold">{formatCurrency(totalMonthlyPayment)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-200">Total Interest Paid</p>
              <p className="text-2xl font-bold">{formatCurrency(totalInterest)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-200">Total Amount</p>
              <p className="text-2xl font-bold">{formatCurrency(totalAmount)}</p>
            </div>
          </div>

          {/* Combined Period Totals */}
          <div className="mt-4 pt-3 border-t border-gray-200/30">
            <div className="grid grid-cols-3 gap-4 text-xs text-gray-200">
              <div>
                <p>Total Payment Made (in {calculationPeriod} months)</p>
                <p className="font-semibold mt-1">
                  {formatCurrency(totalPeriodInterest + totalPeriodPrincipal)}
                </p>
              </div>
              <div>
                <p>Total Interest Paid (in {calculationPeriod} months)</p>
                <p className="font-semibold mt-1">
                  {formatCurrency(totalPeriodInterest)}
                </p>
              </div>
              <div>
                <p>Total Principal Paid (in {calculationPeriod} months)</p>
                <p className="font-semibold mt-1">
                  {formatCurrency(totalPeriodPrincipal)}
                </p>
              </div>
            </div>
          </div>
        </div>
   {/* Individual Loan Cards */}
                  <p className="text-xl font-semibold text-primary">
                    {formatCurrency(loan.monthlyEMI)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Interest Paid</p>
                  <p className="text-xl font-semibold text-primary">
                    {formatCurrency(loan.totalInterest)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Principal Paid</p>
                  <p className="text-xl font-semibold text-primary">
                    {formatCurrency(loan.totalAmount - loan.totalInterest)}
                  </p>
                </div>
              </div>

              {/* Period Totals for Individual Loan */}
              <div className="mt-4 pt-3 border-t border-gray-100">
                <div className="grid grid-cols-3 gap-4 text-xs text-orange-500">
                  <div>
                    <p>Total Payment Made (in {calculationPeriod} months)</p>
                    <p className="font-semibold mt-1">
                      {formatCurrency((loan.periodInterestPaid || 0) + (loan.periodPrincipalPaid || 0))}
                    </p>
                  </div>
                  <div>
                    <p>Total Interest Paid (in {calculationPeriod} months)</p>
                    <p className="font-semibold mt-1">
                      {formatCurrency(loan.periodInterestPaid || 0)}
                    </p>
                  </div>
                  <div>
                    <p>Total Principal Paid (in {calculationPeriod} months)</p>
                    <p className="font-semibold mt-1">
                      {formatCurrency(loan.periodPrincipalPaid || 0)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Loan Term Reduction Info (if applicable) */}
              {loan.actualTermMonths && loan.actualTermMonths < (loan.termYears * 12) && (
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <p className="text-sm text-green-600">
                    Loan term reduced by {(loan.termYears * 12) - loan.actualTermMonths} months due to prepayments
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoanSummary;
