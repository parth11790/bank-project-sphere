
import * as z from 'zod';

// Schema for current owners
export const ownerSchema = z.object({
  name: z.string().min(2, "Owner name is required"),
  tax_id: z.string().min(4, "Tax ID is required"),
  address: z.string().min(5, "Address is required"),
  ownership_percentage: z.coerce.number()
    .min(0.01, "Percentage must be greater than 0")
    .max(100, "Percentage cannot exceed 100"),
  citizenship_status: z.string({
    required_error: "Citizenship status is required",
  }),
});

// Schema for former owners with additional fields
export const formerOwnerSchema = z.object({
  name: z.string().min(2, "Former owner name is required"),
  tax_id: z.string().min(4, "Tax ID is required"),
  address: z.string().min(5, "Address is required"),
  ownership_percentage: z.coerce.number()
    .min(0.01, "Percentage must be greater than 0")
    .max(100, "Percentage cannot exceed 100"),
  former_ownership_percentage: z.coerce.number()
    .min(0.01, "Percentage must be greater than 0")
    .max(100, "Percentage cannot exceed 100"),
  citizenship_status: z.string({
    required_error: "Citizenship status is required",
  }),
  date_ownership_ceased: z.date({
    required_error: "Date is required",
  }),
  is_still_associate: z.boolean({
    required_error: "This field is required",
  }),
  is_still_employed: z.boolean({
    required_error: "This field is required",
  }),
});

// Complete ownership form schema
export const ownershipSchema = z.object({
  current_owners: z.array(ownerSchema)
    .min(1, "At least one current owner is required"),
  former_owners: z.array(formerOwnerSchema).optional(),
});

// Export types
export type Owner = z.infer<typeof ownerSchema>;
export type FormerOwner = z.infer<typeof formerOwnerSchema>;
export type OwnershipFormValues = z.infer<typeof ownershipSchema>;
