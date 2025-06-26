
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info, Save } from 'lucide-react';

interface Business {
  id: string;
  name: string;
  type: string;
}

interface ConsolidatedCashFlowTableProps {
  projectId: string;
  selectedBusinesses: string[];
  availableBusinesses: Business[];
}

const ConsolidatedCashFlowTable: React.FC<ConsolidatedCashFlowTableProps> = ({
  projectId,
  selectedBusinesses,
  availableBusinesses
}) => {
  const years = ['2021', '2022', '2023', '2024', '2025'];
  
  // Mock ROC data for each year
  const [rocValues, setRocValues] = useState<Record<string, number>>({
    '2021': 150000,
    '2022': 155000,
    '2023': 160000,
    '2024': 165000,
    '2025': 170000
  });

  // Mock consolidated financial data
  const getConsolidatedData = () => {
    const mockData: Record<string, Record<string, number>> = {};
    
    years.forEach(year => {
      // Simulate different financial performance by year
      const baseMultiplier = parseInt(year) >= 2023 ? 1.1 : 1.0;
      
      mockData[year] = {
        revenue: Math.round(3500000 * baseMultiplier * selectedBusinesses.length * 0.7),
        cogs: Math.round(1400000 * baseMultiplier * selectedBusinesses.length * 0.7),
        wages: Math.round(850000 * baseMultiplier * selectedBusinesses.length * 0.7),
        rent: Math.round(180000 * baseMultiplier * selectedBusinesses.length * 0.7),
        utilities: Math.round(45000 * baseMultiplier * selectedBusinesses.length * 0.7),
        insurance: Math.round(35000 * baseMultiplier * selectedBusinesses.length * 0.7),
        otherExpenses: Math.round(125000 * baseMultiplier * selectedBusinesses.length * 0.7),
        // Debt payments
        sbaLoanPayment: 285000,
        sellerCarryDebt: 96000,
        existingBusinessDebt: 145000,
        otherDebt: 24000,
        // Adjustments
        depreciation: Math.round(75000 * baseMultiplier * selectedBusinesses.length * 0.7),
        interestExpense: Math.round(45000 * baseMultiplier * selectedBusinesses.length * 0.7)
      };
    });
    
    return mockData;
  };

  const consolidatedData = getConsolidatedData();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleRocChange = (year: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setRocValues(prev => ({ ...prev, [year]: numValue }));
  };

  const calculateTotalNOI = (year: string) => {
    const data = consolidatedData[year];
    const grossProfit = data.revenue - data.cogs;
    const totalExpenses = data.wages + data.rent + data.utilities + data.insurance + data.otherExpenses;
    const noi = grossProfit - totalExpenses + data.depreciation + data.interestExpense;
    return noi;
  };

  const calculateTotalDebt = (year: string) => {
    const data = consolidatedData[year];
    return data.sbaLoanPayment + data.sellerCarryDebt + data.existingBusinessDebt + data.otherDebt;
  };

  const calculateExcessCashFlow = (year: string) => {
    const totalNOI = calculateTotalNOI(year);
    const totalDebt = calculateTotalDebt(year);
    return totalNOI - totalDebt;
  };

  const calculateDSCRPreROC = (year: string) => {
    const totalNOI = calculateTotalNOI(year);
    const totalDebt = calculateTotalDebt(year);
    return totalDebt > 0 ? totalNOI / totalDebt : 0;
  };

  const calculateDSCRPostROC = (year: string) => {
    const totalNOI = calculateTotalNOI(year);
    const roc = rocValues[year] || 0;
    const totalDebt = calculateTotalDebt(year);
    return totalDebt > 0 ? (totalNOI - roc) / totalDebt : 0;
  };

  const getDSCRColor = (ratio: number) => {
    if (ratio >= 1.25) return 'text-green-600 font-semibold';
    if (ratio >= 1.0) return 'text-yellow-600 font-semibold';
    return 'text-red-600 font-semibold';
  };

  const selectedBusinessNames = availableBusinesses
    .filter(b => selectedBusinesses.includes(b.id))
    .map(b => b.name);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="text-sm text-muted-foreground">Selected Businesses:</span>
        {selectedBusinessNames.map(name => (
          <Badge key={name} variant="outline" className="text-xs">
            {name}
          </Badge>
        ))}
      </div>

      <div className="overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-64 font-semibold">Financial Item</TableHead>
              {years.map(year => (
                <TableHead key={year} className="text-center font-semibold">
                  {year}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Revenue Section */}
            <TableRow className="bg-blue-50">
              <TableCell className="font-semibold text-blue-800">REVENUE</TableCell>
              {years.map(year => (
                <TableCell key={year} className="text-center font-semibold text-blue-800">
                  {formatCurrency(consolidatedData[year].revenue)}
                </TableCell>
              ))}
            </TableRow>

            {/* Expenses Section */}
            <TableRow className="bg-red-50">
              <TableCell className="font-semibold text-red-800">EXPENSES</TableCell>
              <TableCell colSpan={years.length}></TableCell>
            </TableRow>
            
            <TableRow>
              <TableCell className="pl-6">Cost of Goods Sold (COGS)</TableCell>
              {years.map(year => (
                <TableCell key={year} className="text-center">
                  {formatCurrency(consolidatedData[year].cogs)}
                </TableCell>
              ))}
            </TableRow>
            
            <TableRow>
              <TableCell className="pl-6">Wages</TableCell>
              {years.map(year => (
                <TableCell key={year} className="text-center">
                  {formatCurrency(consolidatedData[year].wages)}
                </TableCell>
              ))}
            </TableRow>
            
            <TableRow>
              <TableCell className="pl-6">Rent</TableCell>
              {years.map(year => (
                <TableCell key={year} className="text-center">
                  {formatCurrency(consolidatedData[year].rent)}
                </TableCell>
              ))}
            </TableRow>
            
            <TableRow>
              <TableCell className="pl-6">Utilities</TableCell>
              {years.map(year => (
                <TableCell key={year} className="text-center">
                  {formatCurrency(consolidatedData[year].utilities)}
                </TableCell>
              ))}
            </TableRow>
            
            <TableRow>
              <TableCell className="pl-6">Insurance</TableCell>
              {years.map(year => (
                <TableCell key={year} className="text-center">
                  {formatCurrency(consolidatedData[year].insurance)}
                </TableCell>
              ))}
            </TableRow>
            
            <TableRow>
              <TableCell className="pl-6">Other Expenses</TableCell>
              {years.map(year => (
                <TableCell key={year} className="text-center">
                  {formatCurrency(consolidatedData[year].otherExpenses)}
                </TableCell>
              ))}
            </TableRow>

            {/* Adjustments Section */}
            <TableRow className="bg-green-50">
              <TableCell className="font-semibold text-green-800">ADJUSTMENTS</TableCell>
              <TableCell colSpan={years.length}></TableCell>
            </TableRow>
            
            <TableRow>
              <TableCell className="pl-6">Add Back: Depreciation</TableCell>
              {years.map(year => (
                <TableCell key={year} className="text-center text-green-600">
                  +{formatCurrency(consolidatedData[year].depreciation)}
                </TableCell>
              ))}
            </TableRow>
            
            <TableRow>
              <TableCell className="pl-6">Add Back: Interest Expense</TableCell>
              {years.map(year => (
                <TableCell key={year} className="text-center text-green-600">
                  +{formatCurrency(consolidatedData[year].interestExpense)}
                </TableCell>
              ))}
            </TableRow>

            {/* Total NOI */}
            <TableRow className="border-t-2 bg-primary/10">
              <TableCell className="font-bold">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="flex items-center gap-2">
                      TOTAL NET OPERATING INCOME (NOI)
                      <Info className="h-4 w-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Revenue - COGS - Operating Expenses + Adjustments</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              {years.map(year => (
                <TableCell key={year} className="text-center font-bold text-primary">
                  {formatCurrency(calculateTotalNOI(year))}
                </TableCell>
              ))}
            </TableRow>

            {/* Debt Payments */}
            <TableRow className="bg-orange-50">
              <TableCell className="font-semibold text-orange-800">DEBT PAYMENTS</TableCell>
              <TableCell colSpan={years.length}></TableCell>
            </TableRow>
            
            <TableRow>
              <TableCell className="pl-6">SBA Loan Annual Payment</TableCell>
              {years.map(year => (
                <TableCell key={year} className="text-center">
                  {formatCurrency(consolidatedData[year].sbaLoanPayment)}
                </TableCell>
              ))}
            </TableRow>
            
            <TableRow>
              <TableCell className="pl-6">Seller Carry Debt</TableCell>
              {years.map(year => (
                <TableCell key={year} className="text-center">
                  {formatCurrency(consolidatedData[year].sellerCarryDebt)}
                </TableCell>
              ))}
            </TableRow>
            
            <TableRow>
              <TableCell className="pl-6">Existing Business Debt</TableCell>
              {years.map(year => (
                <TableCell key={year} className="text-center">
                  {formatCurrency(consolidatedData[year].existingBusinessDebt)}
                </TableCell>
              ))}
            </TableRow>
            
            <TableRow>
              <TableCell className="pl-6">Other Debt</TableCell>
              {years.map(year => (
                <TableCell key={year} className="text-center">
                  {formatCurrency(consolidatedData[year].otherDebt)}
                </TableCell>
              ))}
            </TableRow>

            {/* Excess Cash Flow */}
            <TableRow className="border-t-2 bg-green-100">
              <TableCell className="font-bold text-green-800">EXCESS CASH FLOW</TableCell>
              {years.map(year => (
                <TableCell key={year} className="text-center font-bold text-green-800">
                  {formatCurrency(calculateExcessCashFlow(year))}
                </TableCell>
              ))}
            </TableRow>

            {/* Required Officers Compensation */}
            <TableRow className="bg-purple-50">
              <TableCell className="font-semibold text-purple-800">
                Required Officers Compensation (ROC)
              </TableCell>
              {years.map(year => (
                <TableCell key={year} className="text-center">
                  <Input
                    type="number"
                    value={rocValues[year]}
                    onChange={(e) => handleRocChange(year, e.target.value)}
                    className="w-32 text-center"
                  />
                </TableCell>
              ))}
            </TableRow>

            {/* DSCR Calculations */}
            <TableRow className="border-t-2 bg-blue-100">
              <TableCell className="font-bold">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="flex items-center gap-2">
                      DSCR (Pre-ROC)
                      <Info className="h-4 w-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Total NOI ÷ Total Debt Payments</p>
                      <p>Measures ability to service debt before officer compensation</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              {years.map(year => {
                const ratio = calculateDSCRPreROC(year);
                return (
                  <TableCell key={year} className={`text-center font-bold ${getDSCRColor(ratio)}`}>
                    {ratio.toFixed(2)}x
                  </TableCell>
                );
              })}
            </TableRow>

            <TableRow className="bg-purple-100">
              <TableCell className="font-bold">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="flex items-center gap-2">
                      DSCR (Post-ROC)
                      <Info className="h-4 w-4" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>(Total NOI - Required Officers Compensation) ÷ Total Debt Payments</p>
                      <p>Measures ability to service debt after officer compensation</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              {years.map(year => {
                const ratio = calculateDSCRPostROC(year);
                return (
                  <TableCell key={year} className={`text-center font-bold ${getDSCRColor(ratio)}`}>
                    {ratio.toFixed(2)}x
                  </TableCell>
                );
              })}
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-end pt-4">
        <Button>
          <Save className="h-4 w-4 mr-2" />
          Save Analysis
        </Button>
      </div>

      <div className="text-sm text-muted-foreground space-y-1">
        <p><strong>DSCR Guidelines:</strong></p>
        <p>• <span className="text-green-600">≥ 1.25x</span> - Strong cash flow coverage</p>
        <p>• <span className="text-yellow-600">1.00x - 1.24x</span> - Adequate coverage</p>
        <p>• <span className="text-red-600">< 1.00x</span> - Insufficient coverage</p>
      </div>
    </div>
  );
};

export default ConsolidatedCashFlowTable;
