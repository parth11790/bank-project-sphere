
import * as z from 'zod';

export const eligibilitySchema = z.object({
  is_operating_business: z.boolean({
    required_error: "Please select yes or no",
  }).nullable(),
  is_for_profit: z.boolean({
    required_error: "Please select yes or no",
  }).nullable(),
  is_us_location: z.boolean({
    required_error: "Please select yes or no",
  }).nullable(),
  ineligible_business_types: z.array(z.string()).default([]),
  principal_status: z.object({
    is_incarcerated: z.boolean({
      required_error: "Please select yes or no",
    }).nullable(),
    is_on_parole: z.boolean({
      required_error: "Please select yes or no",
    }).nullable(),
    is_indicted: z.boolean({
      required_error: "Please select yes or no",
    }).nullable(),
  }),
  has_prior_government_debt: z.boolean({
    required_error: "Please select yes or no",
  }).nullable(),
  has_robs_esop_involvement: z.boolean({
    required_error: "Please select yes or no",
  }).nullable(),
  pre_screening_status: z.string({
    required_error: "Please select a status",
  }),
  eligibility_notes: z.string().optional(),
});

export type EligibilityFormValues = z.infer<typeof eligibilitySchema>;
