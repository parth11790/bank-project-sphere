
import React from 'react';
import { Button } from '@/components/ui/button';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2 } from 'lucide-react';

interface FormerOwnerHeaderProps {
  index: number;
  onRemove: () => void;
}

export const FormerOwnerHeader: React.FC<FormerOwnerHeaderProps> = ({
  index,
  onRemove
}) => {
  return (
    <CardHeader className="pb-2">
      <CardTitle className="text-md flex items-center justify-between">
        <span>Former Owner {index + 1}</span>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onRemove}
        >
          <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
        </Button>
      </CardTitle>
    </CardHeader>
  );
};
