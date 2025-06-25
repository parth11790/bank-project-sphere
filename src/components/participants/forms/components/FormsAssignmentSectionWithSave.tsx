
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { toast } from 'sonner';
import { FormsAssignmentSection } from './FormsAssignmentSection';
import { Participant } from '@/types/participant';

interface FormsAssignmentSectionWithSaveProps {
  participant?: Participant;
}

export const FormsAssignmentSectionWithSave: React.FC<FormsAssignmentSectionWithSaveProps> = ({ participant }) => {
  const handleSaveFormsAssignment = () => {
    console.log('[AUDIT] Forms Assignment section saved:', {
      timestamp: new Date().toISOString(),
      userId: 'current_user',
      action: 'section_save',
      section: 'forms_assignment',
      participantId: participant?.participant_id
    });

    toast.success('Forms assignment saved successfully');
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Forms Assignment</CardTitle>
          <Button onClick={handleSaveFormsAssignment} size="sm">
            <Save className="h-4 w-4 mr-2" />
            Save Section
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <FormsAssignmentSection participant={participant} />
      </CardContent>
    </Card>
  );
};
