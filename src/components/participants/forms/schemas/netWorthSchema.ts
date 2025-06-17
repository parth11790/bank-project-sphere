
import * as z from 'zod';

// Net Worth Form Schema - specifically for individuals
export const netWorthSchema = z.object({
  // Participant Information
  participant_id: z.string().min(1, "Participant ID is required"),
  participant_name: z.string().min(2, "Participant name is required"),
  
  // Credit Information
  credit_individual_name: z.string().optional(),
  credit_individual_score: z.string().optional(),
  credit_individual_source: z.string().optional(),
  credit_individual_date: z.string().optional(),
  credit_spouse_name: z.string().optional(),
  credit_spouse_score: z.string().optional(),
  credit_spouse_source: z.string().optional(),
  credit_spouse_date: z.string().optional(),
  
  // Net Worth - Assets
  networth_cash_on_hand: z.string().optional(),
  networth_savings_accounts: z.string().optional(),
  networth_ira_retirement: z.string().optional(),
  networth_accounts_notes_receivable: z.string().optional(),
  networth_csvli_cash_value: z.string().optional(),
  networth_stocks_bonds: z.string().optional(),
  networth_real_estate_residence: z.string().optional(),
  networth_real_estate_commercial: z.string().optional(),
  networth_real_estate_investment: z.string().optional(),
  networth_real_estate_rental: z.string().optional(),
  networth_automobiles: z.string().optional(),
  networth_other_personal_property: z.string().optional(),
  networth_other_assets: z.string().optional(),
  
  // Net Worth - Liabilities
  networth_accounts_payable: z.string().optional(),
  networth_notes_payable_banks: z.string().optional(),
  networth_auto_loans: z.string().optional(),
  networth_other_installment: z.string().optional(),
  networth_loan_life_insurance: z.string().optional(),
  networth_education_loans: z.string().optional(),
  networth_mortgage_sfr: z.string().optional(),
  networth_mortgage_commercial: z.string().optional(),
  networth_mortgage_investment: z.string().optional(),
  networth_mortgage_rental: z.string().optional(),
  networth_unpaid_taxes: z.string().optional(),
  networth_margin_accounts: z.string().optional(),
  networth_other_liabilities: z.string().optional(),
});

export type NetWorthFormValues = z.infer<typeof netWorthSchema>;
