import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { DatePicker } from '@/components/ui/date-picker';
import { PersonalInformationFormValues } from '../schemas/personalInformationSchema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BackgroundSectionProps {
  form: UseFormReturn<PersonalInformationFormValues>;
}

export const BackgroundSection: React.FC<BackgroundSectionProps> = ({ form }) => {
  const watchBankrupt = form.watch('declared_bankrupt');
  const watchCriminal = form.watch('criminal_charges');
  const watchFederalDebt = form.watch('federal_debt_delinquent');
  const watchJudgments = form.watch('unsatisfied_judgments');
  const watchForeclosure = form.watch('foreclosure_party');
  const watchBusinessFailure = form.watch('business_failure');
  const watchPledgedProperty = form.watch('pledged_property');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Background Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <FormField
            control={form.control}
            name="declared_bankrupt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Have you ever been declared bankrupt?</FormLabel>
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

          {watchBankrupt === 'yes' && (
            <FormField
              control={form.control}
              name="bankruptcy_discharge_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discharge date (Bankruptcy)</FormLabel>
                  <FormControl>
                    <DatePicker selected={field.value} onSelect={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="criminal_charges"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Have you ever been charged with or arrested for any criminal offense other than a minor motor vehicle violation?</FormLabel>
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

          {watchCriminal === 'yes' && (
            <FormField
              control={form.control}
              name="criminal_details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Please provide details, including dates and locations (Criminal Offense)</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="federal_debt_delinquent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Are you delinquent on any federal debt?</FormLabel>
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

          {watchFederalDebt === 'yes' && (
            <FormField
              control={form.control}
              name="federal_debt_details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Please explain (Federal Debt Delinquency)</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="unsatisfied_judgments"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Are you subject to any unsatisfied judgments?</FormLabel>
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

          {watchJudgments === 'yes' && (
            <FormField
              control={form.control}
              name="judgment_details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Please explain (Unsatisfied Judgments)</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="foreclosure_party"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Have you ever been a party to a foreclosure?</FormLabel>
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

          {watchForeclosure === 'yes' && (
            <FormField
              control={form.control}
              name="foreclosure_details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Please explain (Foreclosure)</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="business_failure"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Has any business in which you have been a principal ever failed in business, or been involved in bankruptcy or any legal proceeding for adjustment of debt?</FormLabel>
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

          {watchBusinessFailure === 'yes' && (
            <FormField
              control={form.control}
              name="business_failure_details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Please explain (Business Failure/Bankruptcy)</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="pledged_property"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Is any of your property pledged as collateral on a loan, obligation, or debt of another person or entity?</FormLabel>
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

          {watchPledgedProperty === 'yes' && (
            <FormField
              control={form.control}
              name="pledged_property_details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Please explain (Pledged Property)</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};
