
import React from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './Header';
import PageTransition from './PageTransition';
import { AlertProvider } from './alerts';
import { AlertManager } from './alerts';

interface LayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  showHeader = true,
}) => {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = React.useState(false);

  React.useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 2000); // Animation duration

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <AlertProvider>
      <div className="min-h-screen w-full bg-background flex flex-col">
        {showHeader && <Header />}
        <div className="flex-1 p-2 md:p-3 lg:p-4 max-w-[90%] mx-auto w-full">
          {children}
        </div>
        <AnimatePresence>
          {isTransitioning && <PageTransition />}
        </AnimatePresence>
        <AlertManager position="top" alignment="center" />
      </div>
    </AlertProvider>
  );
};

export default Layout;
