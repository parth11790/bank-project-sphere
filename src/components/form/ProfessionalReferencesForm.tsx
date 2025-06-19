
import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import * as z from 'zod';

const professionalReferencesSchema = z.object({
  professional_references: z.array(z.object({
    reference_name: z.string().min(2, "Reference name is required"),
    relationship: z.string().min(2, "Relationship is required"),
    phone_number: z.string().min(10, "Phone number is required"),
    email_address: z.string().email("Valid email is required"),
  })).min(3, "Minimum of 3 professional references required"),
});

type ProfessionalReferencesFormValues = z.infer<typeof professionalReferencesSchema>;

interface ProfessionalReferencesFormProps {
  formValues: Record<string, string>;
  onInputChange: (field: string, value: string) => void;
}

const ProfessionalReferencesForm: React.FC<ProfessionalReferencesFormProps> = ({ 
  formValues, 
  onInputChange 
}) => {
  const form = useForm<ProfessionalReferencesFormValues>({
    resolver: zodResolver(professionalReferencesSchema),
    defaultValues: {
      professional_references: [
        { 
          reference_name: 'Tom Harrison', 
          relationship: 'Former Regional Director at REI', 
          phone_number: '(206) 555-1111', 
          email_address: 'tharrison@rei.com' 
        },
        { 
          reference_name: 'Susan Park', 
          relationship: 'Business Mentor', 
          phone_number: '(206) 555-2222', 
          email_address: 'spark@seattlebusiness.org' 
        },
        { 
          reference_name: 'Robert Chen', 
          relationship: 'Supplier Partner', 
          phone_number: '(206) 555-3999', 
          email_address: 'rchen@outdoorgear.com' 
        }
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'professional_references',
  });

  const addReference = () => {
    append({
      reference_name: '',
      relationship: '',
      phone_number: '',
      email_address: '',
    });
  };

  const handleSave = () => {
    toast.success('Professional references saved successfully');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Professional References</h3>
          <p className="text-sm text-muted-foreground">Minimum of 3 references required</p>
        </div>
        <Button type="button" onClick={addReference} variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Add Reference
        </Button>
      </div>

      <Form {...form}>
        <div className="space-y-6">
          {fields.map((field, index) => (
            <Card key={field.id} className="relative">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base">Reference #{index + 1}</CardTitle>
                  {fields.length > 3 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => remove(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name={`professional_references.${index}.reference_name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reference Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter reference name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`professional_references.${index}.relationship`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Relationship (to applicant)</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g., Former Manager, Business Partner" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`professional_references.${index}.phone_number`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reference Phone Number</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="(206) 555-0000" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`professional_references.${index}.email_address`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reference Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} placeholder="reference@company.com" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-end space-x-4 pt-6">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="button" onClick={handleSave}>
            Save Information
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ProfessionalReferencesForm;
