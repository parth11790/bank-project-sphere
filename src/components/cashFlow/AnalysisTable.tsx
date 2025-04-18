
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Period {
  date: string;
  type: string;
  months: number;
}

interface AnalysisTableProps {
  periods: Period[];
  formatCurrency: (amount: number) => string;
}

const AnalysisTable: React.FC<AnalysisTableProps> = ({ periods, formatCurrency }) => {
  const rows = [
    { label: 'Gross Revenue', group: 'revenue' },
    { label: 'Growth', group: 'revenue' },
    { label: 'Wages', group: 'expenses' },
    { label: 'COGS', group: 'expenses' },
    { label: 'Gross Profit', group: 'profit', bold: true },
    { label: 'Gross Margin', group: 'profit' },
    { label: 'Depreciation', group: 'adjustments' },
    { label: 'Amortization', group: 'adjustments' },
    { label: 'Interest', group: 'adjustments' },
    { label: 'Existing Borrower OC', group: 'adjustments' },
    { label: 'Rent Addback', group: 'adjustments' },
    { label: 'Dep. Adj. M-1', group: 'adjustments' },
    { label: 'Adjustments', group: 'adjustments' },
    { label: 'M-1 Book Income', group: 'income', bold: true },
    { label: 'NOI', group: 'income' },
    { label: 'NOM', group: 'income' },
    { label: 'Proposed SBA Loan #1', group: 'loans' },
    { label: 'Proposed SBA Loan #2', group: 'loans' },
    { label: 'Proposed SBA Loan #3', group: 'loans' },
    { label: 'Proposed SBA Loan #4', group: 'loans' },
    { label: 'Seller Carry Debt', group: 'debt' },
    { label: 'Existing Business Debt', group: 'debt' },
    { label: 'Other Debt', group: 'debt' },
    { label: 'Debt Service', group: 'summary', bold: true },
    { label: 'Available CF', group: 'summary', bold: true },
    { label: 'Required Officer Comp', group: 'summary' },
    { label: 'Excess CF', group: 'summary', negative: true, bold: true }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Name #1</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Statement Date</TableHead>
                {periods.map((period, index) => (
                  <TableHead key={index} className="text-right">
                    <div>{period.type}</div>
                    <div>{period.date}</div>
                    <div>{period.months} months</div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index} className={row.bold ? 'font-bold' : ''}>
                  <TableCell className="font-medium">{row.label}</TableCell>
                  {periods.map((_, periodIndex) => (
                    <TableCell key={periodIndex} className="text-right">
                      {formatCurrency(0)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalysisTable;
