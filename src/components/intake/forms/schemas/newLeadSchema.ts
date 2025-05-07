
import * as z from 'zod';

export const newLeadSchema = z.object({
  project_name: z.string().min(3, "Project name must be at least 3 characters."),
  project_type: z.string({
    required_error: "Please select a project type.",
  }),
  lead_source: z.string({
    required_error: "Please select the lead source.",
  }),
  assigned_loan_officer: z.string({
    required_error: "Please select a loan officer.",
  }),
  business_legal_name: z.string().min(2, "Business legal name is required."),
  business_dba_name: z.string().optional(),
  primary_contact_name: z.string().min(2, "Primary contact name is required."),
  primary_contact_email: z.string().email("Invalid email address."),
  primary_contact_phone: z.string().min(10, "Valid phone number is required."),
  requested_loan_amount: z.coerce.number().min(1, "Loan amount is required."),
  loan_purpose: z.string().min(10, "Brief description of loan purpose is required."),
  city: z.string().min(1, "City is required."),
  state: z.string().min(1, "State is required."),
});

export type NewLeadFormValues = z.infer<typeof newLeadSchema>;
