
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { NewLeadFormValues } from '../schemas/newLeadSchema';

interface BusinessInfoFieldsProps {
  form: UseFormReturn<NewLeadFormValues>;
}

export const BusinessInfoFields: React.FC<BusinessInfoFieldsProps> = ({ form }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="business_legal_name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Business Legal Name*</FormLabel>
            <FormControl>
              <Input placeholder="Enter legal business name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="business_dba_name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Business DBA Name</FormLabel>
            <FormControl>
              <Input placeholder="DBA name (if applicable)" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
