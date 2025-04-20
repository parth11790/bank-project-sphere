
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import EnhancedUseOfProceedsTable from '@/components/useOfProceeds/EnhancedUseOfProceedsTable';
import { getProjectById, getUseOfProceedsForProject } from '@/lib/mockData/utilities';
import { toast } from 'sonner';
import UseOfProceedsHeader from '@/components/useOfProceeds/UseOfProceedsHeader';
import EmptyState from '@/components/useOfProceeds/EmptyState';

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
      // Directly use the mock data utility without going through the service
      const data = getUseOfProceedsForProject(id);
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
      toast.success("Data saved successfully (demo)");
      // After successful save, refresh the data
      fetchProceedsData(selectedProjectId);
    } catch (error) {
      console.error("Error saving proceeds data:", error);
      toast.error("Failed to save data");
    }
  };

  const handleExport = () => {
    toast("Exporting data to spreadsheet (Demo only)");
  };

  return (
    <Layout>
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
