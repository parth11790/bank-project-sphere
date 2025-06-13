
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BarChart3, FileText, Building2 } from 'lucide-react';
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
      id: 'business-structure',
      title: 'Business Structure',
      description: 'Manage main business, owners, sellers, and their affiliated businesses',
      icon: Building2,
      action: onManageBusinessStructure || (() => {}),
      buttonText: 'Manage Structure',
      enabled: true
    },
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {sections.map((section) => (
        <Card key={section.id} className="relative">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <section.icon className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">{section.title}</CardTitle>
            </div>
            <CardDescription className="text-sm">
              {section.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={section.action}
              disabled={!section.enabled}
              className="w-full"
              variant={section.enabled ? "default" : "secondary"}
            >
              {section.buttonText}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
