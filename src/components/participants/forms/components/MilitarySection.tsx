
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { DatePicker } from '@/components/ui/date-picker';
import { PersonalInformationFormValues } from '../schemas/personalInformationSchema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MilitarySectionProps {
  form: UseFormReturn<PersonalInformationFormValues>;
}

export const MilitarySection: React.FC<MilitarySectionProps> = ({ form }) => {
  const watchMilitaryService = form.watch('military_service');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Military Service</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="military_service"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Have you ever served in the U.S. Military?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-row space-x-6"
                >
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="font-normal">Yes</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal">No</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {watchMilitaryService === 'yes' && (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="military_branch"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Branch of Service</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="military_rank"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rank at Discharge</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <label className="text-sm font-medium mb-2 block">Dates of Service</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="military_start_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Start Date</FormLabel>
                      <FormControl>
                        <DatePicker selected={field.value} onSelect={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="military_end_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">End Date</FormLabel>
                      <FormControl>
                        <DatePicker selected={field.value} onSelect={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="discharge_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type of Discharge</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
