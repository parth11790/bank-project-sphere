import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { FormComponentProps } from '../types/intakeTypes';

const eligibilitySchema = z.object({
  is_operating_business: z.boolean().nullable(),
  is_for_profit: z.boolean().nullable(),
  is_us_location: z.boolean().nullable(),
  ineligible_business_types: z.string().array(),
  principal_status: z.object({
    is_incarcerated: z.boolean().nullable(),
    is_on_parole: z.boolean().nullable(),
    is_indicted: z.boolean().nullable(),
  }),
  has_prior_government_debt: z.boolean().nullable(),
  has_robs_esop_involvement: z.boolean().nullable(),
  pre_screening_status: z.string(),
  eligibility_notes: z.string(),
});

const ineligibleBusinessTypes = [
  "Lending/Investment (Primary Activity)",
  "Passive Business (Landlord/Developer - Non-EPC)",
  "Passive Business (Rental Model - Non-Compliant)",
  "Life Insurance Carrier",
  "Located Outside U.S.",
  "Pyramid/Multilevel Sales",
  "Gambling (>1/3 Revenue or Primary Purpose)",
  "Illegal Activity (Federal/State/Local)",
  "Discriminatory Practices (Patronage/Hiring)",
  "Government-Owned (Non-Tribal)",
  "Loan Packager (>1/3 Revenue)",
  "Speculative Activity",
  "Other (Specify)"
];

const preScreeningStatuses = [
  "New Lead",
  "Contact Attempted",
  "Contact Made",
  "Pre-Screening Started",
  "Initial Docs Requested",
  "Initial Docs Received",
  "Pre-Qualified",
  "Pre-Approved",
  "Additional Info Needed",
  "Declined - Pre-Screening",
  "Withdrawn - Pre-Screening"
];

const EligibilityQuestionnaire: React.FC<FormComponentProps> = ({ formData, updateFormData }) => {
  const form = useForm<z.infer<typeof eligibilitySchema>>({
    resolver: zodResolver(eligibilitySchema),
    defaultValues: {
      is_operating_business: formData.is_operating_business,
      is_for_profit: formData.is_for_profit,
      is_us_location: formData.is_us_location,
      ineligible_business_types: formData.ineligible_business_types,
      principal_status: {
        is_incarcerated: formData.principal_status.is_incarcerated,
        is_on_parole: formData.principal_status.is_on_parole,
        is_indicted: formData.principal_status.is_indicted,
      },
      has_prior_government_debt: formData.has_prior_government_debt,
      has_robs_esop_involvement: formData.has_robs_esop_involvement,
      pre_screening_status: formData.pre_screening_status,
      eligibility_notes: formData.eligibility_notes,
    },
  });

  const onSubmit = (values: z.infer<typeof eligibilitySchema>) => {
    updateFormData(values);
  };

  React.useEffect(() => {
    const subscription = form.watch((value) => {
      updateFormData(value as Partial<typeof formData>);
    });
    return () => subscription.unsubscribe();
  }, [form, updateFormData]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Eligibility Questionnaire</h3>
        <p className="text-sm text-muted-foreground">
          Answer the following questions to determine eligibility
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="is_operating_business"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Is the business currently operating?</FormLabel>
                    <FormControl>
                      <RadioGroup 
                        onValueChange={field.onChange} 
                        defaultValue={String(field.value)} 
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <RadioGroupItem value="true" id="operating-yes" />
                          <FormLabel htmlFor="operating-yes">Yes</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <RadioGroupItem value="false" id="operating-no" />
                          <FormLabel htmlFor="operating-no">No</FormLabel>
                        </FormItem>
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
                    <FormLabel>Is the business for profit?</FormLabel>
                    <FormControl>
                      <RadioGroup 
                        onValueChange={field.onChange} 
                        defaultValue={String(field.value)} 
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <RadioGroupItem value="true" id="profit-yes" />
                          <FormLabel htmlFor="profit-yes">Yes</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <RadioGroupItem value="false" id="profit-no" />
                          <FormLabel htmlFor="profit-no">No</FormLabel>
                        </FormItem>
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
                    <FormLabel>Is the business located in the US?</FormLabel>
                    <FormControl>
                      <RadioGroup 
                        onValueChange={field.onChange} 
                        defaultValue={String(field.value)} 
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <RadioGroupItem value="true" id="us-yes" />
                          <FormLabel htmlFor="us-yes">Yes</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <RadioGroupItem value="false" id="us-no" />
                          <FormLabel htmlFor="us-no">No</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="ineligible_business_types"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Ineligible Business Types</FormLabel>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {ineligibleBusinessTypes.map((type) => (
                        <FormField
                          key={type}
                          control={form.control}
                          name="ineligible_business_types"
                          render={({ field }) => {
                            return (
                              <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(type)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, type])
                                        : field.onChange(field.value?.filter((value) => value !== type))
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {type}
                                </FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-4">
              <h4 className="text-sm font-medium">Principal Status</h4>
              <FormField
                control={form.control}
                name="principal_status.is_incarcerated"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Is any principal incarcerated?</FormLabel>
                    <FormControl>
                      <RadioGroup 
                        onValueChange={field.onChange} 
                        defaultValue={String(field.value)} 
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <RadioGroupItem value="true" id="incarcerated-yes" />
                          <FormLabel htmlFor="incarcerated-yes">Yes</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <RadioGroupItem value="false" id="incarcerated-no" />
                          <FormLabel htmlFor="incarcerated-no">No</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="principal_status.is_on_parole"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Is any principal on parole?</FormLabel>
                    <FormControl>
                      <RadioGroup 
                        onValueChange={field.onChange} 
                        defaultValue={String(field.value)} 
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <RadioGroupItem value="true" id="parole-yes" />
                          <FormLabel htmlFor="parole-yes">Yes</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <RadioGroupItem value="false" id="parole-no" />
                          <FormLabel htmlFor="parole-no">No</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="principal_status.is_indicted"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Is any principal indicted?</FormLabel>
                    <FormControl>
                      <RadioGroup 
                        onValueChange={field.onChange} 
                        defaultValue={String(field.value)} 
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <RadioGroupItem value="true" id="indicted-yes" />
                          <FormLabel htmlFor="indicted-yes">Yes</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <RadioGroupItem value="false" id="indicted-no" />
                          <FormLabel htmlFor="indicted-no">No</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="has_prior_government_debt"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Has the business or any principal had prior government debt?</FormLabel>
                    <FormControl>
                      <RadioGroup 
                        onValueChange={field.onChange} 
                        defaultValue={String(field.value)} 
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <RadioGroupItem value="true" id="government-debt-yes" />
                          <FormLabel htmlFor="government-debt-yes">Yes</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <RadioGroupItem value="false" id="government-debt-no" />
                          <FormLabel htmlFor="government-debt-no">No</FormLabel>
                        </FormItem>
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
                    <FormLabel>Is there any ROBS/ESOP involvement?</FormLabel>
                    <FormControl>
                      <RadioGroup 
                        onValueChange={field.onChange} 
                        defaultValue={String(field.value)} 
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <RadioGroupItem value="true" id="robs-esop-yes" />
                          <FormLabel htmlFor="robs-esop-yes">Yes</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <RadioGroupItem value="false" id="robs-esop-no" />
                          <FormLabel htmlFor="robs-esop-no">No</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="pre_screening_status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pre-Screening Status</FormLabel>
                    <FormControl>
                      <select {...field} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                        <option value="">Select a status</option>
                        {preScreeningStatuses.map((status) => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="eligibility_notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Eligibility Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter any notes regarding eligibility"
                        className="resize-none"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default EligibilityQuestionnaire;
