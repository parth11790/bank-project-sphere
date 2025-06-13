
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, User, Building, Phone, Mail, MapPin, Plus } from 'lucide-react';
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
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              Total: {getTotalOwnership()}%
            </Badge>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Owner
            </Button>
          </div>
        </div>
        <CardDescription className="text-xs">Business ownership breakdown and key stakeholders</CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        {owners && owners.length > 0 ? (
          <div className="space-y-4">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Ownership %</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Affiliated Businesses</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {owners.map((owner) => (
                    <TableRow 
                      key={owner.owner_id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleOwnerClick(owner.owner_id)}
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 flex-shrink-0">
                            {owner.type === 'individual' ? (
                              <User className="h-3 w-3 text-primary" />
                            ) : (
                              <Building className="h-3 w-3 text-primary" />
                            )}
                          </div>
                          {owner.name}
                        </div>
                      </TableCell>
                      <TableCell>{owner.email || '-'}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {owner.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{owner.role || '-'}</TableCell>
                      <TableCell className="text-right font-bold text-primary">
                        {owner.ownership_percentage}%
                      </TableCell>
                      <TableCell>
                        {owner.phone ? (
                          <div className="flex items-center gap-1 text-xs">
                            <Phone className="h-3 w-3" />
                            {owner.phone}
                          </div>
                        ) : '-'}
                      </TableCell>
                      <TableCell className="max-w-48">
                        {owner.address ? (
                          <div className="flex items-start gap-1 text-xs">
                            <MapPin className="h-3 w-3 mt-0.5 flex-shrink-0" />
                            <span className="truncate">{formatAddress(owner.address)}</span>
                          </div>
                        ) : '-'}
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center">
                          <Badge variant="secondary" className="text-xs">
                            {owner.affiliated_businesses ? owner.affiliated_businesses.length : 0}
                          </Badge>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div className="mt-4 p-3 bg-muted/30 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total Ownership:</span>
                <span className="text-lg font-bold text-primary">
                  {getTotalOwnership()}%
                </span>
              </div>
            </div>
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
