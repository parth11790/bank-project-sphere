
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Business } from '@/types/business';

interface BusinessFormsSectionProps {
  business: Business;
}

const BusinessFormsSection: React.FC<BusinessFormsSectionProps> = ({ business }) => {
  const getStatusIcon = (status: string | undefined) => {
    if (!status) {
      return <FileText className="h-4 w-4 text-gray-600" />;
    }
    
    switch (status.toLowerCase()) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in_progress':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string | undefined) => {
    if (!status) {
      return <Badge variant="outline" className="text-xs">Not Started</Badge>;
    }
    
    switch (status.toLowerCase()) {
      case 'completed':
        return <Badge variant="default" className="bg-green-100 text-green-800 text-xs">Completed</Badge>;
      case 'in_progress':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-xs">In Progress</Badge>;
      case 'pending':
        return <Badge variant="destructive" className="bg-red-100 text-red-800 text-xs">Pending</Badge>;
      default:
        return <Badge variant="outline" className="text-xs">Not Started</Badge>;
    }
  };

  // Mock forms data - in a real app, this would come from the business data
  const forms = business.forms || [
    { form_id: 'form_1', name: 'Business Tax Returns (3 years)', status: 'completed' },
    { form_id: 'form_2', name: 'Financial Statements', status: 'in_progress' },
    { form_id: 'form_3', name: 'Personal Financial Statement', status: 'pending' },
    { form_id: 'form_4', name: 'Business Plan', status: 'pending' },
    { form_id: 'form_5', name: 'Articles of Incorporation', status: 'completed' }
  ];

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <CardTitle>Forms</CardTitle>
        </div>
        <CardDescription>Required forms and their completion status</CardDescription>
      </CardHeader>
      <CardContent>
        {forms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {forms.map((form: any) => (
              <div key={form.form_id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  {getStatusIcon(form.status)}
                  <div className="min-w-0 flex-1">
                    <h4 className="font-medium text-sm truncate">{form.name}</h4>
                    <p className="text-xs text-muted-foreground">ID: {form.form_id}</p>
                  </div>
                </div>
                <div className="ml-2 flex-shrink-0">
                  {getStatusBadge(form.status)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No forms assigned to this business</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BusinessFormsSection;
