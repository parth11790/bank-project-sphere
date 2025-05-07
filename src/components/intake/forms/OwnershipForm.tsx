import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DatePicker } from '@/components/ui/date-picker';
import { Switch } from '@/components/ui/switch';
import { Plus, Trash2 } from 'lucide-react';
import { FormComponentProps } from '../types/intakeTypes';

// Create expected types for current and former owners to fix type errors
const ownerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  tax_id: z.string().min(1, "Tax ID is required"),
  address: z.string().min(1, "Address is required"),
  ownership_percentage: z.coerce.number().min(0).max(100),
  citizenship_status: z.string().min(1, "Citizenship status is required"),
});

const formerOwnerSchema = ownerSchema.extend({
  date_ownership_ceased: z.date(),
  former_ownership_percentage: z.coerce.number().min(0).max(100),
  is_still_associate: z.boolean(),
  is_still_employed: z.boolean(),
});

// Define form schema
const ownershipSchema = z.object({
  current_owners: z.array(ownerSchema),
  former_owners: z.array(formerOwnerSchema),
});

type OwnershipFormValues = z.infer<typeof ownershipSchema>;
type Owner = z.infer<typeof ownerSchema>;
type FormerOwner = z.infer<typeof formerOwnerSchema>;

interface OwnershipFormProps extends FormComponentProps {}

// When creating new owners, ensure non-optional fields are included:
const createEmptyCurrentOwner = () => ({
  name: "",
  tax_id: "",
  address: "",
  ownership_percentage: 0,
  citizenship_status: "",
});

const createEmptyFormerOwner = () => ({
  name: "",
  tax_id: "",
  address: "",
  former_ownership_percentage: 0,
  citizenship_status: "",
  date_ownership_ceased: new Date(),
  is_still_associate: false,
  is_still_employed: false,
});

const OwnershipForm: React.FC<OwnershipFormProps> = ({ formData, updateFormData }) => {
  const form = useForm<OwnershipFormValues>({
    resolver: zodResolver(ownershipSchema),
    defaultValues: {
      current_owners: formData.current_owners.length ? formData.current_owners : [createEmptyCurrentOwner()],
      former_owners: formData.former_owners.length ? formData.former_owners : [createEmptyFormerOwner()],
    },
  });

  const [currentOwners, setCurrentOwners] = useState<Owner[]>(form.getValues().current_owners);
  const [formerOwners, setFormerOwners] = useState<FormerOwner[]>(form.getValues().former_owners);

  // Update form values when currentOwners or formerOwners change
  React.useEffect(() => {
    form.setValue("current_owners", currentOwners);
  }, [currentOwners, form]);

  React.useEffect(() => {
    form.setValue("former_owners", formerOwners);
  }, [formerOwners, form]);

  const onSubmit = (values: OwnershipFormValues) => {
    updateFormData({
      current_owners: values.current_owners,
      former_owners: values.former_owners,
    });
  };

  const addCurrentOwner = () => {
    setCurrentOwners([...currentOwners, createEmptyCurrentOwner()]);
  };

  const addFormerOwner = () => {
    setFormerOwners([...formerOwners, createEmptyFormerOwner()]);
  };

  const removeCurrentOwner = (index: number) => {
    const updatedOwners = [...currentOwners];
    updatedOwners.splice(index, 1);
    setCurrentOwners(updatedOwners);
  };

  const removeFormerOwner = (index: number) => {
    const updatedOwners = [...formerOwners];
    updatedOwners.splice(index, 1);
    setFormerOwners(updatedOwners);
  };

  const updateCurrentOwner = (index: number, updatedOwner: Owner) => {
    const updatedOwners = [...currentOwners];
    updatedOwners[index] = updatedOwner;
    setCurrentOwners(updatedOwners);
  };

  const updateFormerOwner = (index: number, updatedOwner: FormerOwner) => {
    const updatedOwners = [...formerOwners];
    updatedOwners[index] = updatedOwner;
    setFormerOwners(updatedOwners);
  };

  const citizenshipStatuses = ["U.S. Citizen", "Lawful Permanent Resident (LPR)", "U.S. National", "Other/Ineligible Person"];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Ownership Information</h3>
        <p className="text-sm text-muted-foreground">
          Enter information about the current and former owners of the business.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Tabs defaultValue="current" className="w-full">
            <TabsList>
              <TabsTrigger value="current">Current Owners</TabsTrigger>
              <TabsTrigger value="former">Former Owners</TabsTrigger>
            </TabsList>
            <TabsContent value="current" className="space-y-4">
              {currentOwners.map((owner, index) => (
                <Card key={`current-${index}`} className="border">
                  <CardHeader className="flex items-center justify-between">
                    <CardTitle>Current Owner #{index + 1}</CardTitle>
                    <Button variant="destructive" size="icon" onClick={() => removeCurrentOwner(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <FormField
                      control={form.control}
                      name={`current_owners.${index}.name` as const}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Owner's Full Name" {...field} value={owner.name} onChange={(e) => updateCurrentOwner(index, { ...owner, name: e.target.value })} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`current_owners.${index}.tax_id` as const}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tax ID</FormLabel>
                          <FormControl>
                            <Input placeholder="EIN or SSN" {...field} value={owner.tax_id} onChange={(e) => updateCurrentOwner(index, { ...owner, tax_id: e.target.value })} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`current_owners.${index}.address` as const}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input placeholder="Owner's Address" {...field} value={owner.address} onChange={(e) => updateCurrentOwner(index, { ...owner, address: e.target.value })} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`current_owners.${index}.ownership_percentage` as const}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ownership Percentage</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="0-100"
                              {...field}
                              value={owner.ownership_percentage}
                              onChange={(e) => {
                                const value = parseFloat(e.target.value);
                                updateCurrentOwner(index, { ...owner, ownership_percentage: isNaN(value) ? 0 : value });
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`current_owners.${index}.citizenship_status` as const}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Citizenship Status</FormLabel>
                          <Select
                            onValueChange={(value) => updateCurrentOwner(index, { ...owner, citizenship_status: value })}
                            defaultValue={owner.citizenship_status}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select citizenship status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {citizenshipStatuses.map((status) => (
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
                  </CardContent>
                </Card>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={addCurrentOwner}>
                <Plus className="mr-2 h-4 w-4" />
                Add Current Owner
              </Button>
            </TabsContent>

            <TabsContent value="former" className="space-y-4">
              {formerOwners.map((owner, index) => (
                <Card key={`former-${index}`} className="border">
                  <CardHeader className="flex items-center justify-between">
                    <CardTitle>Former Owner #{index + 1}</CardTitle>
                    <Button variant="destructive" size="icon" onClick={() => removeFormerOwner(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <FormField
                      control={form.control}
                      name={`former_owners.${index}.name` as const}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Former Owner's Full Name" {...field} value={owner.name} onChange={(e) => updateFormerOwner(index, { ...owner, name: e.target.value })} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`former_owners.${index}.tax_id` as const}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tax ID</FormLabel>
                          <FormControl>
                            <Input placeholder="EIN or SSN" {...field} value={owner.tax_id} onChange={(e) => updateFormerOwner(index, { ...owner, tax_id: e.target.value })} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`former_owners.${index}.address` as const}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input placeholder="Former Owner's Address" {...field} value={owner.address} onChange={(e) => updateFormerOwner(index, { ...owner, address: e.target.value })} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`former_owners.${index}.former_ownership_percentage` as const}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Former Ownership Percentage</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="0-100"
                              {...field}
                              value={owner.former_ownership_percentage}
                              onChange={(e) => {
                                const value = parseFloat(e.target.value);
                                updateFormerOwner(index, { ...owner, former_ownership_percentage: isNaN(value) ? 0 : value });
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`former_owners.${index}.citizenship_status` as const}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Citizenship Status</FormLabel>
                          <Select
                            onValueChange={(value) => updateFormerOwner(index, { ...owner, citizenship_status: value })}
                            defaultValue={owner.citizenship_status}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select citizenship status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {citizenshipStatuses.map((status) => (
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
                    <FormField
                      control={form.control}
                      name={`former_owners.${index}.date_ownership_ceased` as const}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date Ownership Ceased</FormLabel>
                          <FormControl>
                            <DatePicker
                              onSelect={(date) => {
                                if (date) {
                                  updateFormerOwner(index, { ...owner, date_ownership_ceased: date });
                                }
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex gap-4">
                      <FormField
                        control={form.control}
                        name={`former_owners.${index}.is_still_associate` as const}
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Still Associate?</FormLabel>
                              <FormDescription>
                                Is the former owner still associated with the business?
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={owner.is_still_associate}
                                onCheckedChange={(checked) => updateFormerOwner(index, { ...owner, is_still_associate: checked })}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`former_owners.${index}.is_still_employed` as const}
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Still Employed?</FormLabel>
                              <FormDescription>
                                Is the former owner still employed by the business?
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={owner.is_still_employed}
                                onCheckedChange={(checked) => updateFormerOwner(index, { ...owner, is_still_employed: checked })}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={addFormerOwner}>
                <Plus className="mr-2 h-4 w-4" />
                Add Former Owner
              </Button>
            </TabsContent>
          </Tabs>
        </form>
      </Form>
    </div>
  );
};

export default OwnershipForm;
