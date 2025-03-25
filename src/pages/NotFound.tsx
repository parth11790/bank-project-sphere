
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div 
        className="text-center max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center mb-6">
          <div className="relative">
            <motion.div 
              className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-full blur-md"
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.7, 0.9, 0.7] 
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            />
            <div className="relative bg-background p-4 rounded-full">
              <AlertCircle className="h-16 w-16 text-primary" />
            </div>
          </div>
        </div>
        
        <h1 className="text-4xl font-bold mb-4 gradient-text">404</h1>
        <p className="text-xl text-foreground mb-4">Page not found</p>
        <p className="text-muted-foreground mb-8">
          We couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="default">
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Return to Home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/dashboard">Go to Dashboard</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
