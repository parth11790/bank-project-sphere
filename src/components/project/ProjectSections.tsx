
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, FileText, BarChart3, ChevronRight } from 'lucide-react';
import { Project } from '@/types/project';

interface ProjectSectionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const ProjectSection: React.FC<ProjectSectionProps> = ({
  title,
  description,
  icon,
  onClick
}) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-2 rounded-md text-primary">
              {icon}
            </div>
            <CardTitle>{title}</CardTitle>
          </div>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button 
          variant="default" 
          className="w-full" 
          onClick={onClick}
        >
          Go to {title} <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
};

interface ProjectSectionsProps {
  project: Project;
  onGatherInformation: () => void;
  onAnalysis: () => void;
  onGenerateDocumentation: () => void;
}

export const ProjectSections: React.FC<ProjectSectionsProps> = ({
  project,
  onGatherInformation,
  onAnalysis,
  onGenerateDocumentation
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <ProjectSection
        title="Gather Information"
        description="Assign forms and documents to participants to collect required information"
        icon={<Users className="h-5 w-5" />}
        onClick={onGatherInformation}
      />
      <ProjectSection
        title="Analysis"
        description="Review financial analysis based on collected information"
        icon={<BarChart3 className="h-5 w-5" />}
        onClick={onAnalysis}
      />
      <ProjectSection
        title="Generate Documentation"
        description="Create and manage underwriting documentation"
        icon={<FileText className="h-5 w-5" />}
        onClick={onGenerateDocumentation}
      />
    </div>
  );
};
