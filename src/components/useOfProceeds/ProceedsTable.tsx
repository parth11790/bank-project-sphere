
import React, { useState } from 'react';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { UseOfProceedsColumn, UseOfProceedsRow } from './EnhancedUseOfProceedsTable';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Maximize2 } from 'lucide-react';
import TableHeaderCell from './TableHeaderCell';
import TableValueCell from './TableValueCell';
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
      <TableHeader>
        <TableRow className="text-xs">
          <TableHead className="w-[120px] bg-muted/30 font-medium sticky left-0 z-10 text-[10px]">
            Overall Category
          </TableHead>
          <TableHead className="w-[150px] bg-muted/30 font-medium sticky left-[120px] z-10 text-[10px]">
            Category
          </TableHead>
          {columns.map(column => (
            <TableHeaderCell
              key={column.column_id}
              columnName={column.column_name}
              isLoan={column.is_loan}
              interestRate={column.interest_rate}
              termYears={column.term_years}
              monthlyPayment={column.monthly_payment}
              editMode={editMode}
              columnId={column.column_id}
              onDelete={handleDeleteColumn}
              formatCurrency={formatCurrency}
            />
          ))}
          <TableHead className="bg-accent/10 font-medium text-right text-[10px] border-l">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row, rowIndex) => {
          const overallCategory = tableData[row.row_name]?.overall_category || row.overall_category || 'Other';
          const isTotal = row.row_name === 'TOTAL';
          
          return (
            <TableRow 
              key={row.row_id} 
              className={`text-[10px] ${
                isTotal 
                  ? 'bg-accent/5 font-semibold border-t border-t-border/50' 
                  : rowIndex % 2 === 0 ? 'bg-muted/5' : ''
              }`}
            >
              <TableHead className={`font-medium sticky left-0 z-10 ${
                isTotal 
                  ? 'bg-accent/5' 
                  : rowIndex % 2 === 0 ? 'bg-muted/5' : 'bg-white'
              } text-[10px] py-1`}>
                {!isTotal && overallCategory}
              </TableHead>
              <TableHead className={`font-medium sticky left-[120px] z-10 ${
                isTotal 
                  ? 'bg-accent/5' 
                  : rowIndex % 2 === 0 ? 'bg-muted/5' : 'bg-white'
              } text-[10px] py-1`}>
                {row.row_name}
              </TableHead>
              {columns.map(column => (
                <TableValueCell
                  key={`${row.row_id}-${column.column_id}`}
                  value={getCellValue(row.row_name, column.column_name)}
                  rowName={row.row_name}
                  columnName={column.column_name}
                  editMode={editMode}
                  isTotal={isTotal}
                  onChange={handleValueChange}
                  formatCurrency={formatCurrency}
                />
              ))}
              <TableCell className={`font-medium text-right text-xs py-1 border-l ${
                isTotal ? 'bg-accent/5 font-semibold' : ''
              }`}>
                {formatCurrency(calculateRowTotal(row.row_name))}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
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
