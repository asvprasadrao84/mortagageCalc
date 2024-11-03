function App() {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

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
              <p className="text-sm text-gray-200">Total Monthly Payment</p>
              <p className="text-2xl font-bold">{formatCurrency(4500)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-200">Total Interest</p>
              <p className="text-2xl font-bold">{formatCurrency(150000)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-200">Total Amount</p>
              <p className="text-2xl font-bold">{formatCurrency(450000)}</p>
            </div>
          </div>
        </div>

        {/* Individual Loan Cards */}
        <div className="space-y-4">
          {[1, 2].map((loanIndex) => (
            <div key={loanIndex} className="border rounded-lg p-4">
              <h4 className="text-lg font-medium text-gray-900 mb-3">
                Loan {loanIndex}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Monthly EMI</p>
                  <p className="text-xl font-semibold text-primary">
                    {formatCurrency(2250)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Interest Paid</p>
                  <p className="text-xl font-semibold text-primary">
                    {formatCurrency(75000)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Principal Paid</p>
                  <p className="text-xl font-semibold text-primary">
                    {formatCurrency(150000)}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-500 mb-1">
                  <span>Payment Progress</span>
                  <span>45%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-accent h-2.5 rounded-full" 
                    style={{ width: '45%' }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}