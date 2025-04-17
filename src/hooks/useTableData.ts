
import { UseOfProceedsColumn as EnhancedColumn, UseOfProceedsRow } from "@/components/useOfProceeds/EnhancedUseOfProceedsTable";

// Create a more generic column type that can work with both the original and enhanced versions
export type BaseUseOfProceedsColumn = {
  column_id: string;
  column_name: string;
  [key: string]: any; // Allow for additional properties like is_loan
};

interface UseTableDataProps {
  data: Array<{
    id?: number;
    proceeds_id?: string;
    project_id?: string;
    column_name?: string;
    row_name: string;
    overall_category?: string;
    value: number;
  }>;
  rows: UseOfProceedsRow[];
  columns: BaseUseOfProceedsColumn[]; // Use the more generic type
}

export const useTableData = ({ data, rows, columns }: UseTableDataProps) => {
  // Format the data for display in the table
  const formatData = () => {
    const tableData: { [key: string]: { overall_category?: string, [key: string]: any } } = {};
    
    // Initialize the table data with empty values
    rows.forEach(row => {
      const categoryOption = data.find(item => item.row_name === row.row_name);
      const overallCategory = row.overall_category || (categoryOption ? categoryOption.overall_category : '');
      
      tableData[row.row_name] = { overall_category: overallCategory };
      columns.forEach(column => {
        tableData[row.row_name][column.column_name] = 0;
      });
    });
    
    // Fill in the values from the data
    data.forEach(item => {
      if (tableData[item.row_name] && item.column_name) {
        tableData[item.row_name][item.column_name] = item.value;
        
        // Add overall category if it exists in the data
        if (item.overall_category) {
          tableData[item.row_name].overall_category = item.overall_category;
        }
      } else if (tableData[item.row_name]) {
        // For mock data which might not have column_name, use the first column
        if (columns.length > 0) {
          tableData[item.row_name][columns[0].column_name] = item.value;
        }
      }
    });
    
    return tableData;
  };

  const tableData = formatData();

  return {
    tableData,
    formatData
  };
};
