import React from 'react';
          </div>
        </div>

        {/* Individual Loan Cards */}
        <div className="space-y-4">
          {results.map((loan, index) => (
            <div key={loan.id} className="border rounded-lg p-4">
              <h4 className="text-lg font-medium text-gray-900 mb-3">
                {loan.customName || `Loan ${index + 1}`}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Monthly EMI</p>
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
