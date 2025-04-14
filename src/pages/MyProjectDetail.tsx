
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { FileText, Building, Upload, ArrowLeft } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { getProjectById } from '@/services';
import { getParticipantsWithDetailsData } from '@/lib/mockDataProvider';
import { Project, getStatusString } from '@/types/project';
import { ParticipantWithDetails } from '@/types/participant';
import DocumentUploadCard from '@/components/form/DocumentUploadCard';
import { toast } from 'sonner';

const MyProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState('overview');
  const [file, setFile] = useState<File | null>(null);
  
  // Get project details
  const { data: project, isLoading: projectLoading } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => getProjectById(projectId || ''),
    enabled: !!projectId
  });
  
  // Get participant details for the current user
  const { data: participants, isLoading: participantsLoading } = useQuery({
    queryKey: ['participant', projectId, user?.id],
    queryFn: () => getParticipantsWithDetailsData(projectId || ''),
    enabled: !!projectId && !!user?.id
  });
  
  const isLoading = projectLoading || participantsLoading;
  
  // Find the current participant (user in this project)
  const myParticipantInfo = participants?.find(p => p.user_id === user?.id) || null;
  
  // Handle document upload
  const handleDocumentUpload = () => {
    if (file) {
      toast.success(`Document "${file.name}" uploaded successfully`);
      setFile(null);
    } else {
      toast.error("Please select a file to upload");
    }
  };
  
  if (isLoading) {
    return (
      <Layout>
        <div className="container py-8">
          <div className="h-12 w-1/3 bg-muted rounded-md animate-pulse mb-4" />
          <div className="h-8 w-1/2 bg-muted rounded-md animate-pulse mb-6" />
          <div className="h-64 bg-muted rounded-md animate-pulse" />
        </div>
      </Layout>
    );
  }
  
  if (!project || !myParticipantInfo) {
    return (
      <Layout>
        <div className="container py-8">
          <div className="text-center py-12 bg-muted/30 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Project Not Found</h3>
            <p className="text-muted-foreground mb-4">
              The project you're looking for doesn't exist or you don't have access to it.
            </p>
            <Button onClick={() => navigate('/my-projects')}>
              Back to My Projects
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container py-8"
      >
        <div className="mb-6">
          <Button 
            variant="ghost" 
            className="mb-2" 
            onClick={() => navigate('/my-projects')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to My Projects
          </Button>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold">{project.project_name}</h1>
                <Badge variant={
                  project.status === 'active' ? 'default' :
                  project.status === 'pending' ? 'secondary' :
                  'outline'
                }>
                  {getStatusString(project.status)}
                </Badge>
              </div>
              <p className="text-muted-foreground">
                {project.description || `${project.project_type} Project`}
              </p>
            </div>
          </div>
        </div>
        
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="documents">My Documents</TabsTrigger>
            <TabsTrigger value="business">My Business</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Project Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Project Type</h3>
                    <p className="font-medium">{project.project_type}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Loan Amount</h3>
                    <p className="font-medium">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        maximumFractionDigits: 0,
                      }).format(project.loan_amount || 0)}
                    </p>
                  </div>
                  {project.city && (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Location</h3>
                      <p className="font-medium">{project.city}, {project.state}</p>
                    </div>
                  )}
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Your Role</h3>
                    <p className="font-medium capitalize">{myParticipantInfo.role}</p>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Required Actions</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span>Submit all required personal documents</span>
                    </li>
                    {myParticipantInfo.business ? (
                      <li className="flex items-center gap-2 text-sm">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <span>Submit all required business documents</span>
                      </li>
                    ) : (
                      <li className="flex items-center gap-2 text-sm">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <span>Add your business information</span>
                      </li>
                    )}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="documents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>My Required Documents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Personal Documents</h3>
                  
                  {myParticipantInfo.documents.length > 0 ? (
                    <div className="space-y-2">
                      {myParticipantInfo.documents.map(doc => (
                        <div key={doc.document_id} className="flex items-center justify-between p-3 bg-muted rounded-md">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{doc.name}</span>
                          </div>
                          <Button size="sm" variant="secondary">
                            <Upload className="h-3.5 w-3.5 mr-1" />
                            Upload
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No documents required at this time.</p>
                  )}
                </div>
                
                {myParticipantInfo.forms.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Personal Forms</h3>
                    <div className="space-y-2">
                      {myParticipantInfo.forms.map(form => (
                        <div key={form.form_id} className="flex items-center justify-between p-3 bg-muted rounded-md">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{form.name}</span>
                          </div>
                          <Button size="sm" onClick={() => navigate(`/form/${form.form_id}?name=${encodeURIComponent(form.name)}&participant=${encodeURIComponent(myParticipantInfo.name)}`)}>
                            Complete Form
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <Separator />
                
                <DocumentUploadCard file={file} setFile={setFile} />
                
                <Button 
                  className="w-full" 
                  disabled={!file}
                  onClick={handleDocumentUpload}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Document
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="business" className="space-y-4">
            {myParticipantInfo.business ? (
              <Card>
                <CardHeader>
                  <CardTitle>My Business Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/30 rounded-md">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Business Name</h3>
                      <p className="font-medium">{myParticipantInfo.business.name}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Entity Type</h3>
                      <p className="font-medium">{myParticipantInfo.business.entity_type}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Title</h3>
                      <p className="font-medium">{myParticipantInfo.business.title || 'N/A'}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Ownership</h3>
                      <p className="font-medium">{myParticipantInfo.business.ownership_percentage || 0}%</p>
                    </div>
                  </div>
                  
                  {myParticipantInfo.business.documents.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Business Documents</h3>
                      <div className="space-y-2">
                        {myParticipantInfo.business.documents.map(doc => (
                          <div key={doc.document_id} className="flex items-center justify-between p-3 bg-muted rounded-md">
                            <div className="flex items-center">
                              <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>{doc.name}</span>
                            </div>
                            <Button size="sm" variant="secondary">
                              <Upload className="h-3.5 w-3.5 mr-1" />
                              Upload
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {myParticipantInfo.business.forms.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Business Forms</h3>
                      <div className="space-y-2">
                        {myParticipantInfo.business.forms.map(form => (
                          <div key={form.form_id} className="flex items-center justify-between p-3 bg-muted rounded-md">
                            <div className="flex items-center">
                              <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>{form.name}</span>
                            </div>
                            <Button size="sm" onClick={() => navigate(`/form/${form.form_id}?name=${encodeURIComponent(form.name)}&participant=${encodeURIComponent(myParticipantInfo.name)}&business=${encodeURIComponent(myParticipantInfo.business.name)}`)}>
                              Complete Form
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Add Your Business</CardTitle>
                </CardHeader>
                <CardContent className="text-center py-6">
                  <Building className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">No Business Information</h3>
                  <p className="text-muted-foreground mb-4">
                    You haven't added any business information yet.
                  </p>
                  <Button>
                    <Building className="h-4 w-4 mr-2" />
                    Add Business Information
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </motion.div>
    </Layout>
  );
};

export default MyProjectDetail;
