
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import EnhancedUseOfProceedsTable from '@/components/useOfProceeds/EnhancedUseOfProceedsTable';
import { getProjectById } from '@/lib/mockData';
import { getUseOfProceedsForProject } from '@/lib/mockData/utilities';
import { toast } from 'sonner';
import UseOfProceedsHeader from '@/components/useOfProceeds/UseOfProceedsHeader';
import EmptyState from '@/components/useOfProceeds/EmptyState';
import { useUseOfProceedsLoanTypes } from '@/hooks/useUseOfProceedsLoanTypes';

interface Project {
  project_id: string;
  project_name: string;
  project_type: string;
  loan_amount: number;
  created_by: string;
  created_at: string;
  updated_at: string;
  city?: string;
  state?: string;
}

const UseOfProceeds: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [selectedProjectId, setSelectedProjectId] = useState(projectId || '');
  const selectedProject = getProjectById(selectedProjectId) as Project | undefined;
  const proceedsData = getUseOfProceedsForProject(selectedProjectId);
  const { handleSave } = useUseOfProceedsLoanTypes();

  // Virtualization optimization could be added here for extremely large datasets
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (projectId) {
      setSelectedProjectId(projectId);
    }
  }, [projectId]);

  useEffect(() => {
    // Simulate data loading
    setDataLoaded(false);
    if (selectedProjectId) {
      // This would be a real API call in a production app
      setTimeout(() => {
        setDataLoaded(true);
      }, 300);
    }
  }, [selectedProjectId]);

  const handleExport = () => {
    toast("Exporting data to spreadsheet (Demo only)");
  };

  return (
    <Layout collapseSidebar={true}>
      <div className="flex flex-col gap-6">
        <UseOfProceedsHeader 
          projectName={selectedProject?.project_name}
          projectId={projectId}
          onExport={handleExport}
        />

        {selectedProjectId ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full overflow-hidden"
          >
            <EnhancedUseOfProceedsTable 
              projectId={selectedProjectId} 
              initialData={proceedsData}
              onSave={handleSave} 
            />
          </motion.div>
        ) : (
          <EmptyState />
        )}
      </div>
    </Layout>
  );
};

export default UseOfProceeds;
