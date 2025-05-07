
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { NewLeadFormValues } from '../schemas/newLeadSchema';

interface ContactInfoFieldsProps {
  form: UseFormReturn<NewLeadFormValues>;
}

export const ContactInfoFields: React.FC<ContactInfoFieldsProps> = ({ form }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <FormField
        control={form.control}
        name="primary_contact_name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Primary Contact Name*</FormLabel>
            <FormControl>
              <Input placeholder="Contact name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="primary_contact_email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Primary Contact Email*</FormLabel>
            <FormControl>
              <Input 
                type="email" 
                placeholder="contact@example.com" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="primary_contact_phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Primary Contact Phone*</FormLabel>
            <FormControl>
              <Input 
                type="tel"
                placeholder="(555) 555-5555" 
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
