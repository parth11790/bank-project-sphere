
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Trash2 } from 'lucide-react';
import { DatePicker } from '@/components/ui/date-picker';
import { Control } from 'react-hook-form';
import { OwnershipFormValues } from '../../schemas/ownershipSchema';

interface FormerOwnerFormProps {
  index: number;
  control: Control<OwnershipFormValues>;
  citizenshipOptions: string[];
  onRemove: () => void;
}

export const FormerOwnerForm: React.FC<FormerOwnerFormProps> = ({ 
  index, 
  control, 
  citizenshipOptions,
  onRemove
}) => {
  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-md flex items-center justify-between">
          <span>Former Owner {index + 1}</span>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onRemove}
          >
            <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
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
            control={control}
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
          control={control}
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
            control={control}
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
            control={control}
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
          control={control}
          name={`former_owners.${index}.date_ownership_ceased`}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date Ownership Ceased*</FormLabel>
              <FormControl>
                <DatePicker
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) => date > new Date() || date < new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
                />
              </FormControl>
              <FormDescription>
                Must be within the past 6 months for lookback requirement
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
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
          control={control}
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
  );
};
