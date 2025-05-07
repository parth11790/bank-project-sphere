
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { eligibilitySchema } from '../../schemas/eligibilitySchema';

type FormData = z.infer<typeof eligibilitySchema>;

interface BasicEligibilitySectionProps {
  form: UseFormReturn<FormData>;
}

export const BasicEligibilitySection: React.FC<BasicEligibilitySectionProps> = ({ form }) => {
  return (
    <div className="space-y-4">
      <h4 className="text-md font-medium">Basic Eligibility</h4>
      
      <FormField
        control={form.control}
        name="is_operating_business"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Is this an operating business?</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={(value) => field.onChange(value === "true")}
                defaultValue={field.value !== undefined ? String(field.value) : undefined}
                className="flex items-center gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="true" id="operating-yes" />
                  <label htmlFor="operating-yes">Yes</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="false" id="operating-no" />
                  <label htmlFor="operating-no">No</label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="is_for_profit"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Is this a for-profit business?</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={(value) => field.onChange(value === "true")}
                defaultValue={field.value !== undefined ? String(field.value) : undefined}
                className="flex items-center gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="true" id="profit-yes" />
                  <label htmlFor="profit-yes">Yes</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="false" id="profit-no" />
                  <label htmlFor="profit-no">No</label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="is_us_location"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Is the business located in the United States?</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={(value) => field.onChange(value === "true")}
                defaultValue={field.value !== undefined ? String(field.value) : undefined}
                className="flex items-center gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="true" id="location-yes" />
                  <label htmlFor="location-yes">Yes</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="false" id="location-no" />
                  <label htmlFor="location-no">No</label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
