
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { format } from 'date-fns';
import { useLenderDropdowns } from '@/hooks/useLenderDropdowns';
import { FormComponentProps } from '../types/intakeTypes';
import { newLeadSchema, NewLeadFormValues } from './schemas/newLeadSchema';
import { ProjectInfoFields } from './components/ProjectInfoFields';
import { LeadSourceFields } from './components/LeadSourceFields';
import { BusinessInfoFields } from './components/BusinessInfoFields';
import { ContactInfoFields } from './components/ContactInfoFields';
import { LoanDetailsFields } from './components/LoanDetailsFields';
import { projectTypes, loanOfficers, states } from './data/formOptions';

const NewLeadForm: React.FC<FormComponentProps> = ({ formData, updateFormData }) => {
  const { getDropdownValues } = useLenderDropdowns();
  const leadSourceOptions = getDropdownValues('leadSource');
  
  const form = useForm<NewLeadFormValues>({
    resolver: zodResolver(newLeadSchema),
    defaultValues: {
      project_name: formData.project_name,
      project_type: formData.project_type,
      lead_source: formData.lead_source,
      assigned_loan_officer: formData.assigned_loan_officer,
      business_legal_name: formData.business_legal_name,
      business_dba_name: formData.business_dba_name || '',
      primary_contact_name: formData.primary_contact_name,
      primary_contact_email: formData.primary_contact_email,
      primary_contact_phone: formData.primary_contact_phone,
      requested_loan_amount: formData.requested_loan_amount,
      loan_purpose: formData.loan_purpose,
      city: formData.city,
      state: formData.state,
    },
  });

  const onSubmit = (values: NewLeadFormValues) => {
    updateFormData({
      ...values,
      date_entered: formData.date_entered || new Date().toISOString(),
    });
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
        <h3 className="text-lg font-medium">New Lead/Application Entry</h3>
        <p className="text-sm text-muted-foreground">
          Enter basic information about the new lead or application
        </p>
      </div>
      
      <div className="bg-muted/50 p-3 rounded-md">
        <p className="text-sm flex items-center gap-2">
          <span className="font-semibold">Date Entered:</span>
          {format(new Date(formData.date_entered), 'MMM d, yyyy h:mm a')}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <ProjectInfoFields form={form} projectTypes={projectTypes} />
          <LeadSourceFields form={form} loanOfficers={loanOfficers} leadSourceOptions={leadSourceOptions} />
          <BusinessInfoFields form={form} />
          <ContactInfoFields form={form} />
          <LoanDetailsFields form={form} states={states} />
        </form>
      </Form>
    </div>
  );
};

export default NewLeadForm;
