
import React from 'react';
import { Button } from '@/components/ui/button';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2 } from 'lucide-react';

interface CurrentOwnerHeaderProps {
  index: number;
  onRemove: () => void;
  canDelete: boolean;
}

export const CurrentOwnerHeader: React.FC<CurrentOwnerHeaderProps> = ({
  index,
  onRemove,
  canDelete
}) => {
  return (
    <CardHeader className="pb-2">
      <CardTitle className="text-md flex items-center justify-between">
        <span>Owner {index + 1}</span>
        {canDelete && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onRemove}
          >
            <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
          </Button>
        )}
      </CardTitle>
    </CardHeader>
  );
};
