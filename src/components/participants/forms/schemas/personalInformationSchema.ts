
import * as z from 'zod';

// Personal Information Schema
export const personalInformationSchema = z.object({
  // Personal Information
  first_name: z.string().min(2, "First name is required"),
  middle_name: z.string().optional(),
  last_name: z.string().min(2, "Last name is required"),
  date_of_birth: z.date({ required_error: "Date of birth is required" }),
  social_security_number: z.string().regex(/^\d{3}-\d{2}-\d{4}$/, "Format must be XXX-XX-XXXX"),
  primary_phone: z.string().min(10, "Phone number is required"),
  primary_phone_type: z.enum(['cell', 'home', 'work']),
  secondary_phone: z.string().optional(),
  secondary_phone_type: z.enum(['cell', 'home', 'work']).optional(),
  email_address: z.string().email("Valid email is required"),
  home_address: z.string().min(5, "Street address is required"),
  home_city: z.string().min(2, "City is required"),
  home_state: z.string().min(2, "State is required"),
  home_zip_code: z.string().min(5, "ZIP code is required"),
  mailing_address: z.string().min(5, "Mailing address is required"),
  mailing_city: z.string().min(2, "Mailing city is required"),
  mailing_state: z.string().min(2, "Mailing state is required"),
  mailing_zip_code: z.string().min(5, "Mailing ZIP code is required"),
  marital_status: z.enum(['married', 'unmarried', 'separated']),
  spouse_name: z.string().optional(),
  dependents_count: z.number().min(0).optional(),
  liable_for_alimony: z.enum(['yes', 'no']),
  delinquent_child_support: z.enum(['yes', 'no']),
  us_government_employee: z.enum(['yes', 'no']),
  government_agency_position: z.string().optional(),
  us_citizen: z.enum(['yes', 'no']),
  alien_registration_number: z.string().optional(),
  itin_number: z.string().optional(),
  assets_in_trust: z.enum(['yes', 'no']),
  trust_description: z.string().optional(),
  
  // Education (repeatable)
  education: z.array(z.object({
    school_name: z.string().min(2, "School name is required"),
    degree_certification: z.string().min(2, "Degree/certification is required"),
    area_of_study: z.string().min(2, "Area of study is required"),
    start_date: z.date({ required_error: "Start date is required" }),
    end_date: z.date().optional(),
    graduated: z.boolean().optional(),
  })).min(1, "At least one education entry is required"),
  
  // Employment History (repeatable)
  employment_history: z.array(z.object({
    employer_name: z.string().min(2, "Employer name is required"),
    position_title: z.string().min(2, "Position/title is required"),
    start_date: z.date({ required_error: "Start date is required" }),
    end_date: z.date().optional(),
    current_position: z.boolean().optional(),
    responsibilities: z.string().min(10, "Responsibilities are required"),
    annual_salary: z.number().optional(),
    reason_for_leaving: z.string().optional(),
  })).min(1, "At least one employment entry is required"),
  
  // Professional References (repeatable, min 3)
  professional_references: z.array(z.object({
    reference_name: z.string().min(2, "Reference name is required"),
    relationship: z.string().min(2, "Relationship is required"),
    phone_number: z.string().min(10, "Phone number is required"),
    email_address: z.string().email("Valid email is required"),
  })).min(3, "Minimum of 3 professional references required"),
  
  // Business Ownership
  business_ownership: z.array(z.object({
    business_name: z.string().min(2, "Business name is required"),
    ownership_percentage: z.number().min(0).max(100),
    role_title: z.string().min(2, "Role/title is required"),
    start_date: z.date({ required_error: "Start date is required" }),
    end_date: z.date().optional(),
    current_ownership: z.boolean().optional(),
  })).optional(),
  
  // Military Service
  military_service: z.enum(['yes', 'no']),
  military_service_details: z.object({
    branch: z.string().optional(),
    start_date: z.date().optional(),
    end_date: z.date().optional(),
    rank: z.string().optional(),
    discharge_type: z.string().optional(),
  }).optional(),
  
  // Background Questions
  declared_bankrupt: z.enum(['yes', 'no']),
  bankruptcy_discharge_date: z.date().optional(),
  criminal_charges: z.enum(['yes', 'no']),
  criminal_details: z.string().optional(),
  federal_debt_delinquent: z.enum(['yes', 'no']),
  federal_debt_details: z.string().optional(),
  unsatisfied_judgments: z.enum(['yes', 'no']),
  judgment_details: z.string().optional(),
  foreclosure_party: z.enum(['yes', 'no']),
  foreclosure_details: z.string().optional(),
  business_failure: z.enum(['yes', 'no']),
  business_failure_details: z.string().optional(),
  pledged_property: z.enum(['yes', 'no']),
  pledged_property_details: z.string().optional(),
});

export type PersonalInformationFormValues = z.infer<typeof personalInformationSchema>;
