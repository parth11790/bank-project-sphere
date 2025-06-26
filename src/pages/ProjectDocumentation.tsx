
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, FileText, FilePlus, Check, Folder } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Layout from '@/components/Layout';
import { getProjectById } from '@/services';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import ProjectBreadcrumb from '@/components/project/ProjectBreadcrumb';
import PreApprovalLetterGenerator from '@/components/documentation/PreApprovalLetterGenerator';
import { Project, isProject } from '@/types/project';

const ProjectDocumentation: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  const { data: projectData, isLoading } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => getProjectById(projectId || ''),
    enabled: !!projectId,
  });

  const project: Project | null = projectData && isProject(projectData) ? projectData : null;

  // Mock data for documents
  const mockDocuments = [
    {
      id: '1',
      name: 'Loan Proposal',
      status: 'completed',
      date: '2023-10-15',
      type: 'underwriting'
    },
    {
      id: '2',
      name: 'Credit Memo',
      status: 'completed',
      date: '2023-10-18',
      type: 'underwriting'
    },
    {
      id: '3',
      name: 'Financial Analysis Report',
      status: 'pending',
      date: null,
      type: 'analysis'
    },
    {
      id: '4',
      name: 'Commitment Letter',
      status: 'pending',
      date: null,
      type: 'closing'
    }
  ];

  const handleGenerateDocument = (documentType: string) => {
    toast.success(`Generating ${documentType} document...`);
    // In a real app, this would trigger a document generation process
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="space-y-6">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-10 w-64" />
          <div className="grid grid-cols-1 gap-6">
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-60 w-full" />
          </div>
        </div>
      </Layout>
    );
  }

  if (!project) {
    toast.error('Project not found');
    navigate('/projects');
    return null;
  }

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <ProjectBreadcrumb project={project} currentPageTitle="Documentation" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate(`/project/${projectId}`)}
                className="flex items-center gap-1"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Back to Project</span>
              </Button>
            </div>
            <h1 className="text-3xl font-bold mt-4">Documentation</h1>
            <p className="text-muted-foreground">{project.project_name}</p>
          </div>
          <Button onClick={() => handleGenerateDocument('custom')}>
            <FilePlus className="mr-2 h-4 w-4" />
            Generate New Document
          </Button>
        </div>

        <Tabs defaultValue="documents" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="documents">Document Library</TabsTrigger>
            <TabsTrigger value="pre-approval">Pre-Approval Letter</TabsTrigger>
          </TabsList>
          
          <TabsContent value="documents" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Folder className="h-5 w-5 text-blue-500" />
                    <CardTitle>Underwriting Documents</CardTitle>
                  </div>
                  <CardDescription>Documents used in the underwriting process</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockDocuments
                    .filter(doc => doc.type === 'underwriting')
                    .map(doc => (
                      <div key={doc.id} className="flex items-center justify-between border-b pb-2">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-gray-500" />
                          <span>{doc.name}</span>
                        </div>
                        <div className="flex items-center">
                          {doc.status === 'completed' ? (
                            <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded flex items-center">
                              <Check className="h-3 w-3 mr-1" />
                              Generated
                            </span>
                          ) : (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleGenerateDocument(doc.name)}
                            >
                              Generate
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => handleGenerateDocument('underwriting')}
                  >
                    <FilePlus className="h-4 w-4 mr-2" />
                    Generate New Underwriting Document
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Folder className="h-5 w-5 text-violet-500" />
                    <CardTitle>Analysis Documents</CardTitle>
                  </div>
                  <CardDescription>Financial analysis and projections</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockDocuments
                    .filter(doc => doc.type === 'analysis')
                    .map(doc => (
                      <div key={doc.id} className="flex items-center justify-between border-b pb-2">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-gray-500" />
                          <span>{doc.name}</span>
                        </div>
                        <div className="flex items-center">
                          {doc.status === 'completed' ? (
                            <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded flex items-center">
                              <Check className="h-3 w-3 mr-1" />
                              Generated
                            </span>
                          ) : (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleGenerateDocument(doc.name)}
                            >
                              Generate
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => handleGenerateDocument('analysis')}
                  >
                    <FilePlus className="h-4 w-4 mr-2" />
                    Generate New Analysis Document
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Folder className="h-5 w-5 text-amber-500" />
                    <CardTitle>Closing Documents</CardTitle>
                  </div>
                  <CardDescription>Documents for loan closing process</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockDocuments
                    .filter(doc => doc.type === 'closing')
                    .map(doc => (
                      <div key={doc.id} className="flex items-center justify-between border-b pb-2">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-gray-500" />
                          <span>{doc.name}</span>
                        </div>
                        <div className="flex items-center">
                          {doc.status === 'completed' ? (
                            <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded flex items-center">
                              <Check className="h-3 w-3 mr-1" />
                              Generated
                            </span>
                          ) : (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleGenerateDocument(doc.name)}
                            >
                              Generate
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => handleGenerateDocument('closing')}
                  >
                    <FilePlus className="h-4 w-4 mr-2" />
                    Generate New Closing Document
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="pre-approval" className="space-y-6">
            <PreApprovalLetterGenerator />
          </TabsContent>
        </Tabs>
      </motion.div>
    </Layout>
  );
};

export default ProjectDocumentation;
