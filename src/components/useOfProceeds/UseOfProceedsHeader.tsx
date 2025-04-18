
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Download } from 'lucide-react';

interface UseOfProceedsHeaderProps {
  projectName?: string;
  projectId?: string;
  onExport: () => void;
}

const UseOfProceedsHeader: React.FC<UseOfProceedsHeaderProps> = ({
  projectName,
  projectId,
  onExport
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
    >
      <div>
        <h1 className="text-3xl font-bold mb-1">Use of Proceeds</h1>
        {projectName && (
          <p className="text-muted-foreground">{projectName}</p>
        )}
      </div>
      
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" asChild>
          <Link to={`/project/${projectId}`} className="flex items-center gap-1">
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Project</span>
          </Link>
        </Button>
        
        <Button variant="outline" size="sm" onClick={onExport} className="flex items-center gap-1">
          <Download className="h-4 w-4" />
          <span>Export</span>
        </Button>
      </div>
    </motion.div>
  );
};

export default UseOfProceedsHeader;
