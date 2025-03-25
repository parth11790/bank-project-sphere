
import React from 'react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash, ArrowUpRight } from 'lucide-react';
import { getUserById } from '@/lib/mockData';

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
  };
  onClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick, onEdit, onDelete }) => {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="hover-lift"
    >
      <Card className="h-full overflow-hidden border-border/50">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 mb-2">
              {project.project_type}
            </Badge>
            <div className="flex space-x-1">
              {project.loan_types.map((type, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {type}
                </Badge>
              ))}
            </div>
          </div>
          <CardTitle className="text-xl font-semibold leading-tight">{project.project_name}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground mt-1">
            <span className="font-medium text-foreground">{formattedAmount}</span> • Created by{' '}
            {createdBy?.name || 'Unknown'}
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="text-sm text-muted-foreground">
            Last updated {updatedTimeAgo}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between pt-2 border-t border-border/50">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" onClick={onClick}>
            <Eye size={16} className="mr-1" /> View
          </Button>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={onEdit}>
              <Edit size={16} />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={onDelete}>
              <Trash size={16} />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
