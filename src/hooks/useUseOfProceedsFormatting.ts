
export const useUseOfProceedsFormatting = () => {
  // Format a value as currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  // Calculate totals for each column
  const calculateColumnTotal = (columnName: string, tableData: any, getCellValue: (rowName: string, columnName: string, tableData: any) => number) => {
    let total = 0;
    Object.keys(tableData).forEach(rowName => {
      if (rowName !== 'TOTAL') {
        total += getCellValue(rowName, columnName, tableData);
      }
    });
    return total;
  };

  return {
    formatCurrency,
    calculateColumnTotal
  };
};
