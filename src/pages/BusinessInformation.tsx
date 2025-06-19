
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { getProjectById } from '@/services';
import { Project } from '@/types/project';
import EditableBusinessInfoSection from '@/components/business/EditableBusinessInfoSection';
import EditableBusinessFormsSection from '@/components/business/EditableBusinessFormsSection';
import EditableBusinessOwnershipSection from '@/components/business/EditableBusinessOwnershipSection';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const BusinessInformation = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  const { data: project, isLoading } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => getProjectById(projectId || ''),
    enabled: !!projectId
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Loading business information...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!project) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Business not found</p>
          <Button onClick={() => navigate(-1)} className="mt-4">
            Go Back
          </Button>
        </div>
      </Layout>
    );
  }

  const projectData = project as Project;
  const business = projectData.main_business;

  if (!business) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">No business information available</p>
          <Button onClick={() => navigate(-1)} className="mt-4">
            Go Back
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{business.name}</h1>
            <p className="text-muted-foreground">{business.entity_type}</p>
          </div>
        </div>

        {/* Side-by-side layout for Business Information and Forms */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Business Information Section */}
          <EditableBusinessInfoSection business={business} />

          {/* Forms Section */}
          <EditableBusinessFormsSection business={business} />
        </div>

        {/* Ownership Section - Full width */}
        <EditableBusinessOwnershipSection projectId={projectId || ''} owners={projectData.owners || []} />
      </motion.div>
    </Layout>
  );
};

export default BusinessInformation;
