
import React from 'react';
import { motion } from 'framer-motion';

const DashboardHeader: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
      <p className="text-muted-foreground">An overview of your banking projects and activities</p>
    </motion.div>
  );
};

export default DashboardHeader;
