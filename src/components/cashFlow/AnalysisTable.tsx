
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
  mockData: Record<string, number[]>;
}

const AnalysisTable: React.FC<AnalysisTableProps> = ({ periods, formatCurrency, mockData }) => {
  // Define the rows with a consistent key that maps to mockData
  const rows = [
    { label: 'Gross Revenue', key: 'grossRevenue', group: 'revenue' },
    { label: 'Growth', key: 'growth', group: 'revenue' },
    { label: 'Wages', key: 'wages', group: 'expenses' },
    { label: 'COGS', key: 'cogs', group: 'expenses' },
    { label: 'Gross Profit', key: 'grossProfit', group: 'profit', bold: true },
    { label: 'Gross Margin', key: 'grossMargin', group: 'profit' },
    { label: 'Depreciation', key: 'depreciation', group: 'adjustments' },
    { label: 'Amortization', key: 'amortization', group: 'adjustments' },
    { label: 'Interest', key: 'interest', group: 'adjustments' },
    { label: 'Existing Borrower OC', key: 'borrowerOC', group: 'adjustments' },
    { label: 'Rent Addback', key: 'rentAddback', group: 'adjustments' },
    { label: 'Dep. Adj. M-1', key: 'depAdjM1', group: 'adjustments' },
    { label: 'Adjustments', key: 'adjustments', group: 'adjustments' },
    { label: 'M-1 Book Income', key: 'bookIncome', group: 'income', bold: true },
    { label: 'NOI', key: 'noi', group: 'income' },
    { label: 'NOM', key: 'nom', group: 'income' },
    { label: 'Proposed SBA Loan #1', key: 'proposedLoan1', group: 'loans' },
    { label: 'Proposed SBA Loan #2', key: 'proposedLoan2', group: 'loans' },
    { label: 'Proposed SBA Loan #3', key: 'proposedLoan3', group: 'loans' },
    { label: 'Proposed SBA Loan #4', key: 'proposedLoan4', group: 'loans' },
    { label: 'Seller Carry Debt', key: 'sellerCarryDebt', group: 'debt' },
    { label: 'Existing Business Debt', key: 'existingDebt', group: 'debt' },
    { label: 'Other Debt', key: 'otherDebt', group: 'debt' },
    { label: 'Debt Service', key: 'debtService', group: 'summary', bold: true },
    { label: 'Available CF', key: 'availableCF', group: 'summary', bold: true },
    { label: 'Required Officer Comp', key: 'requiredOfficerComp', group: 'summary' },
    { label: 'Excess CF', key: 'excessCF', group: 'summary', negative: true, bold: true }
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

  // Helper function to safely get data with fallback
  const getDataSafely = (key: string, periodIndex: number): number => {
    if (!mockData[key] || !Array.isArray(mockData[key])) {
      return 0; // Return 0 as fallback if data doesn't exist
    }
    
    return mockData[key][periodIndex] || 0;
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
              {rows.map((row, index) => {
                const isTotal = row.bold;
                
                return (
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
                    {periods.map((_, periodIndex) => {
                      const value = getDataSafely(row.key, periodIndex);
                      
                      return (
                        <TableCell 
                          key={periodIndex} 
                          className={cn(
                            "text-right",
                            row.negative && "text-red-600 dark:text-red-400"
                          )}
                        >
                          {row.label === 'Growth' || row.label === 'Gross Margin' || row.label === 'NOM'
                            ? `${value.toFixed(1)}%`
                            : formatCurrency(value)}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        <IncomeStatementAnalysis />
      </CardContent>
    </Card>
  );
};

export default AnalysisTable;
