
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Control } from 'react-hook-form';
import { OwnershipFormValues } from '../../../schemas/ownershipSchema';

interface CurrentOwnerPersonalInfoProps {
  index: number;
  control: Control<OwnershipFormValues>;
  citizenshipOptions: string[];
}

export const CurrentOwnerPersonalInfo: React.FC<CurrentOwnerPersonalInfoProps> = ({ 
  index, 
  control,
  citizenshipOptions
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name={`current_owners.${index}.name`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name*</FormLabel>
              <FormControl>
                <Input placeholder="Legal full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name={`current_owners.${index}.tax_id`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>SSN/EIN*</FormLabel>
              <FormControl>
                <Input placeholder="XXX-XX-XXXX or XX-XXXXXXX" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <FormField
        control={control}
        name={`current_owners.${index}.address`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Current Address*</FormLabel>
            <FormControl>
              <Input placeholder="123 Main St, City, State, ZIP" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
