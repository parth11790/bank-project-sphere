
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { DatePicker } from '@/components/ui/date-picker';
import { PersonalInformationFormValues } from '../schemas/personalInformationSchema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CertificationSectionProps {
  form: UseFormReturn<PersonalInformationFormValues>;
}

export const CertificationSection: React.FC<CertificationSectionProps> = ({ form }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Certification</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="certification_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Applicant/Guarantor Name (for certification)</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="certification_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date (for certification)</FormLabel>
              <FormControl>
                <DatePicker selected={field.value} onSelect={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};
