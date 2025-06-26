
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Eye } from 'lucide-react';

interface PreApprovalLetterActionsProps {
  showPreview: boolean;
  onTogglePreview: () => void;
  onDownload: () => void;
}

export const PreApprovalLetterActions: React.FC<PreApprovalLetterActionsProps> = ({
  showPreview,
  onTogglePreview,
  onDownload
}) => {
  return (
    <div className="flex gap-3">
      <Button onClick={onTogglePreview} variant="outline">
        <Eye className="h-4 w-4 mr-2" />
        {showPreview ? 'Hide Preview' : 'Show Preview'}
      </Button>
      
      <Button onClick={onDownload}>
        <Download className="h-4 w-4 mr-2" />
        Download Letter
      </Button>
    </div>
  );
};
