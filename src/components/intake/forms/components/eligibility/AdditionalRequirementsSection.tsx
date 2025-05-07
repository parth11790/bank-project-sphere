
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { eligibilitySchema } from '../../schemas/eligibilitySchema';

type FormData = z.infer<typeof eligibilitySchema>;

interface AdditionalRequirementsSectionProps {
  form: UseFormReturn<FormData>;
}

export const AdditionalRequirementsSection: React.FC<AdditionalRequirementsSectionProps> = ({ form }) => {
  return (
    <div className="space-y-4">
      <h4 className="text-md font-medium">Additional Requirements</h4>
      
      <FormField
        control={form.control}
        name="has_prior_government_debt"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Does the business or any principal have prior government debt or loss?</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={(value) => field.onChange(value === "true")}
                defaultValue={field.value !== undefined ? String(field.value) : undefined}
                className="flex items-center gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="true" id="debt-yes" />
                  <label htmlFor="debt-yes">Yes</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="false" id="debt-no" />
                  <label htmlFor="debt-no">No</label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="has_robs_esop_involvement"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Is there ROBS (Rollovers as Business Startups) or ESOP involvement?</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={(value) => field.onChange(value === "true")}
                defaultValue={field.value !== undefined ? String(field.value) : undefined}
                className="flex items-center gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="true" id="robs-yes" />
                  <label htmlFor="robs-yes">Yes</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="false" id="robs-no" />
                  <label htmlFor="robs-no">No</label>
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
