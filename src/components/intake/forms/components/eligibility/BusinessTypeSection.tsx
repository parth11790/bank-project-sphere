
import React from 'react';
import { FormField, FormItem, FormLabel, FormDescription, FormControl, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { eligibilitySchema } from '../../schemas/eligibilitySchema';

type FormData = z.infer<typeof eligibilitySchema>;

interface BusinessTypeSectionProps {
  form: UseFormReturn<FormData>;
  ineligibleBusinessTypes: string[];
}

export const BusinessTypeSection: React.FC<BusinessTypeSectionProps> = ({ form, ineligibleBusinessTypes }) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="ineligible_business_types"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Does the business fall under any ineligible business type?</FormLabel>
            <FormDescription>
              Select all that apply. If none apply, leave blank.
            </FormDescription>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
              {ineligibleBusinessTypes.map((type) => (
                <FormItem key={type} className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value?.includes(type)}
                      onCheckedChange={(checked) => {
                        const updatedValue = checked
                          ? [...(field.value || []), type]
                          : (field.value || []).filter((value) => value !== type);
                        field.onChange(updatedValue);
                      }}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal">
                    {type}
                  </FormLabel>
                </FormItem>
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
