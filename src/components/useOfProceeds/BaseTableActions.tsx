
import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Save, X } from 'lucide-react';

interface BaseTableActionsProps {
  editMode: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onAddColumn: () => void;
  onAddRow: () => void;
}

const BaseTableActions: React.FC<BaseTableActionsProps> = ({
  editMode,
  onEdit,
  onSave,
  onCancel,
  onAddColumn,
  onAddRow
}) => {
  return (
    <div>
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
    </div>
  );
};

export default BaseTableActions;
