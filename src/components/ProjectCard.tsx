import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getUserById } from '@/lib/mockData';
import { useNavigate } from 'react-router-dom';
import { Project } from '@/types/project';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const navigate = useNavigate();
  
  // Format the loan amount with commas and currency symbol
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(project.loan_amount || 0);

  // Get the user who created the project or use the provided created_by_user
  const createdBy = project.created_by_user?.name || 
    (project.created_by ? getUserById(project.created_by)?.name : 'Unknown');

  // Calculate time since last update
  const updatedTimeAgo = formatDistanceToNow(new Date(project.updated_at), { addSuffix: true });

  // Handle card click with enhanced debugging
  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const targetRoute = `/project/${project.project_id}`;
    console.log('ProjectCard clicked!');
    console.log('Project ID:', project.project_id);
    console.log('Target route:', targetRoute);
    console.log('Current location:', window.location.href);
    
    try {
      console.log('Attempting navigation...');
      navigate(targetRoute);
      console.log('Navigate function called successfully');
      
      // Add a small delay to check if navigation happened
      setTimeout(() => {
        console.log('After navigation - Current location:', window.location.href);
      }, 100);
      
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  const location = project.city && project.state 
    ? `${project.city}, ${project.state}` 
    : project.city || project.state || project.location || 'Location not specified';

  // Process loan types appropriately based on their type
  const processedLoanTypes = Array.isArray(project.loan_types) 
    ? project.loan_types.map(lt => typeof lt === 'string' ? lt : lt.type)
    : [];

  return (
    <Card 
      className="overflow-hidden border-border/30 hover:border-border transition-colors duration-200 cursor-pointer hover:shadow-md"
      onClick={handleCardClick}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between mb-1">
          <Badge variant="secondary" className="text-xs font-normal">
            {project.project_type}
          </Badge>
        </div>
        <h3 className="text-base font-medium leading-tight">{project.project_name}</h3>
        <p className="text-xs text-muted-foreground mt-1">
          <span className="font-medium text-foreground">{formattedAmount}</span> • {location}
        </p>
      </CardHeader>
      <CardContent className="pb-4 pt-0">
        <div className="text-xs text-muted-foreground">
          Created by {createdBy} • Updated {updatedTimeAgo}
        </div>
        
        {processedLoanTypes.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {processedLoanTypes.slice(0, 2).map((type, index) => (
              <Badge key={index} variant="outline" className="text-xs px-1.5 py-0 h-5">
                {type}
              </Badge>
            ))}
            {processedLoanTypes.length > 2 && (
              <Badge variant="outline" className="text-xs px-1.5 py-0 h-5">
                +{processedLoanTypes.length - 2}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
