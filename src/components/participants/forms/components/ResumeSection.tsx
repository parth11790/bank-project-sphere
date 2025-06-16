
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { PersonalInformationFormValues } from '../schemas/personalInformationSchema';
import { EducationSection } from './EducationSection';
import { EmploymentSection } from './EmploymentSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface ResumeSectionProps {
  form: UseFormReturn<PersonalInformationFormValues>;
  participant?: any;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({ form, participant }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Resume Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div>
            <h3 className="text-base font-semibold mb-4">Education History</h3>
            <EducationSection form={form} participant={participant} />
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-base font-semibold mb-4">Employment History</h3>
            <EmploymentSection form={form} participant={participant} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
