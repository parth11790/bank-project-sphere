
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ReferralFee } from '@/types/referral';

const referralSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  fee_type: z.enum(['percentage', 'flat'], {
    required_error: 'Fee type is required',
  }),
  fee_amount: z.number().min(0, 'Fee amount must be positive'),
  discussion_notes: z.string().optional(),
});

type ReferralFormData = z.infer<typeof referralSchema>;

interface ReferralDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  referralFee?: ReferralFee | null;
  onSave: (data: Partial<ReferralFee>) => void;
}

export const ReferralDialog: React.FC<ReferralDialogProps> = ({
  open,
  onOpenChange,
  referralFee,
  onSave,
}) => {
  const form = useForm<ReferralFormData>({
    resolver: zodResolver(referralSchema),
    defaultValues: {
      name: referralFee?.name || '',
      fee_type: referralFee?.fee_type || 'percentage',
      fee_amount: referralFee?.fee_amount || 0,
      discussion_notes: referralFee?.discussion_notes || '',
    },
  });

  React.useEffect(() => {
    if (referralFee) {
      form.reset({
        name: referralFee.name,
        fee_type: referralFee.fee_type,
        fee_amount: referralFee.fee_amount,
        discussion_notes: referralFee.discussion_notes,
      });
    } else {
      form.reset({
        name: '',
        fee_type: 'percentage',
        fee_amount: 0,
        discussion_notes: '',
      });
    }
  }, [referralFee, form]);

  const onSubmit = (data: ReferralFormData) => {
    onSave(data);
    form.reset();
  };

  const handleCancel = () => {
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {referralFee ? 'Edit Referral Fee' : 'Add Referral Fee'}
          </DialogTitle>
          <DialogDescription>
            Enter information about the referral source and associated fees.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Referral Source Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter referral source name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fee_type"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Fee Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="percentage" id="percentage" />
                        <label htmlFor="percentage" className="text-sm font-medium">
                          Percentage Fee (%)
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="flat" id="flat" />
                        <label htmlFor="flat" className="text-sm font-medium">
                          Flat Fee ($)
                        </label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fee_amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Fee Amount {form.watch('fee_type') === 'percentage' ? '(%)' : '($)'}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step={form.watch('fee_type') === 'percentage' ? '0.01' : '1'}
                      min="0"
                      placeholder={
                        form.watch('fee_type') === 'percentage' ? 'e.g., 2.5' : 'e.g., 5000'
                      }
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="discussion_notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discussion on Referral Source</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter notes about discussions with the referral source..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit">
                {referralFee ? 'Update' : 'Add'} Referral Fee
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
