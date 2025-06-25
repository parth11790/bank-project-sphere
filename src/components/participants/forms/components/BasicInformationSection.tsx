
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePicker } from '@/components/ui/date-picker';
import { PersonalInformationFormValues } from '../schemas/personalInformationSchema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { toast } from 'sonner';

interface BasicInformationSectionProps {
  form: UseFormReturn<PersonalInformationFormValues>;
}

export const BasicInformationSection: React.FC<BasicInformationSectionProps> = ({ form }) => {
  const watchPhoneType = form.watch('primary_phone_type');

  const handleSaveBasicInfo = () => {
    const basicInfoFields = [
      'first_name', 'last_name', 'social_security_number', 
      'date_of_birth', 'primary_phone', 'email_address',
      'primary_phone_type', 'primary_phone_type_other',
      'residence_address', 'residence_city', 'residence_state', 
      'residence_zip', 'residency_start_date'
    ];
    
    const basicInfoData = basicInfoFields.reduce((acc, field) => {
      const value = form.getValues(field as keyof PersonalInformationFormValues);
      if (value !== undefined) {
        acc[field] = value;
      }
      return acc;
    }, {} as Record<string, any>);

    console.log('[AUDIT] Basic Information section saved:', {
      timestamp: new Date().toISOString(),
      userId: 'current_user',
      action: 'section_save',
      section: 'basic_information',
      data: basicInfoData
    });

    toast.success('Basic information saved successfully');
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Basic Information & Address</CardTitle>
          <Button onClick={handleSaveBasicInfo} size="sm">
            <Save className="h-4 w-4 mr-2" />
            Save Section
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Name, SSN, DOB, Phone, Email - 5 fields in one row */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">First Name</FormLabel>
                <FormControl>
                  <Input {...field} className="h-8 text-sm" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Last Name</FormLabel>
                <FormControl>
                  <Input {...field} className="h-8 text-sm" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="social_security_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">SSN</FormLabel>
                <FormControl>
                  <Input placeholder="XXX-XX-XXXX" {...field} className="h-8 text-sm" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date_of_birth"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Date of Birth</FormLabel>
                <FormControl>
                  <DatePicker selected={field.value} onSelect={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="primary_phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Primary Phone</FormLabel>
                <FormControl>
                  <Input {...field} className="h-8 text-sm" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Email, Phone Type, and conditional Other field - 3-4 fields in one row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <FormField
            control={form.control}
            name="email_address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} className="h-8 text-sm" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="primary_phone_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Phone Type</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="h-8 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cell">Cell</SelectItem>
                      <SelectItem value="home">Home</SelectItem>
                      <SelectItem value="work">Work</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {watchPhoneType === 'other' && (
            <FormField
              control={form.control}
              name="primary_phone_type_other"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Specify Other</FormLabel>
                  <FormControl>
                    <Input {...field} className="h-8 text-sm" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        {/* Address, City, State, ZIP, Since - 5 fields in one row */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
          <FormField
            control={form.control}
            name="residence_address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Address</FormLabel>
                <FormControl>
                  <Input {...field} className="h-8 text-sm" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="residence_city"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">City</FormLabel>
                <FormControl>
                  <Input {...field} className="h-8 text-sm" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="residence_state"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">State</FormLabel>
                <FormControl>
                  <Input {...field} className="h-8 text-sm" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="residence_zip"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">ZIP</FormLabel>
                <FormControl>
                  <Input {...field} className="h-8 text-sm" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="residency_start_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Since</FormLabel>
                <FormControl>
                  <DatePicker selected={field.value} onSelect={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};
