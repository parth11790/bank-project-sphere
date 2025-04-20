
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import EnhancedUseOfProceedsTable from '@/components/useOfProceeds/EnhancedUseOfProceedsTable';
import { getProjectById, getUseOfProceedsForProject } from '@/lib/mockData/utilities';
import { toast } from 'sonner';
import UseOfProceedsHeader from '@/components/useOfProceeds/UseOfProceedsHeader';
import EmptyState from '@/components/useOfProceeds/EmptyState';
import { Card } from '@/components/ui/card';

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
      toast.success("Data saved successfully");
      fetchProceedsData(selectedProjectId);
    } catch (error) {
      console.error("Error saving proceeds data:", error);
      toast.error("Failed to save data");
    }
  };

  const handleExport = () => {
    toast.success("Exporting data to spreadsheet");
  };

  return (
    <Layout>
      <div className="space-y-6 px-6 py-8 md:px-8 lg:px-12">
        <UseOfProceedsHeader 
          projectName={selectedProject?.project_name}
          projectId={projectId}
          onExport={handleExport}
        />

        {selectedProjectId ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-lg bg-card"
          >
            {loading ? (
              <Card className="p-8">
                <div className="flex items-center justify-center">
                  <div className="animate-pulse text-muted-foreground">
                    Loading use of proceeds data...
                  </div>
                </div>
              </Card>
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
