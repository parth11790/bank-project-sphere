
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
          className="h-8 w-auto rounded border-2 border-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-pulse"
        />
      ) : (
        <div className="h-8 w-8 rounded bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center border-2 animate-[border-glow_3s_ease-in-out_infinite] shadow-lg">
          <Building2 className="h-5 w-5 text-white drop-shadow-sm" />
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
