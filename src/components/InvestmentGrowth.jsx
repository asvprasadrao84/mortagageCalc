function App() {
  const [formData, setFormData] = React.useState({
    currentValue: '',
    inflationRate: '',
    years: '',
    propertyValue: '',
  });
  const [projectedValue, setProjectedValue] = React.useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateProjection = () => {
    const { currentValue, inflationRate, years } = formData;
    if (!currentValue || !inflationRate || !years) {
      alert('Please fill in all fields');
      return;
    }

    const futureValue = Number(currentValue) * Math.pow(1 + (Number(inflationRate) / 100), Number(years));
    setProjectedValue(futureValue);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="mt-8 bg-white rounded-lg shadow">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
          Investment Growth Calculator
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Current Property Value */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Current Property Value
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                name="currentValue"
                value={formData.currentValue}
                onChange={handleInputChange}
                className="focus:ring-primary focus:border-primary block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                placeholder="0"
              />
            </div>
          </div>

          {/* Inflation Rate */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Inflation Rate (%)
            </label>
            <input
              type="number"
              name="inflationRate"
              value={formData.inflationRate}
              onChange={handleInputChange}
              className="mt-1 focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="2.5"
              step="0.1"
            />
          </div>

          {/* Years */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Years
            </label>
            <input
              type="number"
              name="years"
              value={formData.years}
              onChange={handleInputChange}
              className="mt-1 focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="10"
            />
          </div>

          {/* Calculate Button */}
          <div className="flex items-end">
            <button
              onClick={calculateProjection}
              className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Calculate Projection
            </button>
          </div>
        </div>

        {/* Results */}
        {projectedValue !== null && (
          <div className="mt-6 bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Current Value</h4>
                <p className="mt-1 text-2xl font-semibold text-primary">
                  {formatCurrency(formData.currentValue)}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Projected Value</h4>
                <p className="mt-1 text-2xl font-semibold text-accent">
                  {formatCurrency(projectedValue)}
                </p>
              </div>
            </div>

            {/* Value Comparison */}
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-500 mb-2">Value Increase</h4>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-accent h-2.5 rounded-full" 
                  style={{ 
                    width: `${Math.min((projectedValue / formData.currentValue) * 100, 100)}%`
                  }}
                ></div>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Projected increase: {formatCurrency(projectedValue - formData.currentValue)} ({((projectedValue / formData.currentValue - 1) * 100).toFixed(1)}%)
              </p>
            </div>

            {/* Additional Information */}
            <div className="mt-4 text-sm text-gray-500">
              <p>
                Based on an inflation rate of {formData.inflationRate}% over {formData.years} years.
              </p>
              <p className="mt-2">
                Note: This is a simple projection and does not account for market variables, property improvements, or location-specific factors.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default InvestmentGrowth;