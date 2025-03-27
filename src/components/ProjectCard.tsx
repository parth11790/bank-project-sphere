
import React from 'react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getUserById } from '@/lib/mockData';
import { useNavigate } from 'react-router-dom';

interface ProjectCardProps {
  project: {
    project_id: string;
    project_name: string;
    project_type: string;
    loan_types: string[];
    loan_amount: number;
    created_by: string;
    created_at: string;
    updated_at: string;
    city?: string;
    state?: string;
  };
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const navigate = useNavigate();
  
  // Format the loan amount with commas and currency symbol
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(project.loan_amount);

  // Get the user who created the project
  const createdBy = getUserById(project.created_by);

  // Calculate time since last update
  const updatedTimeAgo = formatDistanceToNow(new Date(project.updated_at), { addSuffix: true });

  // Handle card click
  const handleCardClick = () => {
    navigate(`/project/${project.project_id}`);
  };

  const location = project.city && project.state 
    ? `${project.city}, ${project.state}` 
    : project.city || project.state || 'Location not specified';

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
              Created by {createdBy?.name || 'Unknown'} • Updated {updatedTimeAgo}
            </div>
            {project.loan_types && project.loan_types.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1">
                <span className="text-xs text-muted-foreground mr-1">Loan Types:</span>
                {project.loan_types.map((type, index) => (
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
