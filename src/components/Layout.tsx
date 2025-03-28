
import React from 'react';
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from './AppSidebar';
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
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset>
          {showHeader && <Header />}
          <div className="container px-4 py-6 md:px-6">
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
