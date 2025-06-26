
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PreApprovalLetterPreviewProps {
  letterContent: string;
}

export const PreApprovalLetterPreview: React.FC<PreApprovalLetterPreviewProps> = ({
  letterContent
}) => {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="text-lg">Letter Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <pre className="whitespace-pre-wrap text-sm font-mono bg-gray-50 p-4 rounded-lg overflow-auto max-h-96">
          {letterContent}
        </pre>
      </CardContent>
    </Card>
  );
};
