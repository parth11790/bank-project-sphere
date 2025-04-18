
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CashFlowHeaderProps {
  projectName: string;
  projectId: string;
}

const CashFlowHeader: React.FC<CashFlowHeaderProps> = ({ projectName, projectId }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-4">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => navigate(`/project/${projectId}`)}
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>
      <div>
        <h1 className="text-2xl font-bold">Cash Flow Analysis</h1>
        <p className="text-muted-foreground">{projectName || 'Loading...'}</p>
      </div>
    </div>
  );
};

export default CashFlowHeader;
