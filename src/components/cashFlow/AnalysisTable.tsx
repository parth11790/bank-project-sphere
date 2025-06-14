import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Toggle } from '@/components/ui/toggle';
import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';
import IncomeStatementAnalysis from './IncomeStatementAnalysis';
import CashFlowTableCell from './CashFlowTableCell';
import { useCashFlowCalculations } from '@/hooks/useCashFlowCalculations';

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
  const { tableData, getDataSafely, calculateYearlyChange, handleValueChange } = useCashFlowCalculations(mockData);
  const [showPercentages, setShowPercentages] = useState(true);

  const editableRows = [
    'grossRevenue', 'wages', 'cogs', 'depreciation', 'amortization',
    'interest', 'borrowerOC', 'rentAddback', 'depAdjM1', 'adjustments', 'bookIncome'
  ];

  const showChangeIndicator = (rowKey: string): boolean => {
    return ['grossRevenue', 'wages', 'cogs', 'noi', 'availableCF', 'excessCF'].includes(rowKey);
  };

  const percentageOnlyRows = ['growth', 'grossMargin', 'nom'];

  const getGroupStyle = (group: string) => {
    const styles = {
      revenue: 'bg-emerald-50/50 dark:bg-emerald-950/20',
      expenses: 'bg-red-50/50 dark:bg-red-950/20',
      profit: 'bg-blue-50/50 dark:bg-blue-950/20',
      adjustments: 'bg-gray-50/50 dark:bg-gray-950/20',
      income: 'bg-purple-50/50 dark:bg-purple-950/20',
      loans: 'bg-amber-50/50 dark:bg-amber-950/20',
      debt: 'bg-orange-50/50 dark:bg-orange-950/20',
      summary: 'bg-cyan-50/50 dark:bg-cyan-950/20'
    };
    return styles[group as keyof typeof styles] || '';
  };

  const calculateDSCPreOC = (periodIndex: number): number => {
    const noi = getDataSafely('noi', periodIndex);
    const debtService = getDataSafely('debtService', periodIndex);
    return debtService !== 0 ? Number((noi / debtService).toFixed(2)) : 0;
  };

  const calculateDSCPostOC = (periodIndex: number): number => {
    const noi = getDataSafely('noi', periodIndex);
    const requiredOC = getDataSafely('requiredOfficerComp', periodIndex);
    const debtService = getDataSafely('debtService', periodIndex);
    
    if (debtService === 0) return 0;
    
    return Number(((noi - requiredOC) / debtService).toFixed(2));
  };

  const rows = [
    { label: 'Gross Revenue', key: 'grossRevenue', group: 'revenue' },
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
    { label: 'Excess CF', key: 'excessCF', group: 'summary', negative: true, bold: true },
    { label: 'DSC (Pre OC)', key: 'dscPreOc', group: 'summary', bold: true },
    { label: 'DSC (Post OC)', key: 'dscPostOc', group: 'summary', bold: true }
  ].filter(row => showPercentages || !percentageOnlyRows.includes(row.key));

  const dscPreOcValues = periods.map((_, index) => calculateDSCPreOC(index));
  const dscPostOcValues = periods.map((_, index) => calculateDSCPostOC(index));

  const tableDataWithDSC = {
    ...tableData,
    dscPreOc: dscPreOcValues,
    dscPostOc: dscPostOcValues
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-xl">
              Company Name #1
            </CardTitle>
            <CardDescription>Cash Flow Analysis</CardDescription>
          </div>
          <Toggle
            pressed={showPercentages}
            onPressedChange={setShowPercentages}
            aria-label="Toggle percentages"
            className="flex items-center gap-2"
          >
            {showPercentages ? (
              <Eye className="h-4 w-4" />
            ) : (
              <EyeOff className="h-4 w-4" />
            )}
            <span className="text-sm">Percentages</span>
          </Toggle>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[250px] font-semibold">Statement Date</TableHead>
                {periods.map((period, index) => (
                  <TableHead key={index} className="text-right">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 pr-2 text-right">
                        <div className="font-semibold">{period.type}</div>
                        <div className="text-muted-foreground">{period.date}</div>
                        <div className="text-xs text-muted-foreground">{period.months} months</div>
                      </div>
                      <div className="w-16 invisible">-</div>
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow 
                  key={row.key} 
                  className={cn(
                    getGroupStyle(row.group),
                    row.bold && 'font-semibold'
                  )}
                >
                  <TableCell className="font-medium">
                    {row.label}
                  </TableCell>
                  {periods.map((_, periodIndex) => (
                    <CashFlowTableCell
                      key={periodIndex}
                      rowKey={row.key}
                      periodIndex={periodIndex}
                      value={
                        row.key === 'dscPreOc' 
                          ? dscPreOcValues[periodIndex] 
                          : row.key === 'dscPostOc'
                            ? dscPostOcValues[periodIndex]
                            : getDataSafely(row.key, periodIndex)
                      }
                      isEditable={editableRows.includes(row.key)}
                      showChangeIndicator={showChangeIndicator(row.key)}
                      formatCurrency={formatCurrency}
                      onChange={handleValueChange}
                      calculateYearlyChange={calculateYearlyChange}
                      showPercentages={showPercentages}
                    />
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
