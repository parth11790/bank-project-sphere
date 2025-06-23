
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import ProceedsTable from './ProceedsTable';
import { UseOfProceedsColumn, UseOfProceedsRow } from './EnhancedUseOfProceedsTable';

interface UseOfProceedsTableContentProps {
  columns: UseOfProceedsColumn[];
  rows: UseOfProceedsRow[];
  tableData: any;
  editMode: boolean;
  getCellValue: (rowName: string, columnName: string) => number;
  handleValueChange: (rowName: string, columnName: string, value: string) => void;
  calculateColumnTotal: (columnName: string) => number;
  calculateRowTotal: (rowName: string) => number;
  formatCurrency: (value: number) => string;
  handleDeleteColumn: (columnId: string) => void;
  handleDeleteRow: (rowId: string) => void;
}

const UseOfProceedsTableContent: React.FC<UseOfProceedsTableContentProps> = ({
  columns,
  rows,
  tableData,
  editMode,
  getCellValue,
  handleValueChange,
  calculateColumnTotal,
  calculateRowTotal,
  formatCurrency,
  handleDeleteColumn,
  handleDeleteRow
}) => {
  return (
    <Card className="w-full overflow-hidden border-border/50">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <ProceedsTable 
            columns={columns}
            rows={rows}
            tableData={tableData}
            editMode={editMode}
            getCellValue={getCellValue}
            handleValueChange={handleValueChange}
            calculateColumnTotal={calculateColumnTotal}
            calculateRowTotal={calculateRowTotal}
            formatCurrency={formatCurrency}
            handleDeleteColumn={handleDeleteColumn}
            handleDeleteRow={handleDeleteRow}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default UseOfProceedsTableContent;
