
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { FileText } from 'lucide-react';
import { useLender } from '@/contexts/LenderContext';
import { Project } from '@/types/project';
import { PreApprovalFormData } from './preApproval/PreApprovalFormData';
import { LenderInfoDisplay } from './preApproval/LenderInfoDisplay';
import { PreApprovalLetterActions } from './preApproval/PreApprovalLetterActions';
import { PreApprovalLetterPreview } from './preApproval/PreApprovalLetterPreview';
import { PreApprovalLetterHistory } from './preApproval/PreApprovalLetterHistory';
import { usePreApprovalLetter } from './preApproval/usePreApprovalLetter';

interface PreApprovalLetterGeneratorProps {
  project?: Project;
}

const PreApprovalLetterGenerator: React.FC<PreApprovalLetterGeneratorProps> = ({ project }) => {
  const { lenderInfo } = useLender();
  const {
    formData,
    showPreview,
    setShowPreview,
    handleInputChange,
    getCurrentRate,
    generateLetter,
    handleDownload,
    saveLetter,
    savedLetters,
    deleteLetter
  } = usePreApprovalLetter(project);

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
            {project && ` for ${project.project_name}`}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PreApprovalFormData
              formData={formData}
              onInputChange={handleInputChange}
              getCurrentRate={getCurrentRate}
              project={project}
            />
            <LenderInfoDisplay />
          </div>
          
          <Separator />
          
          <PreApprovalLetterActions
            showPreview={showPreview}
            onTogglePreview={() => setShowPreview(!showPreview)}
            onDownload={handleDownload}
            onSave={saveLetter}
          />
          
          {showPreview && (
            <PreApprovalLetterPreview letterContent={generateLetter()} />
          )}
        </CardContent>
      </Card>

      {savedLetters.length > 0 && (
        <PreApprovalLetterHistory
          letters={savedLetters}
          onDelete={deleteLetter}
          onDownload={(letterContent, applicantName, date) => {
            const blob = new Blob([letterContent], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Pre-Approval-Letter-${applicantName.replace(/\s+/g, '-')}-${date}.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          }}
        />
      )}
    </div>
  );
};

export default PreApprovalLetterGenerator;
