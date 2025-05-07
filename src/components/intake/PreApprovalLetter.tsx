
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import * as z from 'zod';
import { 
  Form, FormControl, FormField, FormItem, 
  FormLabel, FormMessage 
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { 
  Card, CardContent, CardDescription, CardFooter, 
  CardHeader, CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Select, SelectContent, SelectItem, 
  SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { IntakeFormData } from './IntakeMultiStepForm';
import { toast } from 'sonner';
import { FileText, Plus, Trash2, Save, Download, Send } from 'lucide-react';
import { format } from 'date-fns';

const preApprovalSchema = z.object({
  pre_approval_content: z.string().min(50, "Letter content must be at least 50 characters"),
  preliminary_conditions: z.array(
    z.object({
      condition: z.string().min(3, "Condition text is required")
    })
  ),
  pre_approval_status: z.string({
    required_error: "Status is required"
  }),
});

interface PreApprovalLetterProps {
  formData: IntakeFormData;
  updateFormData: (data: Partial<IntakeFormData>) => void;
}

const PreApprovalLetter: React.FC<PreApprovalLetterProps> = ({ formData, updateFormData }) => {
  const [showPreview, setShowPreview] = useState(false);
  
  // Generate template content based on available formData
  const generateTemplateContent = () => {
    const currentDate = format(new Date(), 'MMMM d, yyyy');
    const businessName = formData.business_legal_name || "[BUSINESS NAME]";
    const contactName = formData.primary_contact_name || "[CONTACT NAME]";
    const loanAmount = formData.requested_loan_amount 
      ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(formData.requested_loan_amount)
      : "[LOAN AMOUNT]";
    
    return `${currentDate}

CONDITIONAL COMMITMENT / PRE-APPROVAL LETTER

Dear ${contactName},

We are pleased to inform you that ${businessName} has been conditionally approved for an SBA loan in the amount of ${loanAmount}, subject to the terms and conditions outlined in this letter.

PROJECT STRUCTURE:
- Total Project Cost: [TPC AMOUNT]
- Borrower Equity: [EQUITY REQUIREMENT] (Minimum [PERCENTAGE]%)
- Potential Loan Structure: [LOAN TYPE], [TERM] years, [INTEREST RATE]%

This pre-approval is conditional upon the receipt and satisfactory review of the following:

[LIST OF PRELIMINARY CONDITIONS]

COLLATERAL REQUIREMENTS:
This loan will be secured by a UCC filing on all business assets and potentially a lien on real estate involved in the transaction. Additional collateral may be required based on the final underwriting assessment.

INSURANCE REQUIREMENTS:
Standard hazard insurance will be required on all collateral. Life insurance may be required on key personnel.

DISCLAIMER:
This letter does not constitute a binding commitment to lend. Final approval is contingent upon satisfactory underwriting, verification of information provided, and compliance with SBA requirements. This pre-approval is valid for 90 days from the date of this letter.

Please contact us with any questions.

Sincerely,

[LOAN OFFICER NAME]
[TITLE]
[LENDER NAME]`;
  };
  
  // Default conditions
  const defaultConditions = [
    { condition: "Receipt and satisfactory review of business financial statements for the past three years" },
    { condition: "Receipt and satisfactory review of personal financial statements for all guarantors" },
    { condition: "Acceptable business credit report and FICO scores for all guarantors" },
    { condition: "Verification of equity injection prior to loan closing" },
  ];

  // Form setup with initial values
  const form = useForm<z.infer<typeof preApprovalSchema>>({
    resolver: zodResolver(preApprovalSchema),
    defaultValues: {
      pre_approval_content: formData.pre_approval_content || generateTemplateContent(),
      preliminary_conditions: formData.preliminary_conditions?.map(cond => ({ condition: cond })) || defaultConditions,
      pre_approval_status: formData.pre_approval_status || 'Draft',
    },
  });
  
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "preliminary_conditions",
  });
  
  const onSubmit = (values: z.infer<typeof preApprovalSchema>) => {
    updateFormData({
      pre_approval_content: values.pre_approval_content,
      preliminary_conditions: values.preliminary_conditions.map(item => item.condition),
      pre_approval_status: values.pre_approval_status,
    });
  };
  
  React.useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.pre_approval_content || value.preliminary_conditions || value.pre_approval_status) {
        updateFormData({
          pre_approval_content: value.pre_approval_content as string,
          preliminary_conditions: value.preliminary_conditions 
            ? (value.preliminary_conditions as {condition: string}[]).map(item => item.condition) 
            : [],
          pre_approval_status: value.pre_approval_status as string,
        });
      }
    });
    return () => subscription.unsubscribe();
  }, [form, updateFormData]);
  
  // Action handlers
  const handleSaveDraft = () => {
    form.handleSubmit(onSubmit)();
    toast.success("Pre-Approval Letter draft saved");
  };
  
  const handleGeneratePDF = () => {
    form.handleSubmit(onSubmit)();
    toast.success("PDF generated and saved to documents");
  };
  
  const handleSendViaBorrowerPortal = () => {
    form.handleSubmit(onSubmit)();
    toast.success("Pre-Approval Letter sent via Borrower Portal");
  };
  
  // Reset to template
  const handleResetToTemplate = () => {
    form.setValue('pre_approval_content', generateTemplateContent());
    toast.info("Letter reset to template");
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Pre-Approval Letter Generator</h3>
        <p className="text-sm text-muted-foreground">
          Generate a pre-approval letter based on project details
        </p>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant={form.watch('pre_approval_status') === 'Draft' ? 'outline' : 'default'}>
            {form.watch('pre_approval_status')}
          </Badge>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowPreview(!showPreview)}
        >
          {showPreview ? "Edit" : "Preview"}
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {!showPreview ? (
            <>
              <FormField
                control={form.control}
                name="pre_approval_content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Letter Content</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Edit letter content here"
                        className="min-h-[400px] font-mono text-sm"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <FormLabel>Preliminary Conditions</FormLabel>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => append({ condition: "" })}
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Condition
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {fields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-2">
                      <FormField
                        control={form.control}
                        name={`preliminary_conditions.${index}.condition`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input 
                                placeholder="Enter condition" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button 
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              
              <FormField
                control={form.control}
                name="pre_approval_status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Letter Status</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Draft">Draft</SelectItem>
                        <SelectItem value="Finalized">Finalized</SelectItem>
                        <SelectItem value="Sent to Borrower">Sent to Borrower</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex items-center justify-between">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleResetToTemplate}
                >
                  Reset to Template
                </Button>
                
                <div className="flex items-center gap-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleSaveDraft}
                  >
                    <Save className="h-4 w-4 mr-2" /> Save Draft
                  </Button>
                  <Button 
                    type="button"
                    onClick={handleGeneratePDF}
                  >
                    <Download className="h-4 w-4 mr-2" /> Generate PDF
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-center text-xl">
                  <FileText className="h-5 w-5 inline-block mr-2" />
                  Pre-Approval Letter Preview
                </CardTitle>
                <CardDescription className="text-center text-sm">
                  This is how the letter will appear when generated
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-white p-6 whitespace-pre-wrap font-mono text-sm border rounded-md">
                  {form.watch('pre_approval_content')}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button 
                  type="button"
                  onClick={handleSendViaBorrowerPortal}
                >
                  <Send className="h-4 w-4 mr-2" /> Transmit via Borrower Portal
                </Button>
              </CardFooter>
            </Card>
          )}
        </form>
      </Form>
    </div>
  );
};

export default PreApprovalLetter;
