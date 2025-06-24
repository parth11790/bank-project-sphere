
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { getProjectById } from '@/services';
import EditableBusinessInfoSection from '@/components/business/EditableBusinessInfoSection';
import EditableBusinessFormsSection from '@/components/business/EditableBusinessFormsSection';
import AffiliatedBusinessOwnershipSection from '@/components/business/AffiliatedBusinessOwnershipSection';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, FileText, Users } from 'lucide-react';

const Business = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [activeTab, setActiveTab] = useState('info');

  const { data: project, isLoading } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => getProjectById(projectId || ''),
    enabled: !!projectId
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  if (!project) {
    return (
      <Layout>
        <div className="text-center py-8">
          <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Project Not Found</h2>
          <p className="text-muted-foreground">The requested project could not be found.</p>
        </div>
      </Layout>
    );
  }

  const tabs = [
    { id: 'info', label: 'Business Information', icon: Building2 },
    { id: 'forms', label: 'Forms & Documents', icon: FileText },
    { id: 'ownership', label: 'Affiliated Businesses', icon: Users }
  ];

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Business Information</h1>
            <p className="text-muted-foreground">
              {project.project_name} - Business Details & Documentation
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex space-x-1 bg-muted/50 p-1 rounded-lg">
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex items-center gap-2 flex-1"
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </Button>
              ))}
            </div>
          </CardHeader>
        </Card>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          {activeTab === 'info' && (
            <EditableBusinessInfoSection
              business={project.main_business}
            />
          )}
          
          {activeTab === 'forms' && (
            <EditableBusinessFormsSection
              business={project.main_business}
            />
          )}
          
          {activeTab === 'ownership' && (
            <AffiliatedBusinessOwnershipSection
              projectId={projectId || ''}
              owners={project.owners || []}
            />
          )}
        </div>
      </motion.div>
    </Layout>
  );
};

export default Business;
