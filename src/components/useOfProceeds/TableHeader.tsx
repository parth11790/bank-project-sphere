
import React from 'react';
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import TableActions from './TableActions';

interface TableHeaderProps {
  editMode: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onAddColumn: () => void;
  onAddRow: () => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  editMode,
  onEdit,
  onSave,
  onCancel,
  onAddColumn,
  onAddRow
}) => {
  return (
    <CardHeader className="pb-3">
      <div className="flex justify-between items-center">
        <div>
          <CardTitle className="text-xl font-semibold">Use of Proceeds</CardTitle>
          <CardDescription>Financial breakdown for the project</CardDescription>
        </div>
        <TableActions 
          editMode={editMode}
          onEdit={onEdit}
          onSave={onSave}
          onCancel={onCancel}
          onAddColumn={onAddColumn}
          onAddRow={onAddRow}
        />
      </div>
    </CardHeader>
  );
};

export default TableHeader;
