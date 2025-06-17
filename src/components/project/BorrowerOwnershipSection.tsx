
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Building2, Users, Building, Phone, Mail } from 'lucide-react';
import { Project } from '@/types/project';

interface BorrowerOwnershipSectionProps {
  project: Project;
}

const BorrowerOwnershipSection: React.FC<BorrowerOwnershipSectionProps> = ({ project }) => {
  const navigate = useNavigate();

  // Mock affiliated businesses for owners
  const getAffiliatedBusinesses = (ownerId: string) => {
    const mockBusinesses = [
      { business_id: 'aff_1', name: 'Tech Consulting LLC', entity_type: 'LLC', ownership_percentage: 75 },
      { business_id: 'aff_2', name: 'Real Estate Holdings', entity_type: 'Partnership', ownership_percentage: 45 },
      { business_id: 'aff_3', name: 'Marketing Solutions Inc', entity_type: 'Corporation', ownership_percentage: 60 },
      { business_id: 'aff_4', name: 'Investment Properties LLC', entity_type: 'LLC', ownership_percentage: 85 },
      { business_id: 'aff_5', name: 'Retail Ventures', entity_type: 'S-Corp', ownership_percentage: 30 }
    ];
    
    // Return 1-2 businesses per owner
    const startIndex = parseInt(ownerId.slice(-1)) || 0;
    return mockBusinesses.slice(startIndex % 3, (startIndex % 3) + 2);
  };

  const handleBorrowingEntityClick = () => {
    if (project.main_business?.business_id) {
      navigate(`/business/${project.main_business.business_id}`);
    }
  };

  const handleOwnerClick = (ownerId: string) => {
    navigate(`/project/participants/${project.project_id}/personal-info/${ownerId}`);
  };

  const handleAffiliatedBusinessClick = (businessId: string) => {
    navigate(`/business/${businessId}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Borrower & Ownership Structure</h2>
        <p className="text-gray-600">Overview of the borrowing entity, ownership structure, and affiliated businesses</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Borrower Information */}
        <Card 
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={handleBorrowingEntityClick}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Borrowing Entity</CardTitle>
            </div>
            <CardDescription>Primary business seeking financing</CardDescription>
          </CardHeader>
          <CardContent>
            {project.main_business ? (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">{project.main_business.name}</h3>
                  <Badge variant="outline" className="mt-1">{project.main_business.entity_type}</Badge>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.main_business.description || 'No description available'}
                </p>
                {project.main_business.address && (
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-700">Business Address</p>
                    <p className="text-sm text-gray-600">
                      {project.main_business.address.street}<br/>
                      {project.main_business.address.city}, {project.main_business.address.state} {project.main_business.address.zip_code}
                    </p>
                  </div>
                )}
                {project.main_business.phone && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="h-4 w-4" />
                    {project.main_business.phone}
                  </div>
                )}
                {project.main_business.email && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="h-4 w-4" />
                    {project.main_business.email}
                  </div>
                )}
              </div>
            ) : (
              <p className="text-muted-foreground">No borrower information available</p>
            )}
          </CardContent>
        </Card>

        {/* Ownership Structure */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Ownership Structure</CardTitle>
            </div>
            <CardDescription>Business owners and their stakes</CardDescription>
          </CardHeader>
          <CardContent>
            {project.owners && project.owners.length > 0 ? (
              <div className="space-y-3">
                {project.owners.map((owner) => (
                  <div 
                    key={owner.owner_id} 
                    className="border-b pb-3 last:border-b-0 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                    onClick={() => handleOwnerClick(owner.owner_id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm text-gray-900">{owner.name}</h4>
                        {owner.role && (
                          <p className="text-xs text-gray-500">{owner.role}</p>
                        )}
                        <Badge variant={owner.type === 'individual' ? 'secondary' : 'outline'} className="mt-1 text-xs">
                          {owner.type}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-primary text-lg">{owner.ownership_percentage}%</span>
                      </div>
                    </div>
                    {owner.email && (
                      <p className="text-xs text-gray-500">{owner.email}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No ownership information available</p>
            )}
          </CardContent>
        </Card>

        {/* Affiliated Businesses */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Building className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Affiliated Businesses</CardTitle>
            </div>
            <CardDescription>Other businesses owned by the principals</CardDescription>
          </CardHeader>
          <CardContent>
            {project.owners && project.owners.length > 0 ? (
              <div className="space-y-4">
                {project.owners
                  .filter(owner => owner.type === 'individual')
                  .map((owner) => {
                    const affiliatedBusinesses = getAffiliatedBusinesses(owner.owner_id);
                    
                    return (
                      <div key={owner.owner_id} className="space-y-2">
                        <div className="border-b pb-2">
                          <h5 className="font-medium text-sm text-gray-800">{owner.name}</h5>
                          <p className="text-xs text-gray-500">Principal Owner</p>
                        </div>
                        
                        {affiliatedBusinesses.length > 0 ? (
                          <div className="space-y-2 ml-2">
                            {affiliatedBusinesses.map((business, index) => (
                              <div 
                                key={business.business_id} 
                                className="flex justify-between items-center p-2 bg-gray-50 rounded cursor-pointer hover:bg-gray-100 transition-colors"
                                onClick={() => handleAffiliatedBusinessClick(business.business_id)}
                              >
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-800">{business.name}</p>
                                  <Badge variant="outline" className="text-xs mt-1">
                                    {business.entity_type}
                                  </Badge>
                                </div>
                                <div className="text-right">
                                  <span className="text-sm font-semibold text-primary">
                                    {business.ownership_percentage}%
                                  </span>
                                  <p className="text-xs text-gray-500">ownership</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-gray-500 ml-2">No affiliated businesses</p>
                        )}
                      </div>
                    );
                  })}
                  
                {project.owners.filter(owner => owner.type === 'individual').length === 0 && (
                  <p className="text-muted-foreground text-sm">No individual owners to show affiliated businesses</p>
                )}
              </div>
            ) : (
              <p className="text-muted-foreground">No affiliated business information available</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BorrowerOwnershipSection;
