
import React from 'react';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { UseOfProceedsColumn, UseOfProceedsRow } from '@/components/UseOfProceedsTable';
import { CategoryOption } from '@/components/useOfProceeds/categoryOptions';

// Utility function to convert camelCase or PascalCase to regular text
const convertToRegularText = (text: string): string => {
  if (!text) return text;
  
  // Replace camelCase or PascalCase with spaces
  return text
    .replace(/([A-Z])/g, ' $1')  // Insert space before capital letters
    .replace(/^./, function(str){ return str.toUpperCase(); })  // Capitalize first letter
    .trim();
};

interface BaseTableContentProps {
  columns: UseOfProceedsColumn[];
  rows: UseOfProceedsRow[];
  editMode: boolean;
  tableData: any;
  getCellValue: (rowName: string, columnName: string) => number;
  handleValueChange: (rowName: string, columnName: string, value: string) => void;
  calculateColumnTotal: (columnName: string) => number;
  formatCurrency: (value: number) => string;
  categoryOptions?: CategoryOption[];
  validationErrors?: { [key: string]: string };
  className?: string; // Added className prop to fix the type error
}

const BaseTableContent: React.FC<BaseTableContentProps> = ({
  columns,
  rows,
  editMode,
  tableData,
  getCellValue,
  handleValueChange,
  calculateColumnTotal,
  formatCurrency,
  categoryOptions,
  validationErrors = {},
  className
}) => {
  return (
    <Table className={`border-t ${className || ''}`}>
      <TableHeader className="bg-muted/50">
        <TableRow>
          <TableHead className="w-[250px] font-medium">
            Overall Category
          </TableHead>
          <TableHead className="w-[250px] font-medium">
            Category
          </TableHead>
          {columns.map(col => (
            <TableHead key={col.column_id} className="font-medium text-right min-w-[120px]">
              {convertToRegularText(col.column_name)}
            </TableHead>
          ))}
          <TableHead className="font-medium text-right min-w-[120px]">TOTAL</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map(row => {
          // Calculate row total
          let rowTotal = 0;
          columns.forEach(col => {
            rowTotal += getCellValue(row.row_name, col.column_name);
          });
          
          const cellClass = row.row_name === 'TOTAL' ? 'font-bold bg-muted/30' : '';
          
          return (
            <TableRow key={row.row_id} className={row.row_name === 'TOTAL' ? 'border-t-2' : ''}>
              <TableCell className={`font-medium ${cellClass}`}>
                {convertToRegularText(row.overall_category || '')}
              </TableCell>
              <TableCell className={`font-medium ${cellClass}`}>
                {convertToRegularText(row.row_name)}
                {row.overall_category && row.row_name !== 'TOTAL' && (
                  <span className="block text-xs text-muted-foreground">
                    {convertToRegularText(row.overall_category)}
                  </span>
                )}
              </TableCell>
              
              {columns.map(col => {
                const cellValue = getCellValue(row.row_name, col.column_name);
                const errorKey = `${row.row_name}-${col.column_name}`;
                const hasError = !!validationErrors[errorKey];
                
                return (
                  <TableCell key={`${row.row_id}-${col.column_id}`} className={`text-right ${cellClass}`}>
                    {editMode && row.row_name !== 'TOTAL' ? (
                      <div>
                        <Input
                          type="text"
                          value={cellValue}
                          onChange={(e) => handleValueChange(row.row_name, col.column_name, e.target.value)}
                          className={`w-full text-right ${hasError ? 'border-destructive' : ''}`}
                        />
                        {hasError && (
                          <p className="text-xs text-destructive mt-1">{validationErrors[errorKey]}</p>
                        )}
                      </div>
                    ) : (
                      formatCurrency(cellValue)
                    )}
                  </TableCell>
                );
              })}
              
              <TableCell className={`text-right font-medium ${cellClass}`}>
                {formatCurrency(rowTotal)}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default BaseTableContent;

