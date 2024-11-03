import React from 'react';

export const exportToCSV = (data, filename) => {
  const headers = [
    'Month',
    'Monthly Payment',
    'Principal Payment',
    'Interest Payment',
    'Remaining Principal',
    'Total Interest'
  ];

  const csvContent = [
    headers.join(','),
    ...data.map(row => [
      row.month,
      row.monthlyPayment,
      row.principalPayment,
      row.interestPayment,
      row.remainingPrincipal,
      row.totalInterest
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const generatePDF = (data) => {
  // Implementation for PDF export can be added here
  // You might want to use libraries like jsPDF or pdfmake
};