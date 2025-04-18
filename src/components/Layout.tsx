
import React, { useEffect } from 'react';
import Header from './Header';
import { AppSidebar } from './AppSidebar';
import { SidebarProvider, useSidebar } from './ui/sidebar';

interface LayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showSidebar?: boolean;
  collapseSidebar?: boolean;
}

// Inner component to collapse sidebar when needed
const LayoutContent: React.FC<Omit<LayoutProps, 'collapseSidebar'> & { collapseSidebar?: boolean }> = ({
  children,
  showHeader = true,
  showSidebar = true,
  collapseSidebar = false
}) => {
  const { setOpen } = useSidebar();
  
  useEffect(() => {
    if (collapseSidebar) {
      setOpen(false);
    }
  }, [collapseSidebar, setOpen]);

  return (
    <div className="min-h-screen w-full bg-background flex">
      {showSidebar && <AppSidebar />}
      <div className="flex-1 flex flex-col">
        {showHeader && <Header />}
        <div className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </div>
    </div>
  );
};

// Main layout component that provides the SidebarProvider
const Layout: React.FC<LayoutProps> = ({ 
  children, 
  showHeader = true,
  showSidebar = true,
  collapseSidebar = false
}) => {
  return (
    <SidebarProvider>
      <LayoutContent
        showHeader={showHeader}
        showSidebar={showSidebar}
        collapseSidebar={collapseSidebar}
      >
        {children}
      </LayoutContent>
    </SidebarProvider>
  );
};

export default Layout;
