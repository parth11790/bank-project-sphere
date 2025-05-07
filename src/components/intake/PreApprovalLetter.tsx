import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormComponentProps } from './types/intakeTypes';

const preApprovalSchema = z.object({
  pre_approval_content: z.string().min(10, "Pre-approval content must be at least 10 characters."),
  preliminary_conditions: z.string().array().optional(),
  pre_approval_status: z.string({
    required_error: "Please select a pre-approval status.",
  }),
});

const preApprovalStatuses = ["Draft", "Approved", "Declined"];

const PreApprovalLetter: React.FC<FormComponentProps> = ({ formData, updateFormData }) => {
  const form = useForm<z.infer<typeof preApprovalSchema>>({
    resolver: zodResolver(preApprovalSchema),
    defaultValues: {
      pre_approval_content: formData.pre_approval_content,
      preliminary_conditions: formData.preliminary_conditions,
      pre_approval_status: formData.pre_approval_status,
    },
  });

  const onSubmit = (values: z.infer<typeof preApprovalSchema>) => {
    updateFormData({
      ...values,
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
        <h3 className="text-lg font-medium">Pre-Approval Letter</h3>
        <p className="text-sm text-muted-foreground">
          Configure the pre-approval letter content and status
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="pre_approval_content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pre-Approval Content*</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter the content for the pre-approval letter"
                    className="resize-none"
                    rows={6}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pre_approval_status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pre-Approval Status*</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {preApprovalStatuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default PreApprovalLetter;
