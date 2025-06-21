
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { PersonalInformationFormValues } from '../schemas/personalInformationSchema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BusinessExperienceSectionProps {
  form: UseFormReturn<PersonalInformationFormValues>;
}

export const BusinessExperienceSection: React.FC<BusinessExperienceSectionProps> = ({ form }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Business Experience</CardTitle>
      </CardHeader>
      <CardContent>
        <FormField
          control={form.control}
          name="business_experience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Please describe your business experience, including any ownership, management, or operational roles you have held.
              </FormLabel>
              <FormControl>
                <Textarea 
                  {...field} 
                  rows={8}
                  placeholder="Provide detailed information about your business experience, including company names, roles, responsibilities, and timeframes..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};
