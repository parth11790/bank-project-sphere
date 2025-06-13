
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
      return <FileText className="h-3 w-3 text-gray-600" />;
    }
    
    switch (status.toLowerCase()) {
      case 'completed':
        return <CheckCircle className="h-3 w-3 text-green-600" />;
      case 'in_progress':
        return <Clock className="h-3 w-3 text-yellow-600" />;
      case 'pending':
        return <AlertCircle className="h-3 w-3 text-red-600" />;
      default:
        return <FileText className="h-3 w-3 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string | undefined) => {
    if (!status) {
      return <Badge variant="outline" className="text-xs px-1 py-0">Not Started</Badge>;
    }
    
    switch (status.toLowerCase()) {
      case 'completed':
        return <Badge variant="default" className="bg-green-100 text-green-800 text-xs px-1 py-0">Done</Badge>;
      case 'in_progress':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-xs px-1 py-0">Progress</Badge>;
      case 'pending':
        return <Badge variant="destructive" className="bg-red-100 text-red-800 text-xs px-1 py-0">Pending</Badge>;
      default:
        return <Badge variant="outline" className="text-xs px-1 py-0">Not Started</Badge>;
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
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-primary" />
          <CardTitle className="text-lg">Forms</CardTitle>
        </div>
        <CardDescription className="text-xs">Required forms and their completion status</CardDescription>
      </CardHeader>
      <CardContent>
        {forms.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
            {forms.map((form: any) => (
              <div key={form.form_id} className="flex items-center justify-between p-2 border rounded hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  {getStatusIcon(form.status)}
                  <div className="min-w-0 flex-1">
                    <h4 className="font-medium text-xs truncate">{form.name}</h4>
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
          <div className="text-center py-4">
            <FileText className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">No forms assigned to this business</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BusinessFormsSection;
