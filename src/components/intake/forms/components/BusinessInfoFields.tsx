
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { NewLeadFormValues } from '../schemas/newLeadSchema';

interface BusinessInfoFieldsProps {
  form: UseFormReturn<NewLeadFormValues>;
}

const participantTypes = [
  "Primary Borrower",
  "Co-Borrower", 
  "Guarantor",
  "Owner",
  "Seller",
  "Affiliated Business",
  "Partner"
];

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

      <FormField
        control={form.control}
        name="participant_type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Participant Type*</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select participant type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {participantTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
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
