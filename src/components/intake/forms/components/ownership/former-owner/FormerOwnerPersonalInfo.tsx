
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Control } from 'react-hook-form';
import { OwnershipFormValues } from '../../../schemas/ownershipSchema';

interface FormerOwnerPersonalInfoProps {
  index: number;
  control: Control<OwnershipFormValues>;
  citizenshipOptions: string[];
}

export const FormerOwnerPersonalInfo: React.FC<FormerOwnerPersonalInfoProps> = ({ 
  index, 
  control, 
  citizenshipOptions 
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name={`former_owners.${index}.name`}
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
          name={`former_owners.${index}.tax_id`}
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
        name={`former_owners.${index}.address`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Address*</FormLabel>
            <FormControl>
              <Input placeholder="123 Main St, City, State, ZIP" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name={`former_owners.${index}.former_ownership_percentage`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Former Ownership Percentage*</FormLabel>
              <FormControl>
                <Input 
                  type="number"
                  placeholder="50"
                  min={0}
                  max={100}
                  step={0.01}
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value === '' ? 0 : parseFloat(value));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name={`former_owners.${index}.citizenship_status`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Citizenship Status*</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {citizenshipOptions.map((status) => (
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
      </div>
    </>
  );
};
