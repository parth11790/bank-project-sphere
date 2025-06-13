
import * as z from 'zod';

// Personal Information Schema
export const personalInformationSchema = z.object({
  // Personal Information
  applicant_name: z.string().min(2, "Applicant name is required"),
  social_security_number: z.string().regex(/^\d{3}-\d{2}-\d{4}$/, "Format must be XXX-XX-XXXX"),
  date_of_birth: z.date({ required_error: "Date of birth is required" }),
  primary_phone_number: z.string().min(10, "Phone number is required"),
  primary_phone_type: z.string({ required_error: "Phone type is required" }),
  primary_phone_type_other: z.string().optional(),
  email_address: z.string().email("Valid email is required"),
  residence_address: z.string().min(5, "Street address is required"),
  residence_city: z.string().min(2, "City is required"),
  residence_state: z.string().min(2, "State is required"),
  residence_zip: z.string().min(5, "ZIP code is required"),
  residency_start_date: z.date({ required_error: "Start date is required" }),
  residency_end_date: z.date().optional(),
  marital_status: z.enum(['married', 'unmarried', 'separated']),
  liable_for_alimony: z.enum(['yes', 'no']),
  delinquent_child_support: z.enum(['yes', 'no']),
  us_government_employee: z.enum(['yes', 'no']),
  government_agency_position: z.string().optional(),
  us_citizen: z.enum(['yes', 'no']),
  alien_registration_number: z.string().optional(),
  itin_number: z.string().optional(),
  business_applicant_name: z.string().min(2, "Business name is required"),
  ownership_percentage: z.coerce.number().min(0).max(100, "Must be between 0-100%"),
  assets_in_trust: z.enum(['yes', 'no']),
  trust_description: z.string().optional(),
  
  // Education (repeatable)
  education: z.array(z.object({
    school_name: z.string().min(2, "School name is required"),
    degree_certification: z.string().min(2, "Degree/certification is required"),
    area_of_study: z.string().min(2, "Area of study is required"),
    start_date: z.date({ required_error: "Start date is required" }),
    end_date: z.date().optional(),
  })).min(1, "At least one education entry is required"),
  
  // Employment History (repeatable)
  employment_history: z.array(z.object({
    employer_name: z.string().min(2, "Employer name is required"),
    position_title: z.string().min(2, "Position/title is required"),
    start_date: z.date({ required_error: "Start date is required" }),
    end_date: z.date().optional(),
    responsibilities: z.string().min(10, "Responsibilities are required"),
    reason_for_leaving: z.string().min(5, "Reason for leaving is required"),
  })).min(1, "At least one employment entry is required"),
  
  // Professional References (repeatable, min 3)
  professional_references: z.array(z.object({
    reference_name: z.string().min(2, "Reference name is required"),
    relationship: z.string().min(2, "Relationship is required"),
    phone_number: z.string().min(10, "Phone number is required"),
    email_address: z.string().email("Valid email is required"),
  })).min(3, "Minimum of 3 professional references required"),
  
  // Business Experience
  business_experience: z.string().min(20, "Please provide detailed business experience"),
  
  // Military Service
  military_service: z.enum(['yes', 'no']),
  military_branch: z.string().optional(),
  military_rank: z.string().optional(),
  military_start_date: z.date().optional(),
  military_end_date: z.date().optional(),
  discharge_type: z.string().optional(),
  
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
  
  // Certification
  certification_name: z.string().min(2, "Name for certification is required"),
  certification_date: z.date({ required_error: "Certification date is required" }),
});

export type PersonalInformationFormValues = z.infer<typeof personalInformationSchema>;
