
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  FileText, 
  DollarSign
} from 'lucide-react';
import { Project } from '@/types/project';
import { prefetchProjectAnalysis, prefetchProjectDocumentation } from '@/utils/prefetch';

interface ProjectSectionsProps {
  project: Project;
  onAnalysis: () => void;
  onGenerateDocumentation: () => void;
  onManageReferrals?: () => void;
}

export const ProjectSections: React.FC<ProjectSectionsProps> = ({
  project,
  onAnalysis,
  onGenerateDocumentation,
  onManageReferrals
}) => {
  const sections = [
    {
      icon: BarChart3,
      title: "Analysis",
      description: "Review financial data and generate insights",
      action: onAnalysis,
      color: "text-green-600"
    },
    {
      icon: FileText,
      title: "Generate Documentation",
      description: "Create loan packages and required documents",
      action: onGenerateDocumentation,
      color: "text-purple-600"
    },
    {
      icon: DollarSign,
      title: "Referral Information",
      description: "Manage referral fees and source discussions",
      action: onManageReferrals || (() => console.log('Referral management clicked')),
      color: "text-emerald-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {sections.map((section, index) => {
        const Icon = section.icon;
        return (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-muted ${section.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-base">{section.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {section.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <Button 
                onClick={section.action}
                onMouseEnter={() => {
                  if (section.title === 'Analysis') prefetchProjectAnalysis();
                  if (section.title === 'Generate Documentation') prefetchProjectDocumentation();
                }}
                variant="outline" 
                className="w-full"
                size="sm"
              >
                Open
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
