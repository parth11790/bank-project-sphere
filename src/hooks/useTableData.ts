
import { UseOfProceedsColumn as EnhancedColumn, UseOfProceedsRow } from "@/components/useOfProceeds/EnhancedUseOfProceedsTable";

// Create a more generic column type that can work with both the original and enhanced versions
export type BaseUseOfProceedsColumn = {
  column_id: string;
  column_name: string;
  [key: string]: any; // Allow for additional properties like is_loan
};

// Types for the data structure
export type TableDataItem = {
  id?: number;
  proceeds_id?: string;
  project_id?: string;
  column_name?: string;
  row_name: string;
  overall_category?: string;
  value: number;
};

// Type for the formatted table data
export type FormattedTableData = {
  [rowName: string]: {
    overall_category?: string;
    [columnName: string]: any;
  };
};

interface UseTableDataProps {
  data: TableDataItem[];
  rows: UseOfProceedsRow[];
  columns: BaseUseOfProceedsColumn[]; // Use the more generic type
}

export const useTableData = ({ data, rows, columns }: UseTableDataProps) => {
  // Extract overall categories from data
  const extractOverallCategories = (
    rows: UseOfProceedsRow[],
    data: TableDataItem[]
  ): Record<string, string> => {
    const categories: Record<string, string> = {};
    
    // First prioritize data from the rows
    rows.forEach(row => {
      if (row.overall_category) {
        categories[row.row_name] = row.overall_category;
      }
    });
    
    // Then check the data items and fill in any missing categories
    data.forEach(item => {
      if (item.overall_category && !categories[item.row_name]) {
        categories[item.row_name] = item.overall_category;
      }
    });
    
    return categories;
  };

  // Initialize empty table data structure
  const initializeTableData = (
    rows: UseOfProceedsRow[],
    columns: BaseUseOfProceedsColumn[],
    overallCategories: Record<string, string>
  ): FormattedTableData => {
    const tableData: FormattedTableData = {};
    
    rows.forEach(row => {
      tableData[row.row_name] = { 
        overall_category: overallCategories[row.row_name] || '' 
      };
      
      columns.forEach(column => {
        tableData[row.row_name][column.column_name] = 0;
      });
    });
    
    return tableData;
  };

  // Fill table data with values from data array
  const populateTableData = (
    tableData: FormattedTableData,
    data: TableDataItem[]
  ): FormattedTableData => {
    const populatedData = { ...tableData };
    
    // For each data item, distribute its value across columns
    data.forEach(item => {
      if (populatedData[item.row_name]) {
        // If we have a column name in the data, use it specifically
        if (item.column_name && columns.find(col => col.column_name === item.column_name)) {
          populatedData[item.row_name][item.column_name] = item.value;
        } 
        // Otherwise, if we don't have a column name, distribute to the first column
        // This is particularly helpful for mock data that might not specify columns
        else if (columns.length > 0) {
          const category = item.overall_category?.toLowerCase() || '';
          
          if (category.includes('land') || category.includes('construction')) {
            // Put real estate items in the 504 column if it exists
            const col504 = columns.find(col => col.column_name === '504');
            if (col504) {
              populatedData[item.row_name][col504.column_name] = item.value;
            } else {
              populatedData[item.row_name][columns[0].column_name] = item.value;
            }
          } else if (category.includes('furniture') || category.includes('equipment')) {
            // Put FF&E items in the Express column if it exists
            const colExpress = columns.find(col => col.column_name === 'Express');
            if (colExpress) {
              populatedData[item.row_name][colExpress.column_name] = item.value;
            } else {
              populatedData[item.row_name][columns[1 % columns.length].column_name] = item.value;
            }
          } else if (category.includes('working capital')) {
            // Put working capital items in the 7(a) column if it exists
            const col7a = columns.find(col => col.column_name === '7(a)');
            if (col7a) {
              populatedData[item.row_name][col7a.column_name] = item.value;
            } else {
              populatedData[item.row_name][columns[2 % columns.length].column_name] = item.value;
            }
          } else if (category.includes('professional') || category.includes('fee')) {
            // Put professional fees in Borrower Equity
            const colBorrowerEquity = columns.find(col => col.column_name === 'Borrower Equity');
            if (colBorrowerEquity) {
              populatedData[item.row_name][colBorrowerEquity.column_name] = item.value;
            } else {
              populatedData[item.row_name][columns[3 % columns.length].column_name] = item.value;
            }
          } else if (category.includes('contingency')) {
            // Put contingency in Borrower Contribution
            const colBorrowerContribution = columns.find(col => col.column_name === 'Borrower Contribution');
            if (colBorrowerContribution) {
              populatedData[item.row_name][colBorrowerContribution.column_name] = item.value;
            } else {
              populatedData[item.row_name][columns[4 % columns.length].column_name] = item.value;
            }
          } else {
            // Distribute other items across available columns in an alternating pattern
            const columnIndex = (item.id || 0) % columns.length;
            populatedData[item.row_name][columns[columnIndex].column_name] = item.value;
          }
        }
        
        // Add or update overall category if it exists in the data
        if (item.overall_category) {
          populatedData[item.row_name].overall_category = item.overall_category;
        }
      }
    });
    
    return populatedData;
  };

  // Format the data for display in the table
  const formatData = (): FormattedTableData => {
    const overallCategories = extractOverallCategories(rows, data);
    const emptyTableData = initializeTableData(rows, columns, overallCategories);
    return populateTableData(emptyTableData, data);
  };

  // Generate the formatted table data
  const tableData = formatData();

  return {
    tableData,
    formatData,
    // Export utility functions for external use if needed
    extractOverallCategories,
    initializeTableData,
    populateTableData
  };
};
