
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { NewLeadFormValues } from '../schemas/newLeadSchema';

interface ProjectInfoFieldsProps {
  form: UseFormReturn<NewLeadFormValues>;
  projectTypes: string[];
}

export const ProjectInfoFields: React.FC<ProjectInfoFieldsProps> = ({ form, projectTypes }) => {
  return (
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
  );
};
