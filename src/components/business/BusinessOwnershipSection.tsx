
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, User, Building, Phone, Mail, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BusinessOwnershipSectionProps {
  projectId: string;
  owners: any[];
}

const BusinessOwnershipSection: React.FC<BusinessOwnershipSectionProps> = ({ projectId, owners }) => {
  const navigate = useNavigate();

  const getTotalOwnership = () => {
    return owners.reduce((total, owner) => total + (owner.ownership_percentage || 0), 0);
  };

  const handleOwnerClick = (ownerId: string) => {
    navigate(`/project/participants/${projectId}/personal-info/${ownerId}`);
  };

  const formatAddress = (address: any) => {
    if (!address) return 'N/A';
    const parts = [];
    if (address.street) parts.push(address.street);
    if (address.city) parts.push(address.city);
    if (address.state) parts.push(address.state);
    if (address.zip_code) parts.push(address.zip_code);
    return parts.length > 0 ? parts.join(', ') : 'N/A';
  };

  return (
    <Card>
      <CardHeader className="pb-2">
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
      <CardContent className="pt-2">
        {owners && owners.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {owners.map((owner) => (
              <div 
                key={owner.owner_id} 
                className="p-3 border rounded cursor-pointer hover:bg-muted/30 transition-colors"
                onClick={() => handleOwnerClick(owner.owner_id)}
              >
                {/* Header with name and ownership */}
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
                      <h4 className="font-medium text-sm truncate">{owner.name}</h4>
                      <p className="text-xs text-muted-foreground">{owner.role}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-2">
                    <div className="text-sm font-bold text-primary">
                      {owner.ownership_percentage}%
                    </div>
                    <p className="text-xs text-muted-foreground capitalize">{owner.type}</p>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 gap-1 mb-2 text-xs">
                  {owner.email && (
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Mail className="h-3 w-3" />
                      <span className="truncate">{owner.email}</span>
                    </div>
                  )}
                  {owner.phone && (
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Phone className="h-3 w-3" />
                      <span>{owner.phone}</span>
                    </div>
                  )}
                  {owner.address && (
                    <div className="flex items-start gap-1 text-muted-foreground">
                      <MapPin className="h-3 w-3 mt-0.5 flex-shrink-0" />
                      <span className="break-words">{formatAddress(owner.address)}</span>
                    </div>
                  )}
                </div>

                {/* Additional Information */}
                {(owner.ssn || owner.date_of_birth) && (
                  <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t">
                    {owner.ssn && (
                      <div>
                        <span className="text-muted-foreground">SSN: </span>
                        <span>***-**-{owner.ssn.slice(-4)}</span>
                      </div>
                    )}
                    {owner.date_of_birth && (
                      <div>
                        <span className="text-muted-foreground">DOB: </span>
                        <span>{new Date(owner.date_of_birth).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Affiliated Businesses */}
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
