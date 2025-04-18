
import React from 'react';
import { CardHeader } from '@/components/ui/card';
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
      {editMode && (
        <div className="mt-4 p-3 bg-muted/40 rounded-md border border-border/30 text-sm">
          <p className="text-muted-foreground">
            <strong>Editing Mode:</strong> Make changes to the table structure and values. Add columns for funding sources or rows for expense categories.
          </p>
        </div>
      )}
      <TableActions 
        editMode={editMode}
        onEdit={onEdit}
        onSave={onSave}
        onCancel={onCancel}
        onAddColumn={onAddColumn}
        onAddRow={onAddRow}
      />
    </CardHeader>
  );
};

export default TableHeader;
