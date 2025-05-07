
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { FormComponentProps } from '../types/intakeTypes';
import { eligibilitySchema, EligibilityFormValues } from './schemas/eligibilitySchema';
import { BasicEligibilitySection } from './components/eligibility/BasicEligibilitySection';
import { BusinessTypeSection } from './components/eligibility/BusinessTypeSection';
import { PrincipalStatusSection } from './components/eligibility/PrincipalStatusSection';
import { AdditionalRequirementsSection } from './components/eligibility/AdditionalRequirementsSection';
import { EligibilityAlerts } from './components/eligibility/EligibilityAlerts';
import { ScreeningStatusSection } from './components/eligibility/ScreeningStatusSection';

const EligibilityQuestionnaire: React.FC<FormComponentProps> = ({ formData, updateFormData }) => {
  // Get ineligible business types from mock data
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

  // Get screening status options
  const screeningStatusOptions = [
    'Pre-Qualified',
    'Pre-Approved',
    'Needs Additional Information',
    'Declined - Pre-Screening',
    'Withdrawn - Pre-Screening',
  ];

  // Create the form
  const form = useForm<EligibilityFormValues>({
    resolver: zodResolver(eligibilitySchema),
    defaultValues: {
      is_operating_business: formData.is_operating_business,
      is_for_profit: formData.is_for_profit,
      is_us_location: formData.is_us_location,
      ineligible_business_types: formData.ineligible_business_types || [],
      principal_status: {
        is_incarcerated: formData.principal_status.is_incarcerated,
        is_on_parole: formData.principal_status.is_on_parole,
        is_indicted: formData.principal_status.is_indicted,
      },
      has_prior_government_debt: formData.has_prior_government_debt,
      has_robs_esop_involvement: formData.has_robs_esop_involvement,
      pre_screening_status: formData.pre_screening_status || '',
      eligibility_notes: formData.eligibility_notes || '',
    },
  });

  // Watch form values for alerts
  const hasIneligibleTypes = (form.watch('ineligible_business_types') || []).length > 0;
  const principalStatus = form.watch('principal_status');
  const hasPrincipalStatusIssues = principalStatus?.is_incarcerated === true || 
                                  principalStatus?.is_on_parole === true || 
                                  principalStatus?.is_indicted === true;
  const hasPriorDebt = form.watch('has_prior_government_debt') === true;

  // Handle form submission
  const onSubmit = (values: EligibilityFormValues) => {
    updateFormData({
      ...values,
    });
  };

  // Update form data when values change
  React.useEffect(() => {
    const subscription = form.watch((value) => {
      // Convert the schema-based form values to the app's IntakeFormData format
      updateFormData({
        is_operating_business: value.is_operating_business,
        is_for_profit: value.is_for_profit,
        is_us_location: value.is_us_location,
        ineligible_business_types: value.ineligible_business_types || [],
        principal_status: {
          is_incarcerated: value.principal_status?.is_incarcerated || null,
          is_on_parole: value.principal_status?.is_on_parole || null,
          is_indicted: value.principal_status?.is_indicted || null,
        },
        has_prior_government_debt: value.has_prior_government_debt,
        has_robs_esop_involvement: value.has_robs_esop_involvement,
        pre_screening_status: value.pre_screening_status || '',
        eligibility_notes: value.eligibility_notes || '',
      });
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
          <BasicEligibilitySection form={form} />
          <BusinessTypeSection form={form} ineligibleBusinessTypes={ineligibleBusinessTypes} />
          <PrincipalStatusSection form={form} />
          <AdditionalRequirementsSection form={form} />
          
          <EligibilityAlerts 
            hasIneligibleTypes={hasIneligibleTypes}
            hasPrincipalStatusIssues={hasPrincipalStatusIssues}
            hasPriorDebt={hasPriorDebt}
          />
          
          <ScreeningStatusSection form={form} screeningStatusOptions={screeningStatusOptions} />
        </form>
      </Form>
    </div>
  );
};

export default EligibilityQuestionnaire;
