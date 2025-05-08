
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { DatePicker } from '@/components/ui/date-picker';
import { Control } from 'react-hook-form';
import { OwnershipFormValues } from '../../../schemas/ownershipSchema';

interface FormerOwnerStatusProps {
  index: number;
  control: Control<OwnershipFormValues>;
}

export const FormerOwnerStatus: React.FC<FormerOwnerStatusProps> = ({ 
  index, 
  control 
}) => {
  return (
    <>
      <FormField
        control={control}
        name={`former_owners.${index}.date_ownership_ceased`}
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Date Ownership Ceased*</FormLabel>
            <FormControl>
              <DatePicker
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) => date > new Date() || date < new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
              />
            </FormControl>
            <FormDescription>
              Must be within the past 6 months for lookback requirement
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name={`former_owners.${index}.is_still_associate`}
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Is this person still an officer, director, or key employee?*</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={(value) => field.onChange(value === "true")}
                defaultValue={field.value !== undefined ? String(field.value) : undefined}
                className="flex items-center gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="true" id={`associate-yes-${index}`} />
                  <label htmlFor={`associate-yes-${index}`}>Yes</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="false" id={`associate-no-${index}`} />
                  <label htmlFor={`associate-no-${index}`}>No</label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name={`former_owners.${index}.is_still_employed`}
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Is this person still employed by the business?*</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={(value) => field.onChange(value === "true")}
                defaultValue={field.value !== undefined ? String(field.value) : undefined}
                className="flex items-center gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="true" id={`employed-yes-${index}`} />
                  <label htmlFor={`employed-yes-${index}`}>Yes</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="false" id={`employed-no-${index}`} />
                  <label htmlFor={`employed-no-${index}`}>No</label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
