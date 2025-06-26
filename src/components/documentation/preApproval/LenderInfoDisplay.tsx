
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useLender } from '@/contexts/LenderContext';

export const LenderInfoDisplay: React.FC = () => {
  const { lenderInfo } = useLender();

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
        Lender Information
      </h3>
      
      <Card className="bg-gray-50">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center gap-3">
            {lenderInfo.logoUrl && (
              <img src={lenderInfo.logoUrl} alt="Lender Logo" className="h-8 w-auto" />
            )}
            <div>
              <h4 className="font-semibold">{lenderInfo.name}</h4>
              <p className="text-sm text-muted-foreground">{lenderInfo.nmlsId}</p>
            </div>
          </div>
          <div className="space-y-1 text-sm">
            <p>{lenderInfo.contactPhone}</p>
            <p>{lenderInfo.contactEmail}</p>
            <p className="text-muted-foreground">{lenderInfo.complianceStatement}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
