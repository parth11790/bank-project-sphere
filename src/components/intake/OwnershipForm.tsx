import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Form, FormControl, FormField, 
  FormItem, FormLabel, FormMessage, 
  FormDescription 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select, SelectContent, SelectItem, 
  SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { DatePicker } from '@/components/ui/date-picker';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { AlertTriangle, Plus, Trash2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { sbaDropdownFields } from '@/lib/mockData/dropdownFields';
import { IntakeFormData } from './types/intakeTypes';
import { useMemo } from 'react';

const ownershipSchema = z.object({
  current_owners: z.array(
    z.object({
      name: z.string().min(2, "Owner name is required"),
      tax_id: z.string().min(4, "Tax ID is required"),
      address: z.string().min(5, "Address is required"),
      ownership_percentage: z.coerce.number()
        .min(0.01, "Percentage must be greater than 0")
        .max(100, "Percentage cannot exceed 100"),
      citizenship_status: z.string({
        required_error: "Citizenship status is required",
      }),
    })
  ).min(1, "At least one current owner is required"),
  
  former_owners: z.array(
    z.object({
      name: z.string().min(2, "Former owner name is required"),
      tax_id: z.string().min(4, "Tax ID is required"),
      address: z.string().min(5, "Address is required"),
      former_ownership_percentage: z.coerce.number()
        .min(0.01, "Percentage must be greater than 0")
        .max(100, "Percentage cannot exceed 100"),
      citizenship_status: z.string({
        required_error: "Citizenship status is required",
      }),
      date_ownership_ceased: z.date({
        required_error: "Date is required",
      }),
      is_still_associate: z.boolean({
        required_error: "This field is required",
      }),
      is_still_employed: z.boolean({
        required_error: "This field is required",
      }),
    })
  ).optional(),
});

interface OwnershipFormProps {
  formData: IntakeFormData;
  updateFormData: (data: Partial<IntakeFormData>) => void;
}

const OwnershipForm: React.FC<OwnershipFormProps> = ({ formData, updateFormData }) => {
  // Get citizenship status options from SBA dropdown fields
  const citizenshipOptions = useMemo(() => {
    const field = sbaDropdownFields.find(field => field.id === 'citizenshipStatus');
    return field?.initialValues || [];
  }, []);
  
  const form = useForm<z.infer<typeof ownershipSchema>>({
    resolver: zodResolver(ownershipSchema),
    defaultValues: {
      current_owners: formData.current_owners?.length > 0 
        ? formData.current_owners 
        : [{ name: '', tax_id: '', address: '', ownership_percentage: 100, citizenship_status: '' }],
      former_owners: formData.former_owners || [],
    },
  });
  
  const { fields: currentOwnersFields, append: appendCurrentOwner, remove: removeCurrentOwner } = 
    useFieldArray({
      control: form.control,
      name: "current_owners",
    });
    
  const { fields: formerOwnersFields, append: appendFormerOwner, remove: removeFormerOwner } = 
    useFieldArray({
      control: form.control,
      name: "former_owners",
    });
  
  const hasRiskyOwner = useMemo(() => {
    const currentOwners = form.watch('current_owners') || [];
    const formerOwners = form.watch('former_owners') || [];
    
    const currentOwnerRisk = currentOwners.some(
      owner => owner.citizenship_status === 'Other/Ineligible Person'
    );
    
    const formerOwnerRisk = formerOwners.some(
      owner => {
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        
        const ceaseDate = owner.date_ownership_ceased;
        const isWithinLookback = ceaseDate && new Date(ceaseDate) > sixMonthsAgo;
        
        return isWithinLookback && 
               owner.citizenship_status === 'Other/Ineligible Person' && 
               (owner.is_still_associate || owner.is_still_employed);
      }
    );
    
    return currentOwnerRisk || formerOwnerRisk;
  }, [form.watch]);
  
  const totalCurrentOwnership = useMemo(() => {
    const currentOwners = form.watch('current_owners') || [];
    return currentOwners.reduce((sum, owner) => sum + (owner.ownership_percentage || 0), 0);
  }, [form.watch]);
  
  const onSubmit = (values: z.infer<typeof ownershipSchema>) => {
    updateFormData({
      current_owners: values.current_owners,
      former_owners: values.former_owners,
    });
  };
  
  React.useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.current_owners || value.former_owners) {
        // Make sure we have complete objects for all required properties
        const current_owners = (value.current_owners || []).map(owner => ({
          name: owner.name || '',
          tax_id: owner.tax_id || '',
          address: owner.address || '',
          ownership_percentage: owner.ownership_percentage || 0,
          citizenship_status: owner.citizenship_status || ''
        }));
        
        const former_owners = (value.former_owners || []).map(owner => ({
          name: owner.name || '',
          tax_id: owner.tax_id || '',
          address: owner.address || '',
          ownership_percentage: 0, // Add required field
          former_ownership_percentage: owner.former_ownership_percentage || 0,
          citizenship_status: owner.citizenship_status || '',
          date_ownership_ceased: owner.date_ownership_ceased || new Date(),
          is_still_associate: owner.is_still_associate || false,
          is_still_employed: owner.is_still_employed || false
        }));
        
        updateFormData({
          current_owners,
          former_owners
        });
      }
    });
    return () => subscription.unsubscribe();
  }, [form, updateFormData]);
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Ownership Information</h3>
        <p className="text-sm text-muted-foreground">
          Enter details about current and former owners (within the last 6 months)
        </p>
      </div>
      
      {hasRiskyOwner && (
        <Alert variant="destructive" className="bg-red-50">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <span className="font-bold">Eligibility Warning:</span> One or more ineligible persons identified in ownership.
            Additional review required per SOP 6-month lookback rule.
          </AlertDescription>
        </Alert>
      )}
      
      {totalCurrentOwnership !== 100 && currentOwnersFields.length > 0 && (
        <Alert className="bg-amber-50 border-amber-200">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          <AlertDescription>
            <span className="font-medium">Note:</span> Total ownership percentage is {totalCurrentOwnership}%. 
            It should equal 100%.
          </AlertDescription>
        </Alert>
      )}
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-md font-medium">Current Owners</h4>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendCurrentOwner({
                  name: '',
                  tax_id: '',
                  address: '',
                  ownership_percentage: 0,
                  citizenship_status: ''
                })}
              >
                <Plus className="h-4 w-4 mr-2" /> Add Owner
              </Button>
            </div>
            
            {currentOwnersFields.map((field, index) => (
              <Card key={field.id} className="mb-4">
                <CardHeader className="pb-2">
                  <CardTitle className="text-md flex items-center justify-between">
                    <span>Owner {index + 1}</span>
                    {currentOwnersFields.length > 1 && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => removeCurrentOwner(index)}
                      >
                        <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                      </Button>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`current_owners.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name*</FormLabel>
                          <FormControl>
                            <Input placeholder="Legal full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name={`current_owners.${index}.tax_id`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SSN/EIN*</FormLabel>
                          <FormControl>
                            <Input placeholder="XXX-XX-XXXX or XX-XXXXXXX" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name={`current_owners.${index}.address`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Address*</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Main St, City, State, ZIP" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`current_owners.${index}.ownership_percentage`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ownership Percentage*</FormLabel>
                          <FormControl>
                            <Input 
                              type="number"
                              placeholder="50"
                              min={0}
                              max={100}
                              step={0.01}
                              {...field}
                              onChange={(e) => {
                                const value = e.target.value;
                                field.onChange(value === '' ? 0 : parseFloat(value));
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name={`current_owners.${index}.citizenship_status`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Citizenship Status*</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {citizenshipOptions.map((status) => (
                                <SelectItem key={status} value={status}>
                                  {status}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-md font-medium">Former Owners (Last 6 Months)</h4>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendFormerOwner({
                  name: '',
                  tax_id: '',
                  address: '',
                  former_ownership_percentage: 0,
                  citizenship_status: '',
                  date_ownership_ceased: new Date(),
                  is_still_associate: false,
                  is_still_employed: false,
                })}
              >
                <Plus className="h-4 w-4 mr-2" /> Add Former Owner
              </Button>
            </div>
            
            {formerOwnersFields.length === 0 && (
              <div className="text-sm text-muted-foreground italic">
                No former owners entered. Add former owners only if ownership changed within the last 6 months.
              </div>
            )}
            
            {formerOwnersFields.map((field, index) => (
              <Card key={field.id} className="mb-4">
                <CardHeader className="pb-2">
                  <CardTitle className="text-md flex items-center justify-between">
                    <span>Former Owner {index + 1}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeFormerOwner(index)}
                    >
                      <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`former_owners.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name*</FormLabel>
                          <FormControl>
                            <Input placeholder="Legal full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name={`former_owners.${index}.tax_id`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SSN/EIN*</FormLabel>
                          <FormControl>
                            <Input placeholder="XXX-XX-XXXX or XX-XXXXXXX" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name={`former_owners.${index}.address`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address*</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Main St, City, State, ZIP" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`former_owners.${index}.former_ownership_percentage`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Former Ownership Percentage*</FormLabel>
                          <FormControl>
                            <Input 
                              type="number"
                              placeholder="50"
                              min={0}
                              max={100}
                              step={0.01}
                              {...field}
                              onChange={(e) => {
                                const value = e.target.value;
                                field.onChange(value === '' ? 0 : parseFloat(value));
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name={`former_owners.${index}.citizenship_status`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Citizenship Status*</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {citizenshipOptions.map((status) => (
                                <SelectItem key={status} value={status}>
                                  {status}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name={`former_owners.${index}.date_ownership_ceased`}
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date Ownership Ceased*</FormLabel>
                        <DatePicker
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date() || date < new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
                        />
                        <FormDescription>
                          Must be within the past 6 months for lookback requirement
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name={`former_owners.${index}.is_still_associate`}
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Is this person still an officer, director, or key employee?*</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={(value) => field.onChange(value === "true")}
                            defaultValue={field.value !== undefined ? String(field.value) : undefined}
                            className="flex items-center gap-6"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="true" id={`associate-yes-${index}`} />
                              <label htmlFor={`associate-yes-${index}`}>Yes</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="false" id={`associate-no-${index}`} />
                              <label htmlFor={`associate-no-${index}`}>No</label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name={`former_owners.${index}.is_still_employed`}
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Is this person still employed by the business?*</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={(value) => field.onChange(value === "true")}
                            defaultValue={field.value !== undefined ? String(field.value) : undefined}
                            className="flex items-center gap-6"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="true" id={`employed-yes-${index}`} />
                              <label htmlFor={`employed-yes-${index}`}>Yes</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="false" id={`employed-no-${index}`} />
                              <label htmlFor={`employed-no-${index}`}>No</label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default OwnershipForm;
