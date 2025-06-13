
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
      <CardHeader>
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
          <div className="space-y-4">
            {owners.map((owner) => (
              <div key={owner.owner_id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                      {owner.type === 'individual' ? (
                        <User className="h-5 w-5 text-primary" />
                      ) : (
                        <Building className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold">{owner.name}</h4>
                      <p className="text-sm text-muted-foreground">{owner.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
                      {owner.ownership_percentage}%
                    </div>
                    <p className="text-xs text-muted-foreground capitalize">{owner.type}</p>
                  </div>
                </div>
                
                {owner.email && (
                  <p className="text-sm text-muted-foreground mb-2">{owner.email}</p>
                )}
                
                {owner.affiliated_businesses && owner.affiliated_businesses.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm font-medium text-muted-foreground mb-2">
                      Affiliated Businesses ({owner.affiliated_businesses.length})
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {owner.affiliated_businesses.slice(0, 4).map((business: any) => (
                        <div key={business.business_id} className="flex items-center gap-2 p-2 bg-muted/30 rounded text-xs">
                          <Building className="h-3 w-3 text-muted-foreground" />
                          <span className="truncate">{business.name}</span>
                          <Badge variant="outline" className="text-xs ml-auto">
                            {business.entity_type}
                          </Badge>
                        </div>
                      ))}
                      {owner.affiliated_businesses.length > 4 && (
                        <div className="p-2 text-xs text-muted-foreground text-center">
                          +{owner.affiliated_businesses.length - 4} more
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No ownership information available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BusinessOwnershipSection;
