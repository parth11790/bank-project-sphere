
import React from 'react';
import { FormField, FormItem, FormLabel, FormDescription, FormControl, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { eligibilitySchema } from '../../schemas/eligibilitySchema';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { XOctagon } from 'lucide-react';

type FormData = z.infer<typeof eligibilitySchema>;

interface BusinessTypeSectionProps {
  form: UseFormReturn<FormData>;
  ineligibleBusinessTypes: string[];
  hasIneligibleTypes: boolean;
  watchedIneligibleTypes: string[];
}

export const BusinessTypeSection: React.FC<BusinessTypeSectionProps> = ({ 
  form, 
  ineligibleBusinessTypes,
  hasIneligibleTypes,
  watchedIneligibleTypes 
}) => {
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
            
            {hasIneligibleTypes && (
              <Alert variant="destructive" className="bg-red-50 mt-2">
                <XOctagon className="h-4 w-4" />
                <AlertDescription>
                  <span className="font-bold">Ineligible Business Type:</span> The selected business type(s) may not be eligible for SBA financing.
                  {watchedIneligibleTypes.length > 0 && (
                    <ul className="list-disc list-inside mt-1 ml-2">
                      {watchedIneligibleTypes.map(type => (
                        <li key={type} className="text-sm">{type}</li>
                      ))}
                    </ul>
                  )}
                </AlertDescription>
              </Alert>
            )}
          </FormItem>
        )}
      />
    </div>
  );
};
