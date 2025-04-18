
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, FileSearch, Database, FileSpreadsheet } from 'lucide-react';

const PageTransition = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex gap-8 items-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ 
              scale: [0.5, 1, 1, 0.5],
              opacity: [0, 1, 1, 0]
            }}
            transition={{
              duration: 2,
              times: [0, 0.3, 0.7, 1],
              repeat: Infinity
            }}
            className="flex flex-col items-center gap-2"
          >
            <Database className="h-8 w-8 text-primary" />
            <span className="text-sm text-muted-foreground">Gathering Data</span>
          </motion.div>

          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ 
              scale: [0.5, 1, 1, 0.5],
              opacity: [0, 1, 1, 0]
            }}
            transition={{
              duration: 2,
              times: [0, 0.3, 0.7, 1],
              repeat: Infinity,
              delay: 0.5
            }}
            className="flex flex-col items-center gap-2"
          >
            <FileSearch className="h-8 w-8 text-primary" />
            <span className="text-sm text-muted-foreground">Analyzing</span>
          </motion.div>

          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ 
              scale: [0.5, 1, 1, 0.5],
              opacity: [0, 1, 1, 0]
            }}
            transition={{
              duration: 2,
              times: [0, 0.3, 0.7, 1],
              repeat: Infinity,
              delay: 1
            }}
            className="flex flex-col items-center gap-2"
          >
            <FileSpreadsheet className="h-8 w-8 text-primary" />
            <span className="text-sm text-muted-foreground">Generating</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default PageTransition;
