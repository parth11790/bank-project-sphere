
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Eye, Save } from 'lucide-react';
import { toast } from 'sonner';

interface PreApprovalLetterActionsProps {
  showPreview: boolean;
  onTogglePreview: () => void;
  onDownload: () => void;
  onSave: () => Promise<boolean>;
}

export const PreApprovalLetterActions: React.FC<PreApprovalLetterActionsProps> = ({
  showPreview,
  onTogglePreview,
  onDownload,
  onSave
}) => {
  const handleSave = async () => {
    try {
      const success = await onSave();
      if (success) {
        toast.success('Pre-approval letter saved successfully');
      } else {
        toast.error('Failed to save letter');
      }
    } catch (error) {
      toast.error('Error saving letter');
    }
  };

  return (
    <div className="flex gap-3">
      <Button onClick={onTogglePreview} variant="outline">
        <Eye className="h-4 w-4 mr-2" />
        {showPreview ? 'Hide Preview' : 'Show Preview'}
      </Button>
      
      <Button onClick={handleSave} variant="outline">
        <Save className="h-4 w-4 mr-2" />
        Save Letter
      </Button>
      
      <Button onClick={onDownload}>
        <Download className="h-4 w-4 mr-2" />
        Download Letter
      </Button>
    </div>
  );
};
