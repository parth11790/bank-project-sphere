
import React from 'react';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  showHeader = true 
}) => {
  return (
    <div className="min-h-screen w-full bg-background">
      {showHeader && <Header />}
      <div className="max-w-7xl mx-auto px-4 py-8 md:px-6">
        {children}
      </div>
    </div>
  );
};

export default Layout;
