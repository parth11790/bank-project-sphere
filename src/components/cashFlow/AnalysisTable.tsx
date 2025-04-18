
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import IncomeStatementAnalysis from './IncomeStatementAnalysis';

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

  const getGroupStyle = (group: string) => {
    switch (group) {
      case 'revenue':
        return 'bg-emerald-50/50 dark:bg-emerald-950/20';
      case 'expenses':
        return 'bg-red-50/50 dark:bg-red-950/20';
      case 'profit':
        return 'bg-blue-50/50 dark:bg-blue-950/20';
      case 'adjustments':
        return 'bg-gray-50/50 dark:bg-gray-950/20';
      case 'income':
        return 'bg-purple-50/50 dark:bg-purple-950/20';
      case 'loans':
        return 'bg-amber-50/50 dark:bg-amber-950/20';
      case 'debt':
        return 'bg-orange-50/50 dark:bg-orange-950/20';
      case 'summary':
        return 'bg-cyan-50/50 dark:bg-cyan-950/20';
      default:
        return '';
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-xl">
          Company Name #1
        </CardTitle>
        <CardDescription>Cash Flow Analysis</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[250px] font-semibold">Statement Date</TableHead>
                {periods.map((period, index) => (
                  <TableHead key={index} className="text-right">
                    <div className="font-semibold">{period.type}</div>
                    <div className="text-muted-foreground">{period.date}</div>
                    <div className="text-xs text-muted-foreground">{period.months} months</div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow 
                  key={index} 
                  className={cn(
                    getGroupStyle(row.group),
                    row.bold && 'font-semibold'
                  )}
                >
                  <TableCell className="font-medium">
                    {row.label}
                  </TableCell>
                  {periods.map((_, periodIndex) => (
                    <TableCell 
                      key={periodIndex} 
                      className={cn(
                        "text-right",
                        row.negative && "text-red-600 dark:text-red-400"
                      )}
                    >
                      {formatCurrency(0)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <IncomeStatementAnalysis />
      </CardContent>
    </Card>
  );
};

export default AnalysisTable;
