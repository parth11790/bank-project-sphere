import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import EnhancedUseOfProceedsTable from '@/components/useOfProceeds/EnhancedUseOfProceedsTable';
import { Button } from '@/components/ui/button';
import { getProjectById } from '@/lib/mockData';
import { getUseOfProceedsForProject } from '@/lib/mockData/utilities';
import { toast } from 'sonner';
import { ChevronLeft, Download, FileSpreadsheet } from 'lucide-react';

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

  useEffect(() => {
    if (projectId) {
      setSelectedProjectId(projectId);
    }
  }, [projectId]);

  const handleSave = (updatedData: any) => {
    const hasConstruction = updatedData.some((item: any) => 
      item.overall_category === 'Construction' && item.value > 0
    );
    
    const hasRefinance = updatedData.some((item: any) => 
      item.row_name === 'REFINANCE' && item.value > 0
    );
    
    const hasWorkingCapital = updatedData.some((item: any) => 
      item.overall_category === 'Working Capital' && item.value > 0
    );
    
    const determinedLoanTypes = [];
    
    if (hasConstruction) {
      determinedLoanTypes.push('504');
    }
    
    if (hasRefinance) {
      determinedLoanTypes.push('7(a) GP');
    }
    
    if (hasWorkingCapital) {
      determinedLoanTypes.push('Express');
    }
    
    if (determinedLoanTypes.length === 0) {
      determinedLoanTypes.push('Conventional');
    }
    
    toast(`Data Saved - Loan types: ${determinedLoanTypes.join(', ')} (Demo only)`);
  };

  const handleExport = () => {
    toast("Exporting data to spreadsheet (Demo only)");
  };

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold mb-1">Use of Proceeds</h1>
            {selectedProject && (
              <p className="text-muted-foreground">{selectedProject.project_name}</p>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" asChild>
              <Link to={`/project/${projectId}`} className="flex items-center gap-1">
                <ChevronLeft className="h-4 w-4" />
                <span>Back to Project</span>
              </Link>
            </Button>
            
            <Button variant="outline" size="sm" onClick={handleExport} className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </Button>
          </div>
        </motion.div>

        {selectedProjectId ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <EnhancedUseOfProceedsTable 
              projectId={selectedProjectId} 
              initialData={proceedsData}
              onSave={handleSave} 
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center py-12"
          >
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="p-3 rounded-full bg-muted/50">
                <FileSpreadsheet className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">No Use of Proceeds Data Available</h3>
              <p className="text-muted-foreground max-w-md">
                There is no financial data available for this project. Please create new data.
              </p>
              <Button className="mt-2">Create New Data</Button>
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default UseOfProceeds;
