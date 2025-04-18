
import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Maximize2 } from 'lucide-react';
import { UseOfProceedsColumn, UseOfProceedsRow } from './EnhancedUseOfProceedsTable';
import TableContent from './table/TableContent';
import FullscreenDialog from './table/FullscreenDialog';

interface ProceedsTableProps {
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

const ProceedsTable: React.FC<ProceedsTableProps> = ({
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
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div className="relative">
      <div className="overflow-x-auto">
        {/* Set max-height to ensure the table is fully visible without scrolling initially */}
        <ScrollArea className="max-h-[800px]">
          <TableContent 
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
        </ScrollArea>
      </div>

      <Button
        variant="outline"
        size="sm"
        className="absolute right-0 -top-10 z-20"
        onClick={() => setIsFullscreen(true)}
      >
        <Maximize2 className="h-4 w-4" />
        <span className="ml-2">Full Screen</span>
      </Button>

      <FullscreenDialog
        isOpen={isFullscreen}
        onClose={() => setIsFullscreen(false)}
        title="Use of Proceeds Table"
      >
        <TableContent 
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
      </FullscreenDialog>
    </div>
  );
};

export default ProceedsTable;
