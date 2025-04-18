import React from 'react';
import { BarChart3 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

interface BusinessCashFlowCardProps {
  averageCashFlow: number;
  debtServiceRatioBeforeOC: number;
  debtServiceRatioAfterOC: number;
  projectId?: string;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatRatio = (ratio: number) => {
  return ratio.toFixed(2);
};

const BusinessCashFlowCard: React.FC<BusinessCashFlowCardProps> = ({
  averageCashFlow,
  debtServiceRatioBeforeOC,
  debtServiceRatioAfterOC,
  projectId,
}) => {
  const navigate = useNavigate();

  return (
    <Card 
      className="cursor-pointer transition-shadow hover:shadow-md"
      onClick={() => projectId && navigate(`/project/cash-flow/${projectId}`)}
    >
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <BarChart3 className="h-4 w-4" />
          Business Cash Flow Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Average Cash Flow</span>
            <span className="font-medium">{formatCurrency(averageCashFlow)}/year</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">DSR (Before OC)</span>
            <span className="font-medium">{formatRatio(debtServiceRatioBeforeOC)}x</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">DSR (After OC)</span>
            <span className="font-medium">{formatRatio(debtServiceRatioAfterOC)}x</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessCashFlowCard;
