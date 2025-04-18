import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UseOfProceedsColumn, UseOfProceedsRow } from './EnhancedUseOfProceedsTable';
import { Trash2, Maximize2, Minimize2 } from 'lucide-react';
import { categoryOptions } from './categoryOptions';
import { ScrollArea } from '@/components/ui/scroll-area';
import * as Dialog from '@radix-ui/react-dialog';

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
          <TableHead className="w-[120px] bg-muted/30 font-medium sticky left-0 z-10 text-xs">Overall Category</TableHead>
          <TableHead className="w-[150px] bg-muted/30 font-medium sticky left-[120px] z-10 text-xs">Category</TableHead>
          {columns.map(column => (
            <TableHead key={column.column_id} className="bg-muted/30 font-medium text-right text-xs">
              <div className="flex flex-col">
                <div className="flex justify-between items-center">
                  <span>{column.column_name}</span>
                  {editMode && column.column_id !== 'col_1' && (
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-5 w-5"
                      onClick={() => handleDeleteColumn(column.column_id)}
                    >
                      <Trash2 className="h-3 w-3 text-destructive" />
                    </Button>
                  )}
                </div>
                {column.is_loan && (
                  <div className="text-[10px] text-muted-foreground font-normal mt-0.5">
                    <div>Rate: {column.interest_rate}% - Term: {column.term_years}yr</div>
                    <div>Monthly: {formatCurrency(column.monthly_payment || 0)}</div>
                  </div>
                )}
              </div>
            </TableHead>
          ))}
          <TableHead className="bg-muted/30 font-medium text-right text-xs">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map(row => {
          const overallCategory = tableData[row.row_name]?.overall_category || 
            row.overall_category ||
            categoryOptions.find(opt => opt.category === row.row_name)?.overall || 
            'Other';
          
          return (
            <TableRow key={row.row_id} className={`text-xs ${row.row_name === 'TOTAL' ? 'bg-muted/20 font-semibold' : ''}`}>
              <TableCell className="font-medium sticky left-0 z-10 bg-white text-xs py-2">
                {row.row_name === 'TOTAL' ? '' : overallCategory}
              </TableCell>
              <TableCell className="font-medium sticky left-[120px] z-10 bg-white text-xs py-2">
                <div className="flex justify-between items-center">
                  <span>{row.row_name}</span>
                  {editMode && row.row_name !== 'TOTAL' && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-5 w-5 -mr-2"
                      onClick={() => handleDeleteRow(row.row_id)}
                    >
                      <Trash2 className="h-3 w-3 text-destructive" />
                    </Button>
                  )}
                </div>
              </TableCell>
              {columns.map(column => (
                <TableCell key={column.column_id} className="text-right py-2">
                  {editMode && row.row_name !== 'TOTAL' ? (
                    <Input
                      type="number"
                      className="w-full text-right h-6 text-xs"
                      value={getCellValue(row.row_name, column.column_name)}
                      onChange={(e) => handleValueChange(row.row_name, column.column_name, e.target.value)}
                    />
                  ) : row.row_name === 'TOTAL' ? (
                    <motion.div
                      key={`total-${column.column_name}-${calculateColumnTotal(column.column_name)}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="text-xs"
                    >
                      {formatCurrency(calculateColumnTotal(column.column_name))}
                    </motion.div>
                  ) : (
                    <motion.div
                      key={`${row.row_name}-${column.column_name}-${getCellValue(row.row_name, column.column_name)}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="text-xs"
                    >
                      {formatCurrency(getCellValue(row.row_name, column.column_name))}
                    </motion.div>
                  )}
                </TableCell>
              ))}
              <TableCell className="font-medium text-right text-xs py-2">
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
      <Button
        variant="outline"
        size="sm"
        className="absolute right-0 -top-10 z-20"
        onClick={() => setIsFullscreen(true)}
      >
        <Maximize2 className="h-4 w-4" />
        <span className="ml-2">Full Screen</span>
      </Button>

      <div className="overflow-x-auto">
        <ScrollArea className="h-[600px]">
          <TableContent />
        </ScrollArea>
      </div>

      <Dialog.Root open={isFullscreen} onOpenChange={setIsFullscreen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
          <Dialog.Content className="fixed inset-4 z-50 bg-background rounded-lg shadow-lg overflow-hidden flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <Dialog.Title className="text-lg font-semibold">Use of Proceeds Table</Dialog.Title>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsFullscreen(false)}
              >
                <Minimize2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 overflow-auto p-4">
              <ScrollArea className="h-full">
                <TableContent />
              </ScrollArea>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default ProceedsTable;
