
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
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
      
      {editMode && (
        <div className="mt-4 p-3 bg-muted/40 rounded-md border border-border/30 text-sm">
          <p className="text-muted-foreground">
            <strong>Editing Mode:</strong> Make changes to the table structure and values. Add columns for funding sources or rows for expense categories.
          </p>
        </div>
      )}
    </CardHeader>
  );
};

export default TableHeader;
