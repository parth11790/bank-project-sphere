import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Phone, Mail } from 'lucide-react';
import { Project } from '@/types/project';

interface BorrowingEntityCardProps {
  project: Project;
}

const BorrowingEntityCard: React.FC<BorrowingEntityCardProps> = ({ project }) => {
  const navigate = useNavigate();

  const handleBorrowingEntityClick = () => {
    navigate(`/business/${project.project_id}`);
  };

  return (
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
          <div className="space-y-3">
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
  );
};

export default BorrowingEntityCard;
