
import React from 'react';
import { Building2 } from 'lucide-react';
import { useLender } from '@/contexts/LenderContext';

const LenderBranding: React.FC = () => {
  const { lenderInfo } = useLender();

  return (
    <div className="flex items-center gap-3">
      {lenderInfo.logoUrl ? (
        <img 
          src={lenderInfo.logoUrl} 
          alt={`${lenderInfo.name} Logo`}
          className="h-8 w-auto"
        />
      ) : (
        <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center">
          <Building2 className="h-5 w-5 text-primary" />
        </div>
      )}
      <div className="hidden md:block">
        <h1 className="text-sm font-semibold text-foreground">{lenderInfo.name}</h1>
        <p className="text-xs text-muted-foreground">{lenderInfo.nmlsId}</p>
      </div>
    </div>
  );
};

export default LenderBranding;
