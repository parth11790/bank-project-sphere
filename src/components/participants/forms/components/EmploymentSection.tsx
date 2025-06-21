import React from 'react';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { DatePicker } from '@/components/ui/date-picker';
import { PersonalInformationFormValues } from '../schemas/personalInformationSchema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';
interface EmploymentSectionProps {
  form: UseFormReturn<PersonalInformationFormValues>;
}
export const EmploymentSection: React.FC<EmploymentSectionProps> = ({
  form
}) => {
  const {
    fields,
    append,
    remove
  } = useFieldArray({
    control: form.control,
    name: 'employment_history'
  });
  const addEmployment = () => {
    append({
      employer_name: '',
      position_title: '',
      start_date: new Date(),
      end_date: undefined,
      responsibilities: '',
      reason_for_leaving: ''
    });
  };
  return <div className="space-y-6">
      

      {fields.map((field, index) => <Card key={field.id}>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-base">Employment #{index + 1}</CardTitle>
              {fields.length > 1 && <Button type="button" variant="outline" size="sm" onClick={() => remove(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name={`employment_history.${index}.employer_name`} render={({
            field
          }) => <FormItem>
                    <FormLabel>Employer Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />

              <FormField control={form.control} name={`employment_history.${index}.position_title`} render={({
            field
          }) => <FormItem>
                    <FormLabel>Position / Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Dates of Employment</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name={`employment_history.${index}.start_date`} render={({
              field
            }) => <FormItem>
                      <FormLabel className="text-xs">Start Date</FormLabel>
                      <FormControl>
                        <DatePicker selected={field.value} onSelect={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />

                <FormField control={form.control} name={`employment_history.${index}.end_date`} render={({
              field
            }) => <FormItem>
                      <FormLabel className="text-xs">End Date (if applicable)</FormLabel>
                      <FormControl>
                        <DatePicker selected={field.value} onSelect={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>} />
              </div>
            </div>

            <FormField control={form.control} name={`employment_history.${index}.responsibilities`} render={({
          field
        }) => <FormItem>
                  <FormLabel>Responsibilities</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />

            <FormField control={form.control} name={`employment_history.${index}.reason_for_leaving`} render={({
          field
        }) => <FormItem>
                  <FormLabel>Reason for Leaving</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />
          </CardContent>
        </Card>)}
    </div>;
};