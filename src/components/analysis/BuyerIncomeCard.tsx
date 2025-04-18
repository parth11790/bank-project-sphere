import React from 'react';
import { Calculator } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

interface BuyerIncomeCardProps {
  netWorth: number;
  requiredSalary: number;
  availableCashForDebt: number;
  projectId?: string;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
};

const BuyerIncomeCard: React.FC<BuyerIncomeCardProps> = ({
  netWorth,
  requiredSalary,
  availableCashForDebt,
  projectId,
}) => {
  const navigate = useNavigate();

  return (
    <Card 
      className="cursor-pointer transition-shadow hover:shadow-md"
      onClick={() => projectId && navigate(`/project/buyer-analysis/${projectId}`)}
    >
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Calculator className="h-4 w-4" />
          Buyer Income Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Net Worth</span>
            <span className="font-medium">{formatCurrency(netWorth)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Required Salary</span>
            <span className="font-medium">{formatCurrency(requiredSalary)}/year</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Available Cash for Debt</span>
            <span className="font-medium">{formatCurrency(availableCashForDebt)}/month</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BuyerIncomeCard;
