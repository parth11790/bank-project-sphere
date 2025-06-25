
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Building2, MapPin, DollarSign, Globe, Plus } from 'lucide-react';
import { Project } from '@/types/project';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

interface AcquisitionSectionProps {
  project: Project;
}

const AcquisitionSection: React.FC<AcquisitionSectionProps> = ({
  project
}) => {
  const navigate = useNavigate();

  // Mock data for acquired businesses - in real app this would come from project data
  const acquiredBusinesses = [{
    id: 'acq_1',
    name: 'Downtown Coffee Shop',
    type: 'LLC',
    city: 'Portland',
    state: 'OR',
    cashFlow: 125000,
    website: 'downtowncoffee.com'
  }, {
    id: 'acq_2',
    name: 'Tech Solutions Inc',
    type: 'Corporation',
    city: 'Seattle',
    state: 'WA',
    cashFlow: 450000,
    website: 'techsolutions.com'
  }, {
    id: 'acq_3',
    name: 'Local Bakery',
    type: 'Partnership',
    city: 'San Francisco',
    state: 'CA',
    cashFlow: 180000,
    website: 'localbakery.com'
  }];

  const totalCashFlow = acquiredBusinesses.reduce((sum, business) => sum + business.cashFlow, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleAddBusiness = () => {
    console.log('Add business to acquisition');
    // This would typically open a dialog or navigate to an add business page
  };

  const handleRowClick = (businessId: string) => {
    navigate(`/acquisition-business/${project.project_id}`);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              <CardTitle>Business Acquisition</CardTitle>
            </div>
            <CardDescription>
              Businesses being acquired as part of this project
            </CardDescription>
          </div>
          <Button size="sm" onClick={handleAddBusiness}>
            <Plus className="h-4 w-4 mr-2" />
            Add Business
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {acquiredBusinesses.length > 0 ? (
          <div className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Business Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="text-right">Cash Flow</TableHead>
                  <TableHead>Website</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {acquiredBusinesses.map(business => (
                  <TableRow 
                    key={business.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleRowClick(business.id)}
                  >
                    <TableCell className="font-medium">{business.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{business.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{business.city}, {business.state}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <span className="font-medium text-green-600">
                          {formatCurrency(business.cashFlow)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {business.website && (
                        <div className="flex items-center gap-1">
                          <Globe className="h-3 w-3 text-muted-foreground" />
                          <a 
                            href={`https://${business.website}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {business.website}
                          </a>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {/* Total Cash Flow Summary */}
            <div className="flex justify-end pt-4 border-t">
              <div className="flex items-center gap-2 text-lg font-semibold">
                <span>Total Cash Flow:</span>
                <div className="flex items-center gap-1 text-green-600">
                  <span>{formatCurrency(totalCashFlow)}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No businesses being acquired in this project</p>
            <Button className="mt-4" onClick={handleAddBusiness}>Add Business</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AcquisitionSection;
