
import React from 'react';
import { motion } from 'framer-motion';
import { Grid, List, Search, Plus, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import ProjectCard from './ProjectCard';
import { useNavigate } from 'react-router-dom';
import { Project } from '@/types/project';

interface ProjectListProps {
  projects: Project[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = React.useState('');

  // Filter projects based on search term
  const filteredProjects = projects.filter(project => 
    project.project_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.project_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (Array.isArray(project.loan_types) && project.loan_types.some(type => {
      if (typeof type === 'string') {
        return type.toLowerCase().includes(searchTerm.toLowerCase());
      } else if (typeof type === 'object' && 'type' in type) {
        return type.type.toLowerCase().includes(searchTerm.toLowerCase());
      }
      return false;
    }))
  );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative w-full sm:w-auto max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search projects..."
            className="pl-9 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-3 items-center w-full sm:w-auto justify-between sm:justify-end">
          <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as 'grid' | 'list')}>
            <ToggleGroupItem value="grid" aria-label="Grid view">
              <Grid className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="list" aria-label="List view">
              <List className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
          
          <Button variant="outline" className="flex items-center gap-1">
            <SlidersHorizontal size={16} />
            <span>Filter</span>
          </Button>
          
          <Button 
            className="flex items-center gap-1"
            onClick={() => navigate('/create-project')}
          >
            <Plus size={16} />
            <span>New Project</span>
          </Button>
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No projects found matching your search criteria.</p>
        </div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
            : "space-y-4"
          }
        >
          {filteredProjects.map(project => (
            <motion.div
              key={project.project_id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 }
              }}
            >
              <ProjectCard 
                project={project} 
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default ProjectList;
