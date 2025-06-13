
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Building2, MapPin, Globe, DollarSign, Plus, Edit, Save, X } from 'lucide-react';
import { toast } from 'sonner';

interface AcquisitionBusiness {
  business_id: string;
  name: string;
  entity_type: string;
  location: {
    city: string;
    state: string;
  };
  cash_flow: number;
  website?: string;
}

interface EditableBusinessAcquisitionSectionProps {
  projectId: string;
}

const EditableBusinessAcquisitionSection: React.FC<EditableBusinessAcquisitionSectionProps> = ({ projectId }) => {
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock data for acquired businesses
  const [acquisitionBusinesses, setAcquisitionBusinesses] = useState<AcquisitionBusiness[]>([
    {
      business_id: 'acq_1',
      name: 'Downtown Café & Bakery',
      entity_type: 'LLC',
      location: { city: 'Cleveland', state: 'OH' },
      cash_flow: 185000,
      website: 'https://downtowncafe.com'
    },
    {
      business_id: 'acq_2',
      name: 'Industrial Supply Co',
      entity_type: 'Corporation',
      location: { city: 'Akron', state: 'OH' },
      cash_flow: 320000,
      website: 'https://industrialsupply.com'
    },
    {
      business_id: 'acq_3',
      name: 'Precision Tools Manufacturing',
      entity_type: 'LLC',
      location: { city: 'Toledo', state: 'OH' },
      cash_flow: 475000,
      website: 'https://precisiontools.com'
    },
    {
      business_id: 'acq_4',
      name: 'Advanced Logistics Services',
      entity_type: 'Partnership',
      location: { city: 'Columbus', state: 'OH' },
      cash_flow: 280000
    }
  ]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getTotalCashFlow = () => {
    return acquisitionBusinesses.reduce((total, business) => total + business.cash_flow, 0);
  };

  const handleSave = () => {
    toast.success('Acquisition information updated successfully');
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleAddAcquisition = () => {
    toast('Add acquisition functionality would be implemented here');
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-primary" />
            <CardTitle className="text-lg">Acquisition</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <Button size="sm" onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button size="sm" variant="outline" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" onClick={handleAddAcquisition}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Business
                </Button>
              </>
            )}
          </div>
        </div>
        <CardDescription className="text-xs">Businesses being acquired as part of this project</CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        {acquisitionBusinesses.length > 0 ? (
          <div className="space-y-4">
            <div className="rounded-md border">
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
                  {acquisitionBusinesses.map((business) => (
                    <TableRow key={business.business_id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 flex-shrink-0">
                            <Building2 className="h-3 w-3 text-primary" />
                          </div>
                          {business.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {business.entity_type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          {business.location.city}, {business.location.state}
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-bold text-green-600">
                        <div className="flex items-center justify-end gap-1">
                          <DollarSign className="h-3 w-3" />
                          {formatCurrency(business.cash_flow)}
                        </div>
                      </TableCell>
                      <TableCell>
                        {business.website ? (
                          <div className="flex items-center gap-1 text-sm">
                            <Globe className="h-3 w-3 text-muted-foreground" />
                            <a 
                              href={business.website} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 hover:underline truncate max-w-32"
                            >
                              {business.website.replace('https://', '')}
                            </a>
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">-</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div className="mt-4 p-4 bg-muted/30 rounded-lg border">
              <div className="flex justify-between items-center">
                <span className="font-medium text-lg">Total Cash Flow:</span>
                <span className="text-2xl font-bold text-green-600 flex items-center gap-1">
                  <DollarSign className="h-5 w-5" />
                  {formatCurrency(getTotalCashFlow())}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-2">No businesses in acquisition pipeline</p>
            <Button variant="outline" onClick={handleAddAcquisition}>
              <Plus className="h-4 w-4 mr-2" />
              Add First Business
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EditableBusinessAcquisitionSection;
