
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Participant } from '@/types/participant';

interface FormsAssignmentSectionProps {
  participant?: Participant;
}

const FormsAssignmentSection: React.FC<FormsAssignmentSectionProps> = ({ participant }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Forms Assignment</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Forms assignment functionality will be implemented here.</p>
      </CardContent>
    </Card>
  );
};

export default FormsAssignmentSection;
