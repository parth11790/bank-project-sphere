
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { 
  Form, FormControl, FormField, FormItem, 
  FormLabel, FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, SelectContent, SelectItem, 
  SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { sbaDropdownFields } from '@/lib/mockData/dropdownFields';
import { useLenderDropdowns } from '@/hooks/useLenderDropdowns';
import { IntakeFormData } from './types/intakeTypes';
import { format } from 'date-fns';
import { FundingPurposeSelection } from './forms/components/FundingPurposeSelection';
import { BusinessInfoFields } from './forms/components/BusinessInfoFields';

const newLeadSchema = z.object({
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
  participant_type: z.string({
    required_error: "Please select a participant type.",
  }),
  primary_contact_name: z.string().min(2, "Primary contact name is required."),
  primary_contact_email: z.string().email("Invalid email address."),
  primary_contact_phone: z.string().min(10, "Valid phone number is required."),
  requested_loan_amount: z.coerce.number().min(1, "Loan amount is required."),
  loan_purpose: z.string().min(10, "Brief description of loan purpose is required."),
  city: z.string().min(1, "City is required."),
  state: z.string().min(1, "State is required."),
});

interface NewLeadFormProps {
  formData: IntakeFormData;
  updateFormData: (data: Partial<IntakeFormData>) => void;
}

const projectTypes = ["Expansion", "Refi", "Acquisition", "Start up", "Equipment Purchase"];

// List of sample loan officers (in a real app would be fetched from API)
const loanOfficers = [
  { id: "1", name: "John Smith" },
  { id: "2", name: "Sarah Johnson" },
  { id: "3", name: "Michael Brown" },
  { id: "4", name: "Jessica Williams" },
  { id: "5", name: "David Miller" }
];

// List of US states
const states = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", 
  "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", 
  "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", 
  "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", 
  "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", 
  "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", 
  "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];

const NewLeadForm: React.FC<NewLeadFormProps> = ({ formData, updateFormData }) => {
  const { getDropdownValues } = useLenderDropdowns();
  const leadSourceOptions = getDropdownValues('leadSource');
  
  const form = useForm<z.infer<typeof newLeadSchema>>({
    resolver: zodResolver(newLeadSchema),
    defaultValues: {
      project_name: formData.project_name,
      project_type: formData.project_type,
      lead_source: formData.lead_source,
      assigned_loan_officer: formData.assigned_loan_officer,
      business_legal_name: formData.business_legal_name,
      business_dba_name: formData.business_dba_name || '',
      participant_type: formData.participant_type || '',
      primary_contact_name: formData.primary_contact_name,
      primary_contact_email: formData.primary_contact_email,
      primary_contact_phone: formData.primary_contact_phone,
      requested_loan_amount: formData.requested_loan_amount,
      loan_purpose: formData.loan_purpose,
      city: formData.city,
      state: formData.state,
    },
  });

  const onSubmit = (values: z.infer<typeof newLeadSchema>) => {
    updateFormData({
      ...values,
      date_entered: formData.date_entered || new Date().toISOString(),
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="project_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name*</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Commercial Real Estate Loan #12345" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="project_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Type*</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a project type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {projectTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Funding Purpose Selection */}
          <FundingPurposeSelection 
            form={form}
            formData={formData}
            updateFormData={updateFormData}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="lead_source"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lead Source*</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select lead source" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {leadSourceOptions.map((source) => (
                        <SelectItem key={source} value={source}>
                          {source}
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
              name="assigned_loan_officer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assigned Loan Officer*</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select loan officer" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {loanOfficers.map((officer) => (
                        <SelectItem key={officer.id} value={officer.id}>
                          {officer.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Business Information Fields */}
          <BusinessInfoFields form={form} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="primary_contact_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary Contact Name*</FormLabel>
                  <FormControl>
                    <Input placeholder="Contact name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="primary_contact_email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary Contact Email*</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="contact@example.com" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="primary_contact_phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary Contact Phone*</FormLabel>
                  <FormControl>
                    <Input 
                      type="tel"
                      placeholder="(555) 555-5555" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="requested_loan_amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Requested Loan Amount*</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="$0.00" 
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value === '' ? 0 : parseFloat(value));
                      }} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City*</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. San Francisco" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State*</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a state" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {states.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="loan_purpose"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brief Loan Purpose*</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Briefly describe the purpose of the loan"
                    className="resize-none"
                    rows={3}
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default NewLeadForm;
