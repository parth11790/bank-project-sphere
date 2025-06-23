
import { useState, useEffect } from 'react';
import { UseOfProceedsColumn } from '@/components/useOfProceeds/EnhancedUseOfProceedsTable';
import { useLoanCalculator } from '@/hooks/useLoanCalculator';

interface UseUseOfProceedsColumnsProps {
  initialColumns: UseOfProceedsColumn[];
  tableData: { [key: string]: { [key: string]: any } };
}

export const useUseOfProceedsColumns = ({
  initialColumns,
  tableData
}: UseUseOfProceedsColumnsProps) => {
  const [columns, setColumns] = useState<UseOfProceedsColumn[]>(initialColumns);
  const { calculateLoanPayment } = useLoanCalculator();

  // Calculate loan payments whenever columns change
  useEffect(() => {
    // Create a copy to avoid direct mutation
    const updatedColumns = [...columns];
    let hasChanges = false;

    columns.forEach((column, index) => {
      if (column.is_loan && column.interest_rate && column.term_years && column.amortization_months) {
        // Calculate the total amount for this loan column
        let totalLoanAmount = 0;
        Object.keys(tableData).forEach(rowName => {
          if (rowName !== 'TOTAL') {
            totalLoanAmount += tableData[rowName][column.column_name] || 0;
          }
        });

        // Calculate monthly and annual payments
        const { monthlyPayment } = calculateLoanPayment(
          totalLoanAmount,
          column.interest_rate,
          column.amortization_months
        );

        // Only update if the values actually changed
        if (
          updatedColumns[index].monthly_payment !== monthlyPayment ||
          updatedColumns[index].annual_payment !== monthlyPayment * 12
        ) {
          updatedColumns[index] = {
            ...column,
            monthly_payment: monthlyPayment,
            annual_payment: monthlyPayment * 12
          };
          hasChanges = true;
        }
      }
    });

    // Only update state if there were actual changes
    if (hasChanges) {
      setColumns(updatedColumns);
    }
  }, [tableData, calculateLoanPayment, columns]);

  // Add a new column
  const handleAddColumn = (newColumn: Partial<UseOfProceedsColumn>) => {
    const columnId = `col_${Date.now()}`;
    
    const column: UseOfProceedsColumn = {
      column_id: columnId,
      column_name: newColumn.column_name || 'New Column',
      is_loan: newColumn.is_loan || false,
      interest_rate: newColumn.interest_rate,
      term_years: newColumn.term_years,
      amortization_months: newColumn.amortization_months,
    };
    
    setColumns(prev => [...prev, column]);
  };

  // Delete a column
  const handleDeleteColumn = (columnId: string) => {
    setColumns(columns.filter(col => col.column_id !== columnId));
  };

  return {
    columns,
    setColumns,
    handleAddColumn,
    handleDeleteColumn
  };
};
