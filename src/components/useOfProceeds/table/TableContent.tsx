
import React from 'react';
import { Table, TableBody, TableHeader } from '@/components/ui/table';
import { UseOfProceedsColumn, UseOfProceedsRow } from '@/components/useOfProceeds/EnhancedUseOfProceedsTable';
import TableHeaderRow from './TableHeaderRow';
import TableRowComponent from './TableRow';

interface TableContentProps {
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

const TableContent: React.FC<TableContentProps> = ({
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
    <Table>
      <TableHeader>
        <TableHeaderRow 
          columns={columns} 
          editMode={editMode} 
          onDeleteColumn={handleDeleteColumn} 
          formatCurrency={formatCurrency} 
        />
      </TableHeader>
      <TableBody>
        {rows.map((row, rowIndex) => {
          const overallCategory = tableData[row.row_name]?.overall_category || 
            row.overall_category || 'Other';
          
          return (
            <TableRowComponent
              key={row.row_id}
              row={row}
              columns={columns}
              rowIndex={rowIndex}
              editMode={editMode}
              tableData={tableData}
              getCellValue={getCellValue}
              handleValueChange={handleValueChange}
              calculateRowTotal={calculateRowTotal}
              formatCurrency={formatCurrency}
              handleDeleteRow={handleDeleteRow}
              overallCategory={overallCategory}
            />
          );
        })}
      </TableBody>
    </Table>
  );
};

export default TableContent;
