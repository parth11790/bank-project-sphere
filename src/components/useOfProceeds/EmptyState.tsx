
import React from 'react';
import { motion } from 'framer-motion';
import { FileSpreadsheet } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EmptyState: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="text-center py-12"
    >
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="p-3 rounded-full bg-muted/50">
          <FileSpreadsheet className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium">No Use of Proceeds Data Available</h3>
        <p className="text-muted-foreground max-w-md">
          There is no financial data available for this project. Please create new data.
        </p>
        <Button className="mt-2">Create New Data</Button>
      </div>
    </motion.div>
  );
};

export default EmptyState;
