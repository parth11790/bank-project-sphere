
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const formSchema = z.object({
  name: z.string().min(2, { message: "Business name is required" }),
  entity_type: z.string().min(2, { message: "Entity type is required" }),
  title: z.string().min(2, { message: "Your title is required" }),
  ownership_percentage: z.coerce
    .number()
    .min(1, { message: "Ownership must be at least 1%" })
    .max(100, { message: "Ownership cannot exceed 100%" }),
});

export interface BusinessFormData {
  name: string;
  entity_type: string;
  title: string;
  ownership_percentage: number;
}

interface BusinessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: BusinessFormData) => void;
}

const entityTypes = [
  "LLC",
  "S-Corp",
  "C-Corp",
  "Partnership",
  "Sole Proprietorship"
];

const BusinessDialog: React.FC<BusinessDialogProps> = ({ 
  open, 
  onOpenChange,
  onSave,
}) => {
  const form = useForm<BusinessFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      entity_type: '',
      title: '',
      ownership_percentage: 100,
    },
  });

  function handleSubmit(values: BusinessFormData) {
    onSave(values);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Business</DialogTitle>
          <DialogDescription>
            Add business details for this participant
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter business name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="entity_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Entity Type</FormLabel>
                  <Select 
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select entity type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {entityTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Title</FormLabel>
                  <FormControl>
                    <Input placeholder="E.g. Owner, CEO, President" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ownership_percentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ownership Percentage</FormLabel>
                  <FormControl>
                    <div className="flex items-center">
                      <Input 
                        type="number" 
                        placeholder="100" 
                        min={1} 
                        max={100}
                        className="flex-1"
                        {...field} 
                      />
                      <span className="ml-2 text-sm">%</span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  form.reset();
                  onOpenChange(false);
                }}
              >
                Cancel
              </Button>
              <Button type="submit">Add Business</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BusinessDialog;
