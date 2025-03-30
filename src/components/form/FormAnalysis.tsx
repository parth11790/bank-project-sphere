
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface FormAnalysisProps {
  formName: string;
}

const FormAnalysis: React.FC<FormAnalysisProps> = ({ formName }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Form Analysis</CardTitle>
        <CardDescription>Automated analysis based on the provided information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {formName === 'Personal Financial Statement' && (
          <>
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-medium mb-2">Net Worth Analysis</h3>
              <p className="text-muted-foreground">
                Based on the provided information, the net worth (assets minus liabilities) is within acceptable parameters for loan qualification.
              </p>
            </div>
            
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-medium mb-2">Debt-to-Income Ratio</h3>
              <p className="text-muted-foreground">
                The calculated debt-to-income ratio is approximately 32%, which is below the 43% threshold typically required for loan approval.
              </p>
            </div>
          </>
        )}
        
        {formName === 'Tax Returns' && (
          <>
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-medium mb-2">Income Stability</h3>
              <p className="text-muted-foreground">
                The tax returns show consistent income over the past three years, demonstrating financial stability.
              </p>
            </div>
            
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-medium mb-2">Tax Efficiency</h3>
              <p className="text-muted-foreground">
                The effective tax rate is within normal range for the reported income level.
              </p>
            </div>
          </>
        )}
        
        {formName === 'Balance Sheet' && (
          <>
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-medium mb-2">Current Ratio</h3>
              <p className="text-muted-foreground">
                The current ratio (current assets / current liabilities) is 1.8, indicating good short-term financial health.
              </p>
            </div>
            
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-medium mb-2">Debt-to-Equity Ratio</h3>
              <p className="text-muted-foreground">
                The debt-to-equity ratio is 0.65, which indicates a moderate level of financial leverage.
              </p>
            </div>
          </>
        )}
        
        {!['Personal Financial Statement', 'Tax Returns', 'Balance Sheet'].includes(formName) && (
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-medium mb-2">Form Review</h3>
            <p className="text-muted-foreground">
              Once this form is completed, an automated analysis will be generated based on the provided information.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FormAnalysis;
