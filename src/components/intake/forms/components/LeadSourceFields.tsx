
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { NewLeadFormValues } from '../schemas/newLeadSchema';

interface LeadSourceFieldsProps {
  form: UseFormReturn<NewLeadFormValues>;
  loanOfficers: { id: string; name: string; }[];
  leadSourceOptions: string[];
}

export const LeadSourceFields: React.FC<LeadSourceFieldsProps> = ({ 
  form, 
  loanOfficers, 
  leadSourceOptions 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="lead_source"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Lead Source*</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select lead source" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {leadSourceOptions.map((source) => (
                  <SelectItem key={source} value={source}>
                    {source}
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
        name="assigned_loan_officer"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Assigned Loan Officer*</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select loan officer" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {loanOfficers.map((officer) => (
                  <SelectItem key={officer.id} value={officer.id}>
                    {officer.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
