
import React, { useState } from 'react';
import { UseOfProceedsColumn, UseOfProceedsRow } from './EnhancedUseOfProceedsTable';
import ScrollableTableWrapper from './table/ScrollableTableWrapper';
import FullscreenButton from './table/FullscreenButton';
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

  const tableContent = (
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
  );

  return (
    <div className="relative w-full">
      <ScrollableTableWrapper>
        {tableContent}
      </ScrollableTableWrapper>

      <FullscreenButton onClick={() => setIsFullscreen(true)} />

      <FullscreenDialog
        isOpen={isFullscreen}
        onClose={() => setIsFullscreen(false)}
        title="Use of Proceeds Table"
      >
        {tableContent}
      </FullscreenDialog>
    </div>
  );
};

export default ProceedsTable;
