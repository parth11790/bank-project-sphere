
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PersonalInformationFormValues } from '../schemas/personalInformationSchema';
import { NetWorthFormValues } from '../schemas/netWorthSchema';
import { Participant } from '@/types/participant';

interface NetWorthSectionProps {
  form: UseFormReturn<PersonalInformationFormValues | NetWorthFormValues>;
  participant?: Participant;
}

export const NetWorthSection: React.FC<NetWorthSectionProps> = ({
  form
}) => {
  // Asset fields
  const assetFields = [
    { key: 'cash_on_hand', label: 'Cash on Hand & in Banks' },
    { key: 'savings_accounts', label: 'Savings Accounts' },
    { key: 'ira_retirement', label: 'IRA/Retirement Accounts' },
    { key: 'accounts_notes_receivable', label: 'Accounts & Notes Receivable' },
    { key: 'csvli_cash_value', label: 'CSVLI - Cash Surrender Value of Life Insurance' },
    { key: 'stocks_bonds', label: 'Stocks & Bonds' },
    { key: 'real_estate_residence', label: 'Real Estate - Single-Family Residence' },
    { key: 'real_estate_commercial', label: 'Real Estate - Commercial' },
    { key: 'real_estate_investment', label: 'Real Estate - Investment' },
    { key: 'real_estate_rental', label: 'Real Estate - Rental' },
    { key: 'automobiles', label: 'Automobiles' },
    { key: 'other_personal_property', label: 'Other Personal Property' },
    { key: 'other_assets', label: 'Other Assets' }
  ];

  // Liability fields
  const liabilityFields = [
    { key: 'accounts_payable', label: 'Accounts Payable' },
    { key: 'notes_payable_banks', label: 'Notes Payable to Bank & Others' },
    { key: 'auto_loans', label: 'Auto Loans' },
    { key: 'other_installment', label: 'Other Installment' },
    { key: 'loan_life_insurance', label: 'Loan on Life Insurance' },
    { key: 'education_loans', label: 'Education loans' },
    { key: 'mortgage_sfr', label: 'Mortgage - SFR' },
    { key: 'mortgage_commercial', label: 'Mortgage - Commercial' },
    { key: 'mortgage_investment', label: 'Mortgage - Investment' },
    { key: 'mortgage_rental', label: 'Mortgage - Rental' },
    { key: 'unpaid_taxes', label: 'Unpaid Taxes' },
    { key: 'margin_accounts', label: 'Margin Accounts' },
    { key: 'other_liabilities', label: 'Other Liabilities' }
  ];

  // Calculate totals
  const totalAssets = assetFields.reduce((sum, field) => {
    const value = parseFloat(form.watch(`networth_${field.key}` as any) as string || '0');
    return sum + value;
  }, 0);

  const totalLiabilities = liabilityFields.reduce((sum, field) => {
    const value = parseFloat(form.watch(`networth_${field.key}` as any) as string || '0');
    return sum + value;
  }, 0);

  const netWorth = totalAssets - totalLiabilities;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const renderInputField = (fieldKey: string) => (
    <FormField
      control={form.control}
      name={`networth_${fieldKey}` as any}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              type="number"
              placeholder="0"
              {...field}
              className="text-right"
              value={field.value as string || ''}
              onChange={(e) => field.onChange(e.target.value)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  return (
    <div className="space-y-4">
      {/* Credit Information */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Credit Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/4">Type</TableHead>
                <TableHead className="text-center">Name</TableHead>
                <TableHead className="text-center">Credit Score</TableHead>
                <TableHead className="text-center">Source</TableHead>
                <TableHead className="text-center">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Individual</TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name="credit_individual_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} className="text-center" value={field.value || ''} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name="credit_individual_score"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} className="text-center" placeholder="780" value={field.value || ''} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name="credit_individual_source"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} className="text-center" placeholder="Experian" value={field.value || ''} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name="credit_individual_date"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} className="text-center" placeholder="5/16/2024" value={field.value || ''} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Spouse</TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name="credit_spouse_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} className="text-center" value={field.value || ''} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name="credit_spouse_score"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} className="text-center" placeholder="630" value={field.value || ''} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name="credit_spouse_source"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} className="text-center" placeholder="Equifax" value={field.value || ''} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name="credit_spouse_date"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} className="text-center" placeholder="5/16/2024" value={field.value || ''} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Net Worth Calculation */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base text-center bg-blue-100 py-2">
            NET WORTH: {formatCurrency(netWorth)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Assets */}
            <div>
              <h4 className="font-semibold mb-3 text-center bg-gray-100 py-1">ASSETS:</h4>
              <Table>
                <TableBody>
                  {assetFields.map((field) => (
                    <TableRow key={field.key}>
                      <TableCell className="font-medium text-sm py-1">
                        {field.label}
                      </TableCell>
                      <TableCell className="py-1 w-32">
                        {renderInputField(field.key)}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-gray-100 font-semibold">
                    <TableCell className="py-2">TOTAL ASSETS:</TableCell>
                    <TableCell className="py-2 text-right">
                      {formatCurrency(totalAssets)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            {/* Liabilities */}
            <div>
              <h4 className="font-semibold mb-3 text-center bg-gray-100 py-1">LIABILITIES:</h4>
              <Table>
                <TableBody>
                  {liabilityFields.map((field) => (
                    <TableRow key={field.key}>
                      <TableCell className="font-medium text-sm py-1">
                        {field.label}
                      </TableCell>
                      <TableCell className="py-1 w-32">
                        {renderInputField(field.key)}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-gray-100 font-semibold">
                    <TableCell className="py-2">TOTAL LIABILITIES:</TableCell>
                    <TableCell className="py-2 text-right">
                      {formatCurrency(totalLiabilities)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
