
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, User, Building } from 'lucide-react';

interface BusinessOwnershipSectionProps {
  projectId: string;
  owners: any[];
}

const BusinessOwnershipSection: React.FC<BusinessOwnershipSectionProps> = ({ projectId, owners }) => {
  const getTotalOwnership = () => {
    return owners.reduce((total, owner) => total + (owner.ownership_percentage || 0), 0);
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <CardTitle>Ownership Structure</CardTitle>
          </div>
          <Badge variant="outline" className="text-xs">
            Total: {getTotalOwnership()}%
          </Badge>
        </div>
        <CardDescription>Business ownership breakdown and key stakeholders</CardDescription>
      </CardHeader>
      <CardContent>
        {owners && owners.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {owners.map((owner) => (
              <div key={owner.owner_id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 flex-shrink-0">
                      {owner.type === 'individual' ? (
                        <User className="h-4 w-4 text-primary" />
                      ) : (
                        <Building className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-sm truncate">{owner.name}</h4>
                      <p className="text-xs text-muted-foreground">{owner.role}</p>
                      {owner.email && (
                        <p className="text-xs text-muted-foreground truncate">{owner.email}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-2">
                    <div className="text-lg font-bold text-primary">
                      {owner.ownership_percentage}%
                    </div>
                    <p className="text-xs text-muted-foreground capitalize">{owner.type}</p>
                  </div>
                </div>
                
                {owner.affiliated_businesses && owner.affiliated_businesses.length > 0 && (
                  <div className="mt-3 pt-3 border-t">
                    <p className="text-xs font-medium text-muted-foreground mb-2">
                      Affiliated ({owner.affiliated_businesses.length})
                    </p>
                    <div className="space-y-1">
                      {owner.affiliated_businesses.slice(0, 2).map((business: any) => (
                        <div key={business.business_id} className="flex items-center gap-2 p-1.5 bg-muted/30 rounded text-xs">
                          <Building className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                          <span className="truncate flex-1">{business.name}</span>
                          <Badge variant="outline" className="text-xs flex-shrink-0">
                            {business.entity_type}
                          </Badge>
                        </div>
                      ))}
                      {owner.affiliated_businesses.length > 2 && (
                        <div className="text-xs text-muted-foreground text-center py-1">
                          +{owner.affiliated_businesses.length - 2} more businesses
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <Users className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No ownership information available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BusinessOwnershipSection;
