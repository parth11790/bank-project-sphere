
import React, { useState } from 'react';
import { Table } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { UseOfProceedsColumn, UseOfProceedsRow } from '@/components/UseOfProceedsTable';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Maximize2 } from 'lucide-react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import FullscreenDialog from './FullscreenDialog';

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

  const TableContent = () => (
    <Table>
      <TableHeader 
        columns={columns}
        editMode={editMode}
        formatCurrency={formatCurrency}
        handleDeleteColumn={handleDeleteColumn}
      />
      <TableBody 
        rows={rows}
        columns={columns}
        tableData={tableData}
        editMode={editMode}
        getCellValue={getCellValue}
        handleValueChange={handleValueChange}
        calculateRowTotal={calculateRowTotal}
        formatCurrency={formatCurrency}
      />
    </Table>
  );

  return (
    <div className="relative">
      <div className="overflow-x-auto">
        <ScrollArea className="h-[600px]">
          <TableContent />
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
        onOpenChange={setIsFullscreen}
      >
        <TableContent />
      </FullscreenDialog>
    </div>
  );
};

export default ProceedsTable;
