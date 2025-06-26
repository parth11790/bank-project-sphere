
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { FileText } from 'lucide-react';
import { useLender } from '@/contexts/LenderContext';
import { PreApprovalFormData } from './preApproval/PreApprovalFormData';
import { LenderInfoDisplay } from './preApproval/LenderInfoDisplay';
import { PreApprovalLetterActions } from './preApproval/PreApprovalLetterActions';
import { PreApprovalLetterPreview } from './preApproval/PreApprovalLetterPreview';
import { usePreApprovalLetter } from './preApproval/usePreApprovalLetter';

const PreApprovalLetterGenerator: React.FC = () => {
  const { lenderInfo } = useLender();
  const {
    formData,
    showPreview,
    setShowPreview,
    handleInputChange,
    getCurrentRate,
    generateLetter,
    handleDownload
  } = usePreApprovalLetter();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-500" />
            <CardTitle>Pre-Approval Letter Generator</CardTitle>
          </div>
          <p className="text-sm text-muted-foreground">
            Generate professional pre-approval letters using {lenderInfo.name} branding
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PreApprovalFormData
              formData={formData}
              onInputChange={handleInputChange}
              getCurrentRate={getCurrentRate}
            />
            <LenderInfoDisplay />
          </div>
          
          <Separator />
          
          <PreApprovalLetterActions
            showPreview={showPreview}
            onTogglePreview={() => setShowPreview(!showPreview)}
            onDownload={handleDownload}
          />
          
          {showPreview && (
            <PreApprovalLetterPreview letterContent={generateLetter()} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PreApprovalLetterGenerator;
