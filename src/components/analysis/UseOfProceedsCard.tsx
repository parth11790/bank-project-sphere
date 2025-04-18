import React from 'react';
import { FileText } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

interface UseOfProceedsCardProps {
  projectId: string;
  proceedsTotals: {
    borrower: number;
    seller: number;
    loanType1: number;
    loanType2: number;
    overall: number;
  };
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
};

const UseOfProceedsCard: React.FC<UseOfProceedsCardProps> = ({
  projectId,
  proceedsTotals,
}) => {
  const navigate = useNavigate();

  return (
    <Card 
      className="cursor-pointer transition-shadow hover:shadow-md"
      onClick={() => navigate(`/project/use-of-proceeds/${projectId}`)}
    >
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Use of Proceeds Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Borrower Total</span>
            <span className="font-medium">{formatCurrency(proceedsTotals.borrower)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Seller Total</span>
            <span className="font-medium">{formatCurrency(proceedsTotals.seller)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Construction</span>
            <span className="font-medium">{formatCurrency(proceedsTotals.loanType1)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Working Capital</span>
            <span className="font-medium">{formatCurrency(proceedsTotals.loanType2)}</span>
          </div>
          <div className="flex justify-between items-center font-medium pt-2 border-t">
            <span>Overall Total</span>
            <span>{formatCurrency(proceedsTotals.overall)}</span>
          </div>
        </div>
        <Button 
          variant="outline" 
          className="w-full mt-4"
          onClick={() => navigate(`/project/use-of-proceeds/${projectId}`)}
        >
          View Full Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default UseOfProceedsCard;
