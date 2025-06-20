
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Users, Building2, Plus, Eye, ToggleLeft, ToggleRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getFormTemplatesData } from '@/lib/mockDataServices/formService';
import { FormTemplate } from '@/types/form';
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface FormTemplateWithStatus extends FormTemplate {
  status: 'active' | 'inactive';
}

const FormsManager: React.FC = () => {
  const [selectedEntityType, setSelectedEntityType] = useState<'individual' | 'business'>('individual');
  const [formStatuses, setFormStatuses] = useState<Record<string, 'active' | 'inactive'>>({});

  // Fetch forms data
  const { data: individualFormsData = [], isLoading: individualLoading } = useQuery({
    queryKey: ['admin-forms', 'individual'],
    queryFn: () => getFormTemplatesData('individual'),
  });

  const { data: businessFormsData = [], isLoading: businessLoading } = useQuery({
    queryKey: ['admin-forms', 'business'],
    queryFn: () => getFormTemplatesData('business'),
  });

  // Add status to forms (default to active)
  const individualForms: FormTemplateWithStatus[] = individualFormsData.map(form => ({
    ...form,
    status: formStatuses[form.form_id] || 'active'
  }));

  const businessForms: FormTemplateWithStatus[] = businessFormsData.map(form => ({
    ...form,
    status: formStatuses[form.form_id] || 'active'
  }));

  const handleToggleStatus = (formId: string, currentStatus: 'active' | 'inactive') => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    setFormStatuses(prev => ({
      ...prev,
      [formId]: newStatus
    }));
    toast.success(`Form status changed to ${newStatus}`);
  };

  const handleAssignForm = (form: FormTemplateWithStatus, entityType: 'individual' | 'business') => {
    if (form.status === 'inactive') {
      toast.error('Cannot assign inactive forms');
      return;
    }
    toast.success(`Form "${form.name}" assigned to ${entityType} entities`);
    console.log(`Assigning form ${form.form_id} to ${entityType}`);
  };

  const handleViewForm = (form: FormTemplateWithStatus) => {
    toast.info(`Opening form: ${form.name}`);
    console.log(`Viewing form ${form.form_id}`);
  };

  const renderFormsTable = (forms: FormTemplateWithStatus[], entityType: 'individual' | 'business', loading: boolean) => {
    if (loading) {
      return (
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-12 bg-muted rounded w-full mb-2"></div>
            </div>
          ))}
        </div>
      );
    }

    if (forms.length === 0) {
      return (
        <div className="text-center py-8">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">No Forms Available</h3>
          <p className="text-muted-foreground mb-4">
            No forms are currently available for {entityType} entities.
          </p>
        </div>
      );
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Form Name</TableHead>
            <TableHead>Form ID</TableHead>
            <TableHead>Entity Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {forms.map((form) => (
            <TableRow key={form.form_id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  {form.name}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="text-xs">
                  {form.form_id}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="secondary" className="text-xs">
                  {form.entity_type}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={form.status === 'active' ? 'default' : 'secondary'}
                    className={form.status === 'active' ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500'}
                  >
                    {form.status}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleToggleStatus(form.form_id, form.status)}
                    className="h-6 w-6 p-0"
                  >
                    {form.status === 'active' ? (
                      <ToggleRight className="h-4 w-4 text-green-600" />
                    ) : (
                      <ToggleLeft className="h-4 w-4 text-gray-600" />
                    )}
                  </Button>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center gap-2 justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewForm(form)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleAssignForm(form, entityType)}
                    disabled={form.status === 'inactive'}
                    className={form.status === 'inactive' ? 'opacity-50 cursor-not-allowed' : ''}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Assign
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">Forms Assignment</h2>
        <p className="text-muted-foreground">
          Assign forms to individual participants or business entities across projects. Toggle status to control form availability.
        </p>
      </div>

      <Tabs value={selectedEntityType} onValueChange={(value) => setSelectedEntityType(value as 'individual' | 'business')}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="individual" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Individual Forms
          </TabsTrigger>
          <TabsTrigger value="business" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Business Forms
          </TabsTrigger>
        </TabsList>

        <TabsContent value="individual" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Individual Forms
              </CardTitle>
              <CardDescription>
                Forms that can be assigned to individual participants (buyers, sellers, guarantors)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderFormsTable(individualForms, 'individual', individualLoading)}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="business" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Business Forms
              </CardTitle>
              <CardDescription>
                Forms that can be assigned to business entities and organizations
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderFormsTable(businessForms, 'business', businessLoading)}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FormsManager;
