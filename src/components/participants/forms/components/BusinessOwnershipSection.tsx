
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building2, FileText, Plus, Edit } from 'lucide-react';

interface Business {
  business_id: string;
  name: string;
  entity_type: string;
  title?: string;
  ownership_percentage?: number;
  forms: Array<{
    form_id: string;
    name: string;
  }>;
}

interface BusinessOwnershipSectionProps {
  businesses: Business[];
  onAddBusiness: () => void;
  onEditBusiness: (business: Business) => void;
  onAssignBusinessForms: (business: Business) => void;
}

const BusinessOwnershipSection: React.FC<BusinessOwnershipSectionProps> = ({
  businesses,
  onAddBusiness,
  onEditBusiness,
  onAssignBusinessForms
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Business Ownership
          </CardTitle>
          <Button onClick={onAddBusiness} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Business
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {businesses.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Building2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No business ownership information</p>
            <p className="text-sm">Click "Add Business" to get started</p>
          </div>
        ) : (
          <div className="space-y-4">
            {businesses.map((business) => (
              <div key={business.business_id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-lg">{business.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline">{business.entity_type}</Badge>
                      {business.title && (
                        <Badge variant="secondary">{business.title}</Badge>
                      )}
                      {business.ownership_percentage && (
                        <Badge variant="outline">
                          {business.ownership_percentage}% ownership
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEditBusiness(business)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Forms Section */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        Business Forms ({business.forms?.length || 0})
                      </h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onAssignBusinessForms(business)}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Assign
                      </Button>
                    </div>
                    {business.forms && business.forms.length > 0 ? (
                      <div className="space-y-1">
                        {business.forms.slice(0, 3).map((form) => (
                          <div key={form.form_id} className="text-sm text-muted-foreground">
                            • {form.name}
                          </div>
                        ))}
                        {business.forms.length > 3 && (
                          <div className="text-sm text-muted-foreground">
                            +{business.forms.length - 3} more forms
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No forms assigned</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BusinessOwnershipSection;
