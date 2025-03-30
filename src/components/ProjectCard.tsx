
import React from 'react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
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

  // Handle card click
  const handleCardClick = () => {
    navigate(`/project/${project.project_id}`);
  };

  const location = project.city && project.state 
    ? `${project.city}, ${project.state}` 
    : project.city || project.state || project.location || 'Location not specified';

  // Process loan types appropriately based on their type
  const processedLoanTypes = Array.isArray(project.loan_types) 
    ? project.loan_types.map(lt => typeof lt === 'string' ? lt : lt.type)
    : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="hover-lift cursor-pointer"
      onClick={handleCardClick}
    >
      <Card className="h-full overflow-hidden border-border/50 hover:shadow-md transition-shadow duration-200">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 mb-2">
              {project.project_type}
            </Badge>
          </div>
          <CardTitle className="text-xl font-semibold leading-tight">{project.project_name}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground mt-1">
            <span className="font-medium text-foreground">{formattedAmount}</span> • <span className="text-foreground">{location}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-3">
          <div className="flex flex-col gap-2">
            <div className="text-sm text-muted-foreground">
              Created by {createdBy || 'Unknown'} • Updated {updatedTimeAgo}
            </div>
            {processedLoanTypes.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1">
                <span className="text-xs text-muted-foreground mr-1">Loan Types:</span>
                {processedLoanTypes.map((type, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {type}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
