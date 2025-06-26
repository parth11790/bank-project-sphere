
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LenderInfo {
  name: string;
  logoUrl?: string;
  primaryColor: string;
  secondaryColor: string;
  contactEmail: string;
  contactPhone: string;
  website: string;
  nmlsId: string;
  complianceStatement: string;
}

interface LenderContextType {
  lenderInfo: LenderInfo;
  updateLenderInfo: (info: Partial<LenderInfo>) => void;
}

const defaultLenderInfo: LenderInfo = {
  name: 'Community First Bank',
  logoUrl: '',
  primaryColor: '#1e40af',
  secondaryColor: '#3b82f6',
  contactEmail: 'support@communityfirstbank.com',
  contactPhone: '(555) 123-4567',
  website: 'https://www.communityfirstbank.com',
  nmlsId: 'NMLS# 123456',
  complianceStatement: 'Member FDIC. Equal Housing Lender.'
};

const LenderContext = createContext<LenderContextType | undefined>(undefined);

export const LenderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lenderInfo, setLenderInfo] = useState<LenderInfo>(defaultLenderInfo);

  const updateLenderInfo = (info: Partial<LenderInfo>) => {
    setLenderInfo(prev => ({ ...prev, ...info }));
  };

  return (
    <LenderContext.Provider value={{ lenderInfo, updateLenderInfo }}>
      {children}
    </LenderContext.Provider>
  );
};

export const useLender = () => {
  const context = useContext(LenderContext);
  if (context === undefined) {
    throw new Error('useLender must be used within a LenderProvider');
  }
  return context;
};
