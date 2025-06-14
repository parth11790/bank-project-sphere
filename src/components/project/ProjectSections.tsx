
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BarChart3, FileText } from 'lucide-react';
import { Project } from '@/types/project';

interface ProjectSectionsProps {
  project: Project;
  onGatherInformation: () => void;
  onAnalysis: () => void;
  onGenerateDocumentation: () => void;
  onManageBusinessStructure?: () => void;
}

export const ProjectSections: React.FC<ProjectSectionsProps> = ({
  project,
  onGatherInformation,
  onAnalysis,
  onGenerateDocumentation,
  onManageBusinessStructure
}) => {
  const sections = [
    {
      id: 'gather-info',
      title: 'Gather Information',
      description: 'Collect participant data, documents, and forms',
      icon: Users,
      action: onGatherInformation,
      buttonText: 'Manage Participants',
      enabled: true
    },
    {
      id: 'analysis',
      title: 'Analysis',
      description: 'Review financial data and risk assessment',
      icon: BarChart3,
      action: onAnalysis,
      buttonText: 'View Analysis',
      enabled: true
    },
    {
      id: 'documentation',
      title: 'Generate Documentation', 
      description: 'Create loan packages and compliance documents',
      icon: FileText,
      action: onGenerateDocumentation,
      buttonText: 'Generate Docs',
      enabled: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {sections.map((section) => (
        <Card key={section.id} className="relative">
          <CardHeader className="p-3 pb-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <div className="flex items-center gap-2">
                <section.icon className="h-4 w-4 text-primary" />
                <CardTitle className="text-sm sm:text-base">{section.title}</CardTitle>
              </div>
              <CardDescription className="text-xs">
                {section.description}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <Button
              onClick={section.action}
              disabled={!section.enabled}
              className="w-full"
              variant={section.enabled ? "default" : "secondary"}
              size="sm"
            >
              {section.buttonText}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
