export default function App() {
  const [currentValue, setCurrentValue] = React.useState('');
  const [inflationRate, setInflationRate] = React.useState('');
  const [years, setYears] = React.useState('');
  const [projectedValue, setProjectedValue] = React.useState(null);

  const calculateProjection = () => {
    const futureValue = currentValue * Math.pow(1 + (inflationRate / 100), years);
    setProjectedValue(futureValue);
  };

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
          Investment Growth Calculator
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
                value={currentValue}
                onChange={(e) => setCurrentValue(e.target.value)}
                className="focus:ring-primary focus:border-primary block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Inflation Rate (%)
            </label>
            <input
              type="number"
              value={inflationRate}
              onChange={(e) => setInflationRate(e.target.value)}
              className="mt-1 focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="0.00"
              step="0.1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Years
            </label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              className="mt-1 focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="10"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={calculateProjection}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Calculate Projected Value
          </button>
        </div>

        {projectedValue !== null && (
          <div className="mt-6 bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Current Value</p>
                <p className="text-xl font-sem