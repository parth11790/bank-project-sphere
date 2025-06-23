
import React from 'react';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface BusinessTaxReturnHeaderProps {
  selectedYears: string[];
  onAddYear: () => void;
}

const BusinessTaxReturnHeader: React.FC<BusinessTaxReturnHeaderProps> = ({
  selectedYears,
  onAddYear
}) => {
  return (
    <CardHeader>
      <div className="flex items-center justify-between">
        <CardTitle>Business Tax Returns Information</CardTitle>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onAddYear}
            disabled={selectedYears.length >= 8}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Year
          </Button>
        </div>
      </div>
    </CardHeader>
  );
};

export default BusinessTaxReturnHeader;
