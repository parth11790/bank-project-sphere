
import React from 'react';
import LenderBranding from '@/components/header/LenderBranding';
import BreadcrumbNavigation from '@/components/header/BreadcrumbNavigation';
import HeaderActions from '@/components/header/HeaderActions';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="h-14 flex items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <LenderBranding />
          
          <div className="h-6 w-px bg-border mx-2" />
          
          <BreadcrumbNavigation />
        </div>
        
        <HeaderActions />
      </div>
    </header>
  );
};

export default Header;
