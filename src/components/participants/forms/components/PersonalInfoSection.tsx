
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
import { Separator } from '@/components/ui/separator';
import { BusinessOwnershipSection } from './BusinessOwnershipSection';
import { FormsAssignmentSection } from './FormsAssignmentSection';
import { Participant } from '@/types/participant';

interface PersonalInfoSectionProps {
  form: UseFormReturn<PersonalInformationFormValues>;
  participant?: Participant;
}

export const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  form,
  participant
}) => {
  const watchPhoneType = form.watch('primary_phone_type');
  const watchUsCitizen = form.watch('us_citizen');
  const watchGovEmployee = form.watch('us_government_employee');
  const watchAssetsInTrust = form.watch('assets_in_trust');

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Basic Information & Address</CardTitle>
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

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Personal Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Marital Status and US Citizen - Horizontal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="marital_status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Marital Status</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-row space-x-3">
                      <FormItem className="flex items-center space-x-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="married" />
                        </FormControl>
                        <FormLabel className="text-xs font-normal">Married</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="unmarried" />
                        </FormControl>
                        <FormLabel className="text-xs font-normal">Single</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="separated" />
                        </FormControl>
                        <FormLabel className="text-xs font-normal">Separated</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="us_citizen"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">U.S. Citizen?</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-row space-x-3">
                      <FormItem className="flex items-center space-x-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="yes" />
                        </FormControl>
                        <FormLabel className="text-xs font-normal">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="no" />
                        </FormControl>
                        <FormLabel className="text-xs font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {watchUsCitizen === 'no' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="alien_registration_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Alien Registration Number</FormLabel>
                    <FormControl>
                      <Input {...field} className="h-8 text-sm" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="itin_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">ITIN</FormLabel>
                    <FormControl>
                      <Input {...field} className="h-8 text-sm" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Yes/No Questions - 4 per row for more compact layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="liable_for_alimony"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Liable for alimony/child support?</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-row space-x-3">
                      <FormItem className="flex items-center space-x-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="yes" />
                        </FormControl>
                        <FormLabel className="text-xs font-normal">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="no" />
                        </FormControl>
                        <FormLabel className="text-xs font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="delinquent_child_support"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Delinquent child support (60+ days)?</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-row space-x-3">
                      <FormItem className="flex items-center space-x-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="yes" />
                        </FormControl>
                        <FormLabel className="text-xs font-normal">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="no" />
                        </FormControl>
                        <FormLabel className="text-xs font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="us_government_employee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">U.S. Government employee?</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-row space-x-3">
                      <FormItem className="flex items-center space-x-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="yes" />
                        </FormControl>
                        <FormLabel className="text-xs font-normal">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="no" />
                        </FormControl>
                        <FormLabel className="text-xs font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="assets_in_trust"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Assets held in trust?</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-row space-x-3">
                      <FormItem className="flex items-center space-x-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="yes" />
                        </FormControl>
                        <FormLabel className="text-xs font-normal">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-1 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="no" />
                        </FormControl>
                        <FormLabel className="text-xs font-normal">No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Conditional Fields */}
          {watchGovEmployee === 'yes' && (
            <FormField
              control={form.control}
              name="government_agency_position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Agency/Position</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={2} className="text-sm" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {watchAssetsInTrust === 'yes' && (
            <FormField
              control={form.control}
              name="trust_description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Trust Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={2} className="text-sm" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </CardContent>
      </Card>

      <Separator />

      {/* Business Ownership Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Businesses & Ownership</h3>
        <BusinessOwnershipSection form={form} participant={participant} />
      </div>

      <Separator />

      {/* Forms Assignment Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Forms Assignment</h3>
        <FormsAssignmentSection participant={participant} />
      </div>
    </div>
  );
};
