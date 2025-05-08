
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { eligibilitySchema } from '../../schemas/eligibilitySchema';

type FormData = z.infer<typeof eligibilitySchema>;

interface ScreeningStatusSectionProps {
  form: UseFormReturn<FormData>;
  screeningStatusOptions: string[];
}

export const ScreeningStatusSection: React.FC<ScreeningStatusSectionProps> = ({ 
  form, 
  screeningStatusOptions 
}) => {
  return (
    <div className="space-y-4">
      <h4 className="text-md font-medium">Final Assessment</h4>
      
      <FormField
        control={form.control}
        name="pre_screening_status"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Pre-Screening Status</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {screeningStatusOptions.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="eligibility_notes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Notes</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Add notes on eligibility decisions, especially for failures or items requiring further review"
                className="resize-none"
                rows={4}
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
