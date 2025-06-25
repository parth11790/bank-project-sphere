
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { DatePicker } from '@/components/ui/date-picker';
import { PersonalInformationFormValues } from '../schemas/personalInformationSchema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Save } from 'lucide-react';
import { toast } from 'sonner';

interface PersonalDetailsSectionProps {
  form: UseFormReturn<PersonalInformationFormValues>;
}

export const PersonalDetailsSection: React.FC<PersonalDetailsSectionProps> = ({ form }) => {
  const watchUsCitizen = form.watch('us_citizen');
  const watchGovEmployee = form.watch('us_government_employee');
  const watchAssetsInTrust = form.watch('assets_in_trust');
  const watchMilitaryService = form.watch('military_service');

  const handleSavePersonalDetails = () => {
    const personalDetailsFields = [
      'marital_status', 'us_citizen', 'alien_registration_number', 'itin_number',
      'liable_for_alimony', 'delinquent_child_support', 'us_government_employee',
      'government_agency_position', 'assets_in_trust', 'trust_description',
      'military_service', 'military_branch', 'military_rank', 'military_start_date',
      'military_end_date', 'discharge_type'
    ];
    
    const personalDetailsData = personalDetailsFields.reduce((acc, field) => {
      const value = form.getValues(field as keyof PersonalInformationFormValues);
      if (value !== undefined) {
        acc[field] = value;
      }
      return acc;
    }, {} as Record<string, any>);

    console.log('[AUDIT] Personal Details section saved:', {
      timestamp: new Date().toISOString(),
      userId: 'current_user',
      action: 'section_save',
      section: 'personal_details',
      data: personalDetailsData
    });

    toast.success('Personal details saved successfully');
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Personal Details</CardTitle>
          <Button onClick={handleSavePersonalDetails} size="sm">
            <Save className="h-4 w-4 mr-2" />
            Save Section
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
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

        {/* Conditional alien registration and ITIN fields */}
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

        {/* Military Service Section */}
        <div className="space-y-4">
          <Separator />
          <h4 className="text-sm font-medium">Military Service</h4>
          
          <FormField
            control={form.control}
            name="military_service"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Have you ever served in the U.S. Military?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-row space-x-3"
                  >
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

          {watchMilitaryService === 'yes' && (
            <div className="space-y-3 pl-4 border-l-2 border-muted">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="military_branch"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Branch of Service</FormLabel>
                      <FormControl>
                        <Input {...field} className="h-8 text-sm" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="military_rank"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Rank at Discharge</FormLabel>
                      <FormControl>
                        <Input {...field} className="h-8 text-sm" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <label className="text-xs font-medium mb-2 block">Dates of Service</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <FormField
                    control={form.control}
                    name="military_start_date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs">Start Date</FormLabel>
                        <FormControl>
                          <DatePicker selected={field.value} onSelect={field.onChange} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="military_end_date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs">End Date</FormLabel>
                        <FormControl>
                          <DatePicker selected={field.value} onSelect={field.onChange} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="discharge_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Type of Discharge</FormLabel>
                    <FormControl>
                      <Input {...field} className="h-8 text-sm" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
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
  );
};
