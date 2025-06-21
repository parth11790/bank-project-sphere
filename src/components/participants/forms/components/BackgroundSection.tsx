
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { PersonalInformationFormValues } from '../schemas/personalInformationSchema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Participant } from '@/types/participant';

interface BackgroundSectionProps {
  form: UseFormReturn<PersonalInformationFormValues>;
  participant?: Participant;
}

export const BackgroundSection: React.FC<BackgroundSectionProps> = ({ form }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Background Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="background_information.criminal_background"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Have you ever been convicted of a crime, other than a minor vehicle violation? 
                If yes, please explain.
              </FormLabel>
              <FormControl>
                <Textarea 
                  {...field} 
                  value={field.value || ''}
                  rows={4}
                  placeholder="Please provide details if applicable..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="background_information.bankruptcy_history"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Have you ever filed for bankruptcy or been involved in bankruptcy proceedings? 
                If yes, please explain.
              </FormLabel>
              <FormControl>
                <Textarea 
                  {...field} 
                  value={field.value || ''}
                  rows={4}
                  placeholder="Please provide details if applicable..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="background_information.litigation_history"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Are you currently involved in any litigation or legal proceedings? 
                If yes, please explain.
              </FormLabel>
              <FormControl>
                <Textarea 
                  {...field} 
                  value={field.value || ''}
                  rows={4}
                  placeholder="Please provide details if applicable..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};
