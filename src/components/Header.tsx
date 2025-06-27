
import React from 'react';
import LenderBranding from '@/components/header/LenderBranding';
import BreadcrumbNavigation from '@/components/header/BreadcrumbNavigation';
import HeaderActions from '@/components/header/HeaderActions';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 relative">
      {/* Animated border overlay - made thicker and more vibrant */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 via-red-500 via-amber-500 to-green-500 bg-[length:300%_100%] animate-[border-flow_6s_linear_infinite] shadow-sm" />
      
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
