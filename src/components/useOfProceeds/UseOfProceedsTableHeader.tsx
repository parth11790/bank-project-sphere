
import React from 'react';
import TableActions from './TableActions';

interface UseOfProceedsTableHeaderProps {
  editMode: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onAddColumn: () => void;
  onAddRow: () => void;
}

const UseOfProceedsTableHeader: React.FC<UseOfProceedsTableHeaderProps> = ({
  editMode,
  onEdit,
  onSave,
  onCancel,
  onAddColumn,
  onAddRow
}) => {
  return (
    <div className="p-4 flex justify-between items-center">
      <h3 className="text-lg font-medium">Use of Proceeds</h3>
      <TableActions 
        editMode={editMode}
        onEdit={onEdit}
        onSave={onSave}
        onCancel={onCancel}
        onAddColumn={onAddColumn}
        onAddRow={onAddRow}
      />
    </div>
  );
};

export default UseOfProceedsTableHeader;
