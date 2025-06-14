import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { DatePicker } from '@/components/ui/date-picker';
import { PersonalInformationFormValues } from '../schemas/personalInformationSchema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
interface PersonalInfoSectionProps {
  form: UseFormReturn<PersonalInformationFormValues>;
}
export const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  form
}) => {
  const watchPhoneType = form.watch('primary_phone_type');
  const watchUsCitizen = form.watch('us_citizen');
  const watchGovEmployee = form.watch('us_government_employee');
  const watchAssetsInTrust = form.watch('assets_in_trust');
  return <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Name and SSN Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <FormField control={form.control} name="first_name" render={({
            field
          }) => <FormItem>
                  <FormLabel className="text-sm">First Name</FormLabel>
                  <FormControl>
                    <Input {...field} className="h-9" />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />

            <FormField control={form.control} name="last_name" render={({
            field
          }) => <FormItem>
                  <FormLabel className="text-sm">Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} className="h-9" />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />

            <FormField control={form.control} name="social_security_number" render={({
            field
          }) => <FormItem>
                  <FormLabel className="text-sm">SSN</FormLabel>
                  <FormControl>
                    <Input placeholder="XXX-XX-XXXX" {...field} className="h-9" />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />
          </div>

          {/* DOB, Phone, Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <FormField control={form.control} name="date_of_birth" render={({
            field
          }) => <FormItem>
                  <FormLabel className="text-sm">Date of Birth</FormLabel>
                  <FormControl>
                    <DatePicker selected={field.value} onSelect={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />

            <FormField control={form.control} name="primary_phone" render={({
            field
          }) => <FormItem>
                  <FormLabel className="text-sm">Primary Phone</FormLabel>
                  <FormControl>
                    <Input {...field} className="h-9" />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />

            <FormField control={form.control} name="email_address" render={({
            field
          }) => <FormItem>
                  <FormLabel className="text-sm">Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} className="h-9" />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />
          </div>

          {/* Phone Type Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <FormField control={form.control} name="primary_phone_type" render={({
            field
          }) => <FormItem>
                  <FormLabel className="text-sm">Phone Type</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="h-9">
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
                </FormItem>} />

            {watchPhoneType === 'other' && <FormField control={form.control} name="primary_phone_type_other" render={({
            field
          }) => <FormItem>
                    <FormLabel className="text-sm">Specify Other</FormLabel>
                    <FormControl>
                      <Input {...field} className="h-9" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Address</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField control={form.control} name="residence_address" render={({
          field
        }) => <FormItem>
                <FormLabel className="text-sm">Street Address</FormLabel>
                <FormControl>
                  <Input {...field} className="h-9" />
                </FormControl>
                <FormMessage />
              </FormItem>} />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <FormField control={form.control} name="residence_city" render={({
            field
          }) => <FormItem>
                  <FormLabel className="text-sm">City</FormLabel>
                  <FormControl>
                    <Input {...field} className="h-9" />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />

            <FormField control={form.control} name="residence_state" render={({
            field
          }) => <FormItem>
                  <FormLabel className="text-sm">State</FormLabel>
                  <FormControl>
                    <Input {...field} className="h-9" />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />

            <FormField control={form.control} name="residence_zip" render={({
            field
          }) => <FormItem>
                  <FormLabel className="text-sm">ZIP</FormLabel>
                  <FormControl>
                    <Input {...field} className="h-9" />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />

            <FormField control={form.control} name="residency_start_date" render={({
            field
          }) => <FormItem>
                  <FormLabel className="text-sm">Since</FormLabel>
                  <FormControl>
                    <DatePicker selected={field.value} onSelect={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Personal Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Marital Status - Horizontal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={form.control} name="marital_status" render={({
            field
          }) => <FormItem>
                  <FormLabel className="text-sm">Marital Status</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-row space-x-4">
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="married" />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">Married</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="unmarried" />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">Single</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="separated" />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">Separated</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>} />

            <FormField control={form.control} name="us_citizen" render={({
            field
          }) => <FormItem>
                  <FormLabel className="text-sm">U.S. Citizen?</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-row space-x-4">
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="yes" />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="no" />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>} />
          </div>

          {watchUsCitizen === 'no' && <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <FormField control={form.control} name="alien_registration_number" render={({
            field
          }) => <FormItem>
                    <FormLabel className="text-sm">Alien Registration Number</FormLabel>
                    <FormControl>
                      <Input {...field} className="h-9" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />

              <FormField control={form.control} name="itin_number" render={({
            field
          }) => <FormItem>
                    <FormLabel className="text-sm">ITIN</FormLabel>
                    <FormControl>
                      <Input {...field} className="h-9" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>} />
            </div>}

          {/* Yes/No Questions - Compact Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={form.control} name="liable_for_alimony" render={({
            field
          }) => <FormItem>
                  <FormLabel className="text-sm">Liable for alimony/child support?</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-row space-x-4">
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="yes" />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="no" />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>} />

            <FormField control={form.control} name="delinquent_child_support" render={({
            field
          }) => <FormItem>
                  <FormLabel className="text-sm">Delinquent child support (60+ days)?</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-row space-x-4">
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="yes" />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="no" />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>} />

            <FormField control={form.control} name="us_government_employee" render={({
            field
          }) => <FormItem>
                  <FormLabel className="text-sm">U.S. Government employee?</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-row space-x-4">
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="yes" />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="no" />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>} />

            <FormField control={form.control} name="assets_in_trust" render={({
            field
          }) => <FormItem>
                  <FormLabel className="text-sm">Assets held in trust?</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-row space-x-4">
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="yes" />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="no" />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>} />
          </div>

          {/* Conditional Fields */}
          {watchGovEmployee === 'yes' && <FormField control={form.control} name="government_agency_position" render={({
          field
        }) => <FormItem>
                  <FormLabel className="text-sm">Agency/Position</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={2} />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />}

          {watchAssetsInTrust === 'yes' && <FormField control={form.control} name="trust_description" render={({
          field
        }) => <FormItem>
                  <FormLabel className="text-sm">Trust Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={2} />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />}
        </CardContent>
      </Card>

      
    </div>;
};