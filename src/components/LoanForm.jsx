import React from 'react';

export default function LoanForm() {
  const [loans, setLoans] = React.useState([{
    id: 1,
    principalAmount: '',
    interestRate: '',
    termYears: '',
    prepayments: []
  }]);
  
  const [calculationPeriod, setCalculationPeriod] = React.useState(12);

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

  return (
    <div className="space-y-6">
      {loans.map((loan, index) => (
        <div key={loan.id} className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-primary">
              Loan {index + 1}
            </h3>
            {loans.length > 1 && (
              <button
                onClick={() => removeLoan(loan.id)}
                className="text-red-500 hover:text-red-700"
              >
                <span className="sr-only">Remove loan</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Principal Amount
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  value={loan.principalAmount}
                  onChange={(e) => updateLoan(loan.id, 'principalAmount', e.target.value)}
                  className="focus:ring-primary focus:border-primary block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                  placeholder="0.00"
                  max="99999999"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Interest Rate (%)
              </label>
              <input
                type="number"
                value={loan.interestRate}
                onChange={(e) => updateLoan(loan.id, 'interestRate', e.target.value)}
                className="mt-1 focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="0.00"
                step="0.01"
                max="99.99"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Term (Years)
              </label>
              <input
                type="number"
                value={loan.termYears}
                onChange={(e) => updateLoan(loan.id, 'termYears', e.target.value)}
                className="mt-1 focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="30"
                max="99"
              />
            </div>
          </div>

          {/* Prepayments Section */}
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-gray-700">Prepayments</h4>
              <button
                type="button"
                onClick={() => addPrepayment(loan.id)}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-primary hover:text-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Add Prepayment
              </button>
            </div>
            
            {loan.prepayments.map((prepayment, pIndex) => (
              <div key={pIndex} className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Prepayment Amount
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      className="focus:ring-primary focus:border-primary block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    After Month
                  </label>
                  <input
                    type="number"
                    className="mt-1 focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="12"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={addLoan}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Add Another Loan
        </button>

        <div className="flex items-center space-x-4">
          <label className="block text-sm font-medium text-gray-700">
            Calculation Period (Months)
          </label>
          <input
            type="number"
            value={calculationPeriod}
            onChange={(e) => setCalculationPeriod(e.target.value)}
            className="mt-1 focus:ring-primary focus:border-primary block w-24 sm:text-sm border-gray-300 rounded-md"
            placeholder="12"
          />
        </div>
      </div>

      <div className="mt-6 text-center">
        <button
          type="button"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-accent hover:bg-accent-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
        >
          Calculate EMI
        </button>
      </div>
    </div>
  );
}