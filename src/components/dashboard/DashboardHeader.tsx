
import React from 'react';
import { motion } from 'framer-motion';

const DashboardHeader: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-4"
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
        <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">An overview of your banking projects and activities</p>
      </div>
    </motion.div>
  );
};

export default DashboardHeader;
