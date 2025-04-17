
import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Save, X, Plus } from 'lucide-react';

interface TableActionsProps {
  editMode: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onAddColumn: () => void;
  onAddRow: () => void;
}

const TableActions: React.FC<TableActionsProps> = ({
  editMode,
  onEdit,
  onSave,
  onCancel,
  onAddColumn,
  onAddRow
}) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          {editMode ? (
            <>
              <Button size="sm" variant="outline" onClick={onCancel} className="flex items-center gap-1">
                <X size={16} />
                <span>Cancel</span>
              </Button>
              <Button size="sm" onClick={onSave} className="flex items-center gap-1">
                <Save size={16} />
                <span>Save</span>
              </Button>
            </>
          ) : (
            <Button size="sm" variant="outline" onClick={onEdit} className="flex items-center gap-1">
              <Edit size={16} />
              <span>Edit</span>
            </Button>
          )}
        </div>
      </div>
      
      {editMode && (
        <div className="flex justify-end p-4 gap-3">
          <Button 
            size="sm" 
            variant="outline" 
            className="flex items-center gap-1"
            onClick={onAddColumn}
          >
            <Plus size={16} />
            <span>Add Column</span>
          </Button>
          
          <Button 
            size="sm" 
            variant="outline" 
            className="flex items-center gap-1"
            onClick={onAddRow}
          >
            <Plus size={16} />
            <span>Add Row</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default TableActions;
