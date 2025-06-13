
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Users, Percent, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Participant } from '@/types/participant';

interface BusinessOwnershipSectionProps {
  form: any;
  participant?: Participant;
}

export const BusinessOwnershipSection: React.FC<BusinessOwnershipSectionProps> = ({ 
  form, 
  participant 
}) => {
  if (!participant) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Businesses & Ownership
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Loading business information...</p>
        </CardContent>
      </Card>
    );
  }

  // Mock affiliated businesses data - in real app this would come from the participant data
  const affiliatedBusinesses = participant.business ? [
    {
      business_id: 'affiliate_1',
      name: 'Smith Consulting LLC',
      entity_type: 'LLC',
      ownership_percentage: 100,
      role: 'Managing Member'
    },
    {
      business_id: 'affiliate_2', 
      name: 'Tech Solutions Inc',
      entity_type: 'Corporation',
      ownership_percentage: 45,
      role: 'Director'
    }
  ] : [];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Businesses & Ownership
          </CardTitle>
        </CardHeader>
        <CardContent>
          {participant.business ? (
            <div className="space-y-6">
              {/* Main Business */}
              <div className="border rounded-lg p-4 bg-muted/30">
                <div className="flex items-start justify-between mb-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">{participant.business.name}</h3>
                    <Badge variant="outline" className="flex items-center gap-1 w-fit">
                      <Building2 className="h-3 w-3" />
                      {participant.business.entity_type}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Role/Title</p>
                      <p className="font-medium">{participant.business.title || 'Owner'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Percent className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Ownership Percentage</p>
                      <p className="font-medium">{participant.business.ownership_percentage || 0}%</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <h4 className="font-medium mb-2">Business Requirements</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Required Documents ({participant.business.documents?.length || 0})</p>
                      <div className="space-y-1">
                        {participant.business.documents?.slice(0, 3).map((doc, index) => (
                          <p key={index} className="text-xs text-muted-foreground">• {doc.name}</p>
                        ))}
                        {(participant.business.documents?.length || 0) > 3 && (
                          <p className="text-xs text-muted-foreground">• And {(participant.business.documents?.length || 0) - 3} more...</p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Required Forms ({participant.business.forms?.length || 0})</p>
                      <div className="space-y-1">
                        {participant.business.forms?.slice(0, 3).map((form, index) => (
                          <p key={index} className="text-xs text-muted-foreground">• {form.name}</p>
                        ))}
                        {(participant.business.forms?.length || 0) > 3 && (
                          <p className="text-xs text-muted-foreground">• And {(participant.business.forms?.length || 0) - 3} more...</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Affiliated Businesses */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Affiliated Businesses</h3>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Business
                  </Button>
                </div>
                
                {affiliatedBusinesses.length > 0 ? (
                  <div className="space-y-4">
                    {affiliatedBusinesses.map((business) => (
                      <div key={business.business_id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="space-y-1">
                            <h4 className="font-medium">{business.name}</h4>
                            <Badge variant="secondary" className="text-xs">
                              {business.entity_type}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1">
                              <Percent className="h-3 w-3" />
                              <span className="text-sm font-medium">{business.ownership_percentage}%</span>
                            </div>
                            <p className="text-xs text-muted-foreground">Ownership</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Role</p>
                            <p className="text-sm font-medium">{business.role}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 border rounded-lg bg-muted/20">
                    <Building2 className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">No affiliated businesses</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No Business Associations</h3>
              <p className="text-muted-foreground">
                This participant is not currently associated with any businesses.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
