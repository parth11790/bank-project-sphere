
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { 
  Form, FormControl, FormField, FormItem, 
  FormLabel, FormMessage, FormDescription 
} from '@/components/ui/form';
import { 
  Select, SelectContent, SelectItem, 
  SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { sbaDropdownFields } from '@/lib/mockData/dropdownFields';
import { IntakeFormData } from './IntakeMultiStepForm';

const eligibilitySchema = z.object({
  is_operating_business: z.boolean({
    required_error: "Please select yes or no",
  }),
  is_for_profit: z.boolean({
    required_error: "Please select yes or no",
  }),
  is_us_location: z.boolean({
    required_error: "Please select yes or no",
  }),
  ineligible_business_types: z.array(z.string()).optional(),
  principal_status: z.object({
    is_incarcerated: z.boolean({
      required_error: "Please select yes or no",
    }),
    is_on_parole: z.boolean({
      required_error: "Please select yes or no",
    }),
    is_indicted: z.boolean({
      required_error: "Please select yes or no",
    }),
  }),
  has_prior_government_debt: z.boolean({
    required_error: "Please select yes or no",
  }),
  has_robs_esop_involvement: z.boolean({
    required_error: "Please select yes or no",
  }),
  pre_screening_status: z.string({
    required_error: "Please select a status",
  }),
  eligibility_notes: z.string().optional(),
});

interface EligibilityQuestionnaireProps {
  formData: IntakeFormData;
  updateFormData: (data: Partial<IntakeFormData>) => void;
}

const EligibilityQuestionnaire: React.FC<EligibilityQuestionnaireProps> = ({ formData, updateFormData }) => {
  // Get ineligible business types from the SBA-defined dropdown fields
  const ineligibleBusinessTypes = React.useMemo(() => {
    const field = sbaDropdownFields.find(field => field.id === 'ineligibleBusinessType');
    return field?.initialValues || [];
  }, []);

  // Get screening status options
  const screeningStatusOptions = React.useMemo(() => {
    return [
      'Pre-Qualified',
      'Pre-Approved',
      'Needs Additional Information',
      'Declined - Pre-Screening',
      'Withdrawn - Pre-Screening',
    ];
  }, []);

  const form = useForm<z.infer<typeof eligibilitySchema>>({
    resolver: zodResolver(eligibilitySchema),
    defaultValues: {
      is_operating_business: formData.is_operating_business === null ? undefined : formData.is_operating_business,
      is_for_profit: formData.is_for_profit === null ? undefined : formData.is_for_profit,
      is_us_location: formData.is_us_location === null ? undefined : formData.is_us_location,
      ineligible_business_types: formData.ineligible_business_types || [],
      principal_status: {
        is_incarcerated: formData.principal_status.is_incarcerated === null ? undefined : formData.principal_status.is_incarcerated,
        is_on_parole: formData.principal_status.is_on_parole === null ? undefined : formData.principal_status.is_on_parole,
        is_indicted: formData.principal_status.is_indicted === null ? undefined : formData.principal_status.is_indicted,
      },
      has_prior_government_debt: formData.has_prior_government_debt === null ? undefined : formData.has_prior_government_debt,
      has_robs_esop_involvement: formData.has_robs_esop_involvement === null ? undefined : formData.has_robs_esop_involvement,
      pre_screening_status: formData.pre_screening_status || '',
      eligibility_notes: formData.eligibility_notes || '',
    },
  });

  const hasIneligibleTypes = form.watch('ineligible_business_types')?.length > 0;
  const principalStatusIssues = form.watch('principal_status');
  const hasPrincipalStatusIssues = principalStatusIssues?.is_incarcerated || 
                                  principalStatusIssues?.is_on_parole || 
                                  principalStatusIssues?.is_indicted;
  const hasPriorDebt = form.watch('has_prior_government_debt');
  
  const showAlerts = hasIneligibleTypes || hasPrincipalStatusIssues || hasPriorDebt;

  const onSubmit = (values: z.infer<typeof eligibilitySchema>) => {
    updateFormData({
      ...values,
    });
  };

  React.useEffect(() => {
    const subscription = form.watch((value) => {
      updateFormData(value as Partial<IntakeFormData>);
    });
    return () => subscription.unsubscribe();
  }, [form, updateFormData]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Initial SBA Eligibility Questionnaire</h3>
        <p className="text-sm text-muted-foreground">
          Complete the questionnaire to determine preliminary SBA eligibility
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
          
          <div className="space-y-4">
            <h4 className="text-md font-medium">Principal Status</h4>
            
            <FormField
              control={form.control}
              name="principal_status.is_incarcerated"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Is any principal currently incarcerated?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => field.onChange(value === "true")}
                      defaultValue={field.value !== undefined ? String(field.value) : undefined}
                      className="flex items-center gap-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="incarcerated-yes" />
                        <label htmlFor="incarcerated-yes">Yes</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id="incarcerated-no" />
                        <label htmlFor="incarcerated-no">No</label>
                      </div>
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
                  <FormLabel>Is any principal currently on parole or probation?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => field.onChange(value === "true")}
                      defaultValue={field.value !== undefined ? String(field.value) : undefined}
                      className="flex items-center gap-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="parole-yes" />
                        <label htmlFor="parole-yes">Yes</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id="parole-no" />
                        <label htmlFor="parole-no">No</label>
                      </div>
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
                  <FormLabel>Is any principal currently under indictment?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => field.onChange(value === "true")}
                      defaultValue={field.value !== undefined ? String(field.value) : undefined}
                      className="flex items-center gap-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="indicted-yes" />
                        <label htmlFor="indicted-yes">Yes</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id="indicted-no" />
                        <label htmlFor="indicted-no">No</label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
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
          
          {showAlerts && (
            <Alert variant="destructive" className="bg-red-50">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <span className="font-bold">Warning:</span> This application has eligibility issues that require further review:
                <ul className="list-disc list-inside mt-2">
                  {hasIneligibleTypes && <li>Ineligible business type selected</li>}
                  {hasPrincipalStatusIssues && <li>Principal status issues identified</li>}
                  {hasPriorDebt && <li>Prior government debt reported</li>}
                </ul>
              </AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="pre_screening_status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pre-Screening Status</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {screeningStatusOptions.map((status) => (
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
            
            <FormField
              control={form.control}
              name="eligibility_notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Add notes on eligibility decisions, especially for failures or items requiring further review"
                      className="resize-none"
                      rows={4}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EligibilityQuestionnaire;
