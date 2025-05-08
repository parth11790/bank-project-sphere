
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Form } from '@/components/ui/form';
import { sbaDropdownFields } from '@/lib/mockData/dropdownFields';
import { useAlertManager } from '@/components/alerts';
import { IntakeFormData } from './types/intakeTypes';
import { eligibilitySchema } from './forms/schemas/eligibilitySchema';
import { BasicEligibilitySection } from './forms/components/eligibility/BasicEligibilitySection';
import { BusinessTypeSection } from './forms/components/eligibility/BusinessTypeSection';
import { PrincipalStatusSection } from './forms/components/eligibility/PrincipalStatusSection';
import { AdditionalRequirementsSection } from './forms/components/eligibility/AdditionalRequirementsSection';
import { ScreeningStatusSection } from './forms/components/eligibility/ScreeningStatusSection';
import { InlineAlert } from './forms/components/eligibility/InlineAlert';

interface EligibilityQuestionnaireProps {
  formData: IntakeFormData;
  updateFormData: (data: Partial<IntakeFormData>) => void;
}

const EligibilityQuestionnaire: React.FC<EligibilityQuestionnaireProps> = ({ formData, updateFormData }) => {
  const alertManager = useAlertManager();
  
  // Get ineligible business types
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

  // Watch form values for inline alerts
  const isNotOperatingBusiness = form.watch('is_operating_business') === false;
  const isNotForProfit = form.watch('is_for_profit') === false;
  const isNotUSLocation = form.watch('is_us_location') === false;
  const hasIneligibleTypes = (form.watch('ineligible_business_types')?.length || 0) > 0;
  const watchedIneligibleTypes = form.watch('ineligible_business_types') || [];
  
  const principalIsIncarcerated = form.watch('principal_status.is_incarcerated') === true;
  const principalIsOnParole = form.watch('principal_status.is_on_parole') === true;
  const principalIsIndicted = form.watch('principal_status.is_indicted') === true;
  
  const hasPriorDebt = form.watch('has_prior_government_debt') === true;
  const hasRobsEsopInvolvement = form.watch('has_robs_esop_involvement') === true;

  const onSubmit = (values: z.infer<typeof eligibilitySchema>) => {
    updateFormData({
      ...values,
      // Make sure principal_status properties are properly set
      principal_status: {
        is_incarcerated: values.principal_status?.is_incarcerated ?? null,
        is_on_parole: values.principal_status?.is_on_parole ?? null,
        is_indicted: values.principal_status?.is_indicted ?? null,
      },
    });
    
    // Show success message
    alertManager.showSuccess("Form Saved", "Eligibility information has been successfully saved.");
  };

  // Update form data when values change
  React.useEffect(() => {
    const subscription = form.watch((value) => {
      // Make sure principal_status is properly defined with non-optional properties
      const principal_status = {
        is_incarcerated: value.principal_status?.is_incarcerated ?? null,
        is_on_parole: value.principal_status?.is_on_parole ?? null,
        is_indicted: value.principal_status?.is_indicted ?? null,
      };
      
      // Convert the schema-based form values to the app's IntakeFormData format
      updateFormData({
        is_operating_business: value.is_operating_business === undefined ? null : value.is_operating_business,
        is_for_profit: value.is_for_profit === undefined ? null : value.is_for_profit,
        is_us_location: value.is_us_location === undefined ? null : value.is_us_location,
        ineligible_business_types: value.ineligible_business_types || [],
        principal_status,
        has_prior_government_debt: value.has_prior_government_debt === undefined ? null : value.has_prior_government_debt,
        has_robs_esop_involvement: value.has_robs_esop_involvement === undefined ? null : value.has_robs_esop_involvement,
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
          <BasicEligibilitySection 
            form={form} 
            alerts={[
              {
                condition: isNotOperatingBusiness,
                title: "Eligibility Issue",
                description: "SBA loans require an operating business. This may disqualify the application.",
                severity: "error"
              },
              {
                condition: isNotForProfit,
                title: "Eligibility Issue",
                description: "SBA loans are only available for-profit businesses. This may disqualify the application.",
                severity: "error"
              },
              {
                condition: isNotUSLocation,
                title: "Eligibility Issue",
                description: "SBA loans require the business to be located in the United States. This may disqualify the application.",
                severity: "error"
              }
            ]}
          />
          <BusinessTypeSection 
            form={form} 
            ineligibleBusinessTypes={ineligibleBusinessTypes}
            hasIneligibleTypes={hasIneligibleTypes}
            watchedIneligibleTypes={watchedIneligibleTypes}
          />
          <PrincipalStatusSection 
            form={form}
            alerts={[
              {
                condition: principalIsIncarcerated,
                title: "Principal Status Issue",
                description: "An incarcerated principal typically disqualifies the application per SBA regulations.",
                severity: "error"
              },
              {
                condition: principalIsOnParole,
                title: "Principal Status Issue",
                description: "A principal on parole or probation requires additional review and may affect eligibility.",
                severity: "warning"
              },
              {
                condition: principalIsIndicted,
                title: "Principal Status Issue",
                description: "A principal under indictment may disqualify the application per SBA character requirements.",
                severity: "error"
              }
            ]}
          />
          <AdditionalRequirementsSection 
            form={form}
            alerts={[
              {
                condition: hasPriorDebt,
                title: "Prior Debt Warning",
                description: "Prior government debt requires additional documentation and may affect approval. Per SBA SOP 50 10 6, detailed repayment information will be needed.",
                severity: "warning"
              },
              {
                condition: hasRobsEsopInvolvement,
                title: "ROBS/ESOP Notice",
                description: "ROBS or ESOP involvement requires additional documentation and specialized review. Please note all 401(k)/IRA transfers.",
                severity: "warning"
              }
            ]}
          />
          <ScreeningStatusSection form={form} screeningStatusOptions={screeningStatusOptions} />
          
          <div className="flex justify-end mt-4">
            <button 
              type="submit" 
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
            >
              Save Eligibility Information
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EligibilityQuestionnaire;
