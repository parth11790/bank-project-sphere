
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, FileText, BarChart3, ChevronRight, ArrowRight } from 'lucide-react';
import { Project } from '@/types/project';

interface ProjectSectionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  stepNumber: number;
}

const ProjectSection: React.FC<ProjectSectionProps> = ({
  title,
  description,
  icon,
  onClick,
  stepNumber
}) => {
  return (
    <Card className="hover:shadow-md transition-shadow relative overflow-hidden">
      <div className="absolute top-0 left-0 h-full w-1 bg-primary/60" />
      <div className="absolute top-3 left-3 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-medium">
        {stepNumber}
      </div>
      <CardHeader className="pb-2 pl-10">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 p-2 rounded-md text-primary">
            {icon}
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <Button 
          variant="default" 
          className="w-full" 
          onClick={onClick}
        >
          Go to {title} <ArrowRight className="h-4 w-4 ml-2" />
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
    <div>
      <h2 className="text-lg font-medium mb-4">Project Workflow</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ProjectSection
          title="Information Gathering"
          description="Assign forms and collect required documents from participants"
          icon={<Users className="h-5 w-5" />}
          onClick={onGatherInformation}
          stepNumber={1}
        />
        <ProjectSection
          title="Financial Analysis"
          description="Review financial metrics and project feasibility"
          icon={<BarChart3 className="h-5 w-5" />}
          onClick={onAnalysis}
          stepNumber={2}
        />
        <ProjectSection
          title="Documentation"
          description="Generate and manage underwriting documentation"
          icon={<FileText className="h-5 w-5" />}
          onClick={onGenerateDocumentation}
          stepNumber={3}
        />
      </div>
    </div>
  );
};
