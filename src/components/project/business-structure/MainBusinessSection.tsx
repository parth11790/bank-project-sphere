
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2 } from 'lucide-react';
import { Project } from '@/types/project';

interface MainBusinessSectionProps {
  project: Project;
}

const MainBusinessSection: React.FC<MainBusinessSectionProps> = ({ project }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            <CardTitle>Main Business</CardTitle>
          </div>
        </div>
        <CardDescription>Primary business entity for this project</CardDescription>
      </CardHeader>
      <CardContent>
        {project.main_business ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-lg">{project.main_business.name}</h4>
                <p className="text-sm text-muted-foreground">{project.main_business.entity_type}</p>
                {project.main_business.description && (
                  <p className="text-sm mt-2">{project.main_business.description}</p>
                )}
              </div>
              <div className="space-y-2">
                {project.main_business.website && (
                  <p className="text-sm"><strong>Website:</strong> {project.main_business.website}</p>
                )}
                {project.main_business.founding_date && (
                  <p className="text-sm"><strong>Founded:</strong> {new Date(project.main_business.founding_date).toLocaleDateString()}</p>
                )}
                {project.main_business.employee_count && (
                  <p className="text-sm"><strong>Employees:</strong> {project.main_business.employee_count}</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No main business configured</p>
            <Button className="mt-4">Add Main Business</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MainBusinessSection;
