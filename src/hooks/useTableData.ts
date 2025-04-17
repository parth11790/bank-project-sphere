
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
    
    data.forEach(item => {
      if (populatedData[item.row_name]) {
        // If column name is provided, use it
        if (item.column_name) {
          populatedData[item.row_name][item.column_name] = item.value;
        } else if (columns.length > 0) {
          // For mock data which might not have column_name, use the first column
          populatedData[item.row_name][columns[0].column_name] = item.value;
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
