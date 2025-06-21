import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { PersonalInformationFormValues } from '../schemas/personalInformationSchema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
interface BusinessExperienceSectionProps {
  form: UseFormReturn<PersonalInformationFormValues>;
}
export const BusinessExperienceSection: React.FC<BusinessExperienceSectionProps> = ({
  form
}) => {
  return <Card>
      
      
    </Card>;
};