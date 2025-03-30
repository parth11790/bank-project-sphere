
import React from 'react';
import { Button } from '@/components/ui/button';
import { Building2 } from 'lucide-react';

interface AddBusinessButtonProps {
  onAddBusiness: () => void;
}

const AddBusinessButton: React.FC<AddBusinessButtonProps> = ({ onAddBusiness }) => {
  return (
    <div className="flex justify-center pt-2">
      <Button variant="outline" size="sm" className="w-full" onClick={onAddBusiness}>
        <Building2 className="h-4 w-4 mr-2" />
        Add Business
      </Button>
    </div>
  );
};

export default AddBusinessButton;
