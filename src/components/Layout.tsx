
import React from 'react';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  showHeader = true,
}) => {
  return (
    <div className="min-h-screen w-full bg-background flex flex-col">
      {showHeader && <Header />}
      <div className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        {children}
      </div>
    </div>
  );
};

export default Layout;
