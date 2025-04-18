
import React from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './Header';
import PageTransition from './PageTransition';

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
    <div className="min-h-screen w-full bg-background flex flex-col">
      {showHeader && <Header />}
      <div className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        {children}
      </div>
      <AnimatePresence>
        {isTransitioning && <PageTransition />}
      </AnimatePresence>
    </div>
  );
};

export default Layout;
