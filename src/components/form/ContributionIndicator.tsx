
import React from 'react';
import { Plus, Minus } from 'lucide-react';

interface ContributionIndicatorProps {
  fieldType: 'income' | 'expense';
}

const ContributionIndicator: React.FC<ContributionIndicatorProps> = ({ fieldType }) => {
  if (fieldType === 'income') {
    return <Plus className="inline h-4 w-4 text-green-500" />;
  } else {
    return <Minus className="inline h-4 w-4 text-red-500" />;
  }
};

export default ContributionIndicator;
