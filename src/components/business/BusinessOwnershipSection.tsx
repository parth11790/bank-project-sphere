
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
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            <CardTitle className="text-lg">Ownership Structure</CardTitle>
          </div>
          <Badge variant="outline" className="text-xs">
            Total: {getTotalOwnership()}%
          </Badge>
        </div>
        <CardDescription className="text-xs">Business ownership breakdown and key stakeholders</CardDescription>
      </CardHeader>
      <CardContent>
        {owners && owners.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
            {owners.map((owner) => (
              <div key={owner.owner_id} className="p-3 border rounded">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 flex-shrink-0">
                      {owner.type === 'individual' ? (
                        <User className="h-3 w-3 text-primary" />
                      ) : (
                        <Building className="h-3 w-3 text-primary" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium text-xs truncate">{owner.name}</h4>
                      <p className="text-xs text-muted-foreground">{owner.role}</p>
                      {owner.email && (
                        <p className="text-xs text-muted-foreground truncate">{owner.email}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-2">
                    <div className="text-sm font-bold text-primary">
                      {owner.ownership_percentage}%
                    </div>
                    <p className="text-xs text-muted-foreground capitalize">{owner.type}</p>
                  </div>
                </div>
                
                {owner.affiliated_businesses && owner.affiliated_businesses.length > 0 && (
                  <div className="mt-2 pt-2 border-t">
                    <p className="text-xs font-medium text-muted-foreground mb-1">
                      Affiliated ({owner.affiliated_businesses.length})
                    </p>
                    <div className="space-y-1">
                      {owner.affiliated_businesses.slice(0, 2).map((business: any) => (
                        <div key={business.business_id} className="flex items-center gap-1 p-1 bg-muted/20 rounded text-xs">
                          <Building className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                          <span className="truncate flex-1 text-xs">{business.name}</span>
                          <Badge variant="outline" className="text-xs px-1 py-0 flex-shrink-0">
                            {business.entity_type}
                          </Badge>
                        </div>
                      ))}
                      {owner.affiliated_businesses.length > 2 && (
                        <div className="text-xs text-muted-foreground text-center py-0.5">
                          +{owner.affiliated_businesses.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4">
            <Users className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">No ownership information available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BusinessOwnershipSection;
