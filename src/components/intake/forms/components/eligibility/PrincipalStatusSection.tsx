
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { eligibilitySchema } from '../../schemas/eligibilitySchema';
import { InlineAlert, AlertProps } from './InlineAlert';

type FormData = z.infer<typeof eligibilitySchema>;

interface PrincipalStatusSectionProps {
  form: UseFormReturn<FormData>;
  alerts?: AlertProps[];
}

export const PrincipalStatusSection: React.FC<PrincipalStatusSectionProps> = ({ form, alerts = [] }) => {
  return (
    <div className="space-y-4">
      <h4 className="text-md font-medium">Principal Status</h4>
      
      <FormField
        control={form.control}
        name="principal_status.is_incarcerated"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Is any principal currently incarcerated?</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={(value) => field.onChange(value === "true")}
                defaultValue={field.value !== undefined ? String(field.value) : undefined}
                className="flex items-center gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="true" id="incarcerated-yes" />
                  <label htmlFor="incarcerated-yes">Yes</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="false" id="incarcerated-no" />
                  <label htmlFor="incarcerated-no">No</label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
            
            {alerts.filter(alert => 
              alert.condition && 
              alert.description.toLowerCase().includes("incarcerated")
            ).map((alert, index) => (
              <InlineAlert 
                key={`incarcerated-alert-${index}`}
                condition={alert.condition}
                title={alert.title}
                description={alert.description}
                severity={alert.severity}
              />
            ))}
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="principal_status.is_on_parole"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Is any principal currently on parole or probation?</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={(value) => field.onChange(value === "true")}
                defaultValue={field.value !== undefined ? String(field.value) : undefined}
                className="flex items-center gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="true" id="parole-yes" />
                  <label htmlFor="parole-yes">Yes</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="false" id="parole-no" />
                  <label htmlFor="parole-no">No</label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
            
            {alerts.filter(alert => 
              alert.condition && 
              alert.description.toLowerCase().includes("parole")
            ).map((alert, index) => (
              <InlineAlert 
                key={`parole-alert-${index}`}
                condition={alert.condition}
                title={alert.title}
                description={alert.description}
                severity={alert.severity}
              />
            ))}
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="principal_status.is_indicted"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Is any principal currently under indictment?</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={(value) => field.onChange(value === "true")}
                defaultValue={field.value !== undefined ? String(field.value) : undefined}
                className="flex items-center gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="true" id="indicted-yes" />
                  <label htmlFor="indicted-yes">Yes</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="false" id="indicted-no" />
                  <label htmlFor="indicted-no">No</label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
            
            {alerts.filter(alert => 
              alert.condition && 
              alert.description.toLowerCase().includes("indicted")
            ).map((alert, index) => (
              <InlineAlert 
                key={`indicted-alert-${index}`}
                condition={alert.condition}
                title={alert.title}
                description={alert.description}
                severity={alert.severity}
              />
            ))}
          </FormItem>
        )}
      />
    </div>
  );
};
