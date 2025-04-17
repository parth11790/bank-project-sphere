
import React from 'react';
import Header from './Header';
import { AppSidebar } from './AppSidebar';
import { SidebarProvider } from './ui/sidebar';

interface LayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showSidebar?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  showHeader = true,
  showSidebar = true
}) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-background flex">
        {showSidebar && <AppSidebar />}
        <div className="flex-1 flex flex-col">
          {showHeader && <Header />}
          <div className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
            {children}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
