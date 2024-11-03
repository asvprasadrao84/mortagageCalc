function App() {
  const [calculationResults, setCalculationResults] = React.useState(null);
  
  const handleCalculation = (results) => {
    setCalculationResults(results);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Layout>
        <div className="space-y-8">
          <Calculator onCalculate={handleCalculation} />
          
          {calculationResults && (
            <>
              <LoanSummary results={calculationResults} />
              <AmortizationTable results={calculationResults} />
              <InvestmentGrowth />
            </>
          )}
        </div>
      </Layout>
    </div>
  );
}