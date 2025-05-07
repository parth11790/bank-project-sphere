
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Trash2 } from 'lucide-react';
import { Owner } from '../../schemas/ownershipSchema';
import { Control } from 'react-hook-form';
import { OwnershipFormValues } from '../../schemas/ownershipSchema';

interface CurrentOwnerFormProps {
  index: number;
  control: Control<OwnershipFormValues>;
  citizenshipOptions: string[];
  onRemove: () => void;
  canDelete: boolean;
}

export const CurrentOwnerForm: React.FC<CurrentOwnerFormProps> = ({ 
  index, 
  control, 
  citizenshipOptions,
  onRemove,
  canDelete
}) => {
  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-md flex items-center justify-between">
          <span>Owner {index + 1}</span>
          {canDelete && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onRemove}
            >
              <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
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
            control={control}
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
          control={control}
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
            control={control}
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
            control={control}
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
  );
};
