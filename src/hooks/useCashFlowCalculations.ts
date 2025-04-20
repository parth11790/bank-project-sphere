
import { useState } from 'react';

interface CashFlowData {
  [key: string]: number[];
}

export const useCashFlowCalculations = (initialData: CashFlowData) => {
  const [tableData, setTableData] = useState(initialData);

  const getDataSafely = (key: string, periodIndex: number): number => {
    if (!tableData[key] || !Array.isArray(tableData[key])) {
      return 0;
    }
    return tableData[key][periodIndex] || 0;
  };

  const calculateYearlyChange = (rowKey: string, periodIndex: number): number | null => {
    if (periodIndex === 0) return null;
    const currentValue = getDataSafely(rowKey, periodIndex);
    const previousValue = getDataSafely(rowKey, periodIndex - 1);
    
    if (previousValue === 0) return null;
    return ((currentValue - previousValue) / previousValue) * 100;
  };

  const handleValueChange = (rowKey: string, periodIndex: number, value: string) => {
    const numericValue = parseFloat(value.replace(/[^0-9.-]+/g, '')) || 0;
    setTableData(prev => ({
      ...prev,
      [rowKey]: prev[rowKey].map((val, idx) => idx === periodIndex ? numericValue : val)
    }));
  };

  return {
    tableData,
    getDataSafely,
    calculateYearlyChange,
    handleValueChange
  };
};
