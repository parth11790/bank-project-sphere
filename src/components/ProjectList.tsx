
import React from 'react';
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

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative w-full sm:w-auto max-w-md">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search projects..."
            className="pl-9 w-full bg-background"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-2 items-center w-full sm:w-auto justify-between sm:justify-end">
          <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as 'grid' | 'list')}>
            <ToggleGroupItem value="grid" aria-label="Grid view" size="sm">
              <Grid className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="list" aria-label="List view" size="sm">
              <List className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
          
          <Button variant="outline" size="sm">
            <SlidersHorizontal className="h-3.5 w-3.5 mr-1" />
            <span>Filter</span>
          </Button>
          
          <Button 
            variant="default"
            size="sm"
            onClick={() => navigate('/create-project')}
          >
            <Plus className="h-3.5 w-3.5 mr-1" />
            <span>New</span>
          </Button>
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No projects found matching your search criteria.</p>
        </div>
      ) : (
        <div
          className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" 
            : "space-y-2"
          }
        >
          {filteredProjects.map(project => (
            <div key={project.project_id}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectList;
