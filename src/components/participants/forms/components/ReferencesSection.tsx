
import React from 'react';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PersonalInformationFormValues } from '../schemas/personalInformationSchema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';

interface ReferencesSectionProps {
  form: UseFormReturn<PersonalInformationFormValues>;
}

export const ReferencesSection: React.FC<ReferencesSectionProps> = ({ form }) => {
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

      {fields.map((field, index) => (
        <Card key={field.id}>
          <CardHeader>
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
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name={`professional_references.${index}.reference_name`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reference Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                    <Input {...field} />
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
                    <Input {...field} />
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
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
