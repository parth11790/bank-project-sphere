
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ApprovalWorkflows = () => {
  return (
    <div className="space-y-6">
      <div className="bg-muted/50 p-6 rounded-lg border">
        <h3 className="text-lg font-medium mb-2">SBA 7(a) Loan Approval Workflow</h3>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Application Review by Loan Officer</li>
          <li>Credit Underwriting</li>
          <li>Compliance Review</li>
          <li>Manager Approval for loans {"> "}$250,000</li>
          <li>Final Documentation Generation</li>
        </ol>
        <Button className="mt-4" variant="outline">Edit Workflow</Button>
      </div>
      
      <div className="bg-muted/50 p-6 rounded-lg border">
        <h3 className="text-lg font-medium mb-2">SBA 504 Loan Approval Workflow</h3>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Initial Eligibility Check</li>
          <li>CDC Review and Approval</li>
          <li>SBA Review</li>
          <li>Interim Funding Approval</li>
          <li>Documentation and Closing</li>
        </ol>
        <Button className="mt-4" variant="outline">Edit Workflow</Button>
      </div>
      
      <div className="bg-muted/50 p-6 rounded-lg border">
        <h3 className="text-lg font-medium mb-2">Commercial Real Estate Loan Workflow</h3>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Property Valuation</li>
          <li>Business Cash Flow Analysis</li>
          <li>Market Approval</li>
          <li>Legal Documentation</li>
          <li>Closing Coordination</li>
        </ol>
        <Button className="mt-4" variant="outline">Edit Workflow</Button>
      </div>
      
      <Button>
        <Plus className="mr-2 h-4 w-4" /> Create New Workflow
      </Button>
    </div>
  );
};

export default ApprovalWorkflows;
