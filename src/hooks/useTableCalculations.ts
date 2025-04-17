
import { FormattedTableData } from './useTableData';

interface UseTableCalculationsProps {
  tableData: FormattedTableData;
  getCellValue: (rowName: string, columnName: string) => number;
}

export const useTableCalculations = ({
  tableData,
  getCellValue
}: UseTableCalculationsProps) => {
  // Calculate totals for a specific column
  const calculateColumnTotal = (columnName: string): number => {
    let total = 0;
    
    Object.keys(tableData).forEach(rowName => {
      if (rowName !== 'TOTAL') {
        total += getCellValue(rowName, columnName);
      }
    });
    
    return total;
  };
  
  // Calculate totals for a specific row
  const calculateRowTotal = (rowName: string, columnNames: string[]): number => {
    let total = 0;
    
    columnNames.forEach(columnName => {
      total += getCellValue(rowName, columnName);
    });
    
    return total;
  };
  
  // Calculate the percentage of each row relative to the column total
  const calculateRowPercentage = (rowName: string, columnName: string): number => {
    const cellValue = getCellValue(rowName, columnName);
    const columnTotal = calculateColumnTotal(columnName);
    
    if (columnTotal === 0) return 0;
    return (cellValue / columnTotal) * 100;
  };
  
  // Get all rows of a specific overall category
  const getRowsByCategory = (category: string): string[] => {
    return Object.entries(tableData)
      .filter(([_, rowData]) => rowData.overall_category === category)
      .map(([rowName]) => rowName);
  };
  
  // Calculate total for an overall category
  const calculateCategoryTotal = (category: string, columnName: string): number => {
    const categoryRows = getRowsByCategory(category);
    let total = 0;
    
    categoryRows.forEach(rowName => {
      total += getCellValue(rowName, columnName);
    });
    
    return total;
  };
  
  return {
    calculateColumnTotal,
    calculateRowTotal,
    calculateRowPercentage,
    getRowsByCategory,
    calculateCategoryTotal
  };
};
