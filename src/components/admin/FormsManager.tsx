
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Users, Building2, Plus, Eye } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getFormTemplatesData } from '@/lib/mockDataServices/formService';
import { FormTemplate } from '@/types/form';
import { toast } from 'sonner';

const FormsManager: React.FC = () => {
  const [selectedEntityType, setSelectedEntityType] = useState<'individual' | 'business'>('individual');

  // Fetch forms data
  const { data: individualForms = [], isLoading: individualLoading } = useQuery({
    queryKey: ['admin-forms', 'individual'],
    queryFn: () => getFormTemplatesData('individual'),
  });

  const { data: businessForms = [], isLoading: businessLoading } = useQuery({
    queryKey: ['admin-forms', 'business'],
    queryFn: () => getFormTemplatesData('business'),
  });

  const handleAssignForm = (form: FormTemplate, entityType: 'individual' | 'business') => {
    toast.success(`Form "${form.name}" assigned to ${entityType} entities`);
    console.log(`Assigning form ${form.form_id} to ${entityType}`);
  };

  const handleViewForm = (form: FormTemplate) => {
    toast.info(`Opening form: ${form.name}`);
    console.log(`Viewing form ${form.form_id}`);
  };

  const renderFormsList = (forms: FormTemplate[], entityType: 'individual' | 'business', loading: boolean) => {
    if (loading) {
      return (
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }

    if (forms.length === 0) {
      return (
        <Card>
          <CardContent className="p-8 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">No Forms Available</h3>
            <p className="text-muted-foreground mb-4">
              No forms are currently available for {entityType} entities.
            </p>
          </CardContent>
        </Card>
      );
    }

    return (
      <div className="space-y-4">
        {forms.map((form) => (
          <Card key={form.form_id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <FileText className="h-5 w-5 text-primary" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{form.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {form.form_id}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {form.entity_type}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
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
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Assign
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">Forms Assignment</h2>
        <p className="text-muted-foreground">
          Assign forms to individual participants or business entities across projects
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
              {renderFormsList(individualForms, 'individual', individualLoading)}
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
              {renderFormsList(businessForms, 'business', businessLoading)}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FormsManager;
