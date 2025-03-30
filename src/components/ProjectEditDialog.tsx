
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Project } from '@/types/project';
import { updateProject } from '@/services/projectService';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

interface ProjectEditDialogProps {
  project: Project;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProjectEditDialog: React.FC<ProjectEditDialogProps> = ({
  project,
  open,
  onOpenChange
}) => {
  const [formData, setFormData] = useState({
    project_name: project.project_name,
    description: project.description || '',
    location: project.location || '',
    project_type: project.project_type,
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const queryClient = useQueryClient();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await updateProject(project.project_id, formData);
      toast.success('Project details updated successfully');
      queryClient.invalidateQueries({ queryKey: ['project', project.project_id] });
      onOpenChange(false);
    } catch (error) {
      console.error('Error updating project:', error);
      toast.error('Failed to update project details');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
            <DialogDescription>
              Update your project details. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="project_name" className="text-sm font-medium">
                Project Name
              </label>
              <Input
                id="project_name"
                name="project_name"
                value={formData.project_name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="project_type" className="text-sm font-medium">
                Project Type
              </label>
              <Input
                id="project_type"
                name="project_type"
                value={formData.project_type}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="location" className="text-sm font-medium">
                Location
              </label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City, State"
              />
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Project description"
                className="min-h-[100px]"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Updating...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectEditDialog;
