
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface BaseSummaryProps {
  message: string;
}

const BaseSummary: React.FC<BaseSummaryProps> = ({ message }) => {
  return (
    <Alert>
      <AlertDescription>
        {message}
      </AlertDescription>
    </Alert>
  );
};

export default BaseSummary;
