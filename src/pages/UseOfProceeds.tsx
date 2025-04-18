
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import EnhancedUseOfProceedsTable from '@/components/useOfProceeds/EnhancedUseOfProceedsTable';
import { getProjectById } from '@/lib/mockData';
import { toast } from 'sonner';
import UseOfProceedsHeader from '@/components/useOfProceeds/UseOfProceedsHeader';
import EmptyState from '@/components/useOfProceeds/EmptyState';
import { getUseOfProceeds, saveUseOfProceeds } from '@/services/proceedsService';

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
  const [proceedsData, setProceedsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const selectedProject = getProjectById(selectedProjectId) as Project | undefined;

  useEffect(() => {
    if (projectId) {
      setSelectedProjectId(projectId);
      fetchProceedsData(projectId);
    }
  }, [projectId]);

  const fetchProceedsData = async (id: string) => {
    setLoading(true);
    try {
      const data = await getUseOfProceeds(id);
      setProceedsData(data);
    } catch (error) {
      console.error("Error fetching proceeds data:", error);
      toast.error("Failed to load use of proceeds data");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (updatedData: any) => {
    try {
      await saveUseOfProceeds(selectedProjectId, updatedData);
      // Refresh data after save
      fetchProceedsData(selectedProjectId);
    } catch (error) {
      console.error("Error saving proceeds data:", error);
    }
  };

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
          >
            {loading ? (
              <div className="flex justify-center p-8">
                <div className="animate-pulse">Loading use of proceeds data...</div>
              </div>
            ) : (
              <EnhancedUseOfProceedsTable 
                projectId={selectedProjectId} 
                initialData={proceedsData}
                onSave={handleSave} 
              />
            )}
          </motion.div>
        ) : (
          <EmptyState />
        )}
      </div>
    </Layout>
  );
};

export default UseOfProceeds;
