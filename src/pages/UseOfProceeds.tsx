
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import Header from '@/components/Header';
import UseOfProceedsTable from '@/components/UseOfProceedsTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { projects, getUseOfProceedsForProject, getProjectById } from '@/lib/mockData';
import { toast } from 'sonner';
import { ChevronLeft, Download, FileSpreadsheet } from 'lucide-react';

// Define an interface that includes city and state properties and proper loan types
interface LoanType {
  type: string;
  amount: number;
  description: string;
}

interface Project {
  project_id: string;
  project_name: string;
  project_type: string;
  loan_types: LoanType[];
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
  // Use as any to avoid type errors during the transition
  const selectedProject = getProjectById(selectedProjectId) as Project | undefined;
  const proceedsData = getUseOfProceedsForProject(selectedProjectId);

  // Update the selectedProjectId if the URL param changes
  useEffect(() => {
    if (projectId) {
      setSelectedProjectId(projectId);
    }
  }, [projectId]);

  const handleSave = (updatedData: any) => {
    // Determine loan types based on Use of Proceeds data
    // This is simplified example logic - in a real app, 
    // this would be more sophisticated based on business rules
    const hasConstruction = updatedData.some((item: any) => 
      item.overall_category === 'Construction' && item.value > 0
    );
    
    const hasRefinance = updatedData.some((item: any) => 
      item.row_name === 'REFINANCE' && item.value > 0
    );
    
    const hasWorkingCapital = updatedData.some((item: any) => 
      item.overall_category === 'Working Capital' && item.value > 0
    );
    
    // Determine appropriate loan types based on the proceeds data
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
    
    // If no specific types determined, default to Conventional
    if (determinedLoanTypes.length === 0) {
      determinedLoanTypes.push('Conventional');
    }
    
    // Fix: Use the toast correctly
    toast(`Data Saved - Loan types: ${determinedLoanTypes.join(', ')} (Demo only)`);
  };

  const handleExport = () => {
    // Fix: Use the toast correctly
    toast("Exporting data to spreadsheet (Demo only)");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-6 px-4 md:px-6 max-w-6xl">
        <div className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div>
              <h1 className="text-3xl font-bold mb-1">Use of Proceeds</h1>
              <p className="text-muted-foreground">Track and manage project financial allocations</p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" asChild>
                <Link to={`/project/dashboard/${projectId}`} className="flex items-center gap-1">
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6"
          >
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl">Project Information</CardTitle>
                <CardDescription>Financial data for this project</CardDescription>
              </CardHeader>
              <CardContent>
                {selectedProject && (
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm">
                    <div className="font-semibold">{selectedProject.project_name}</div>
                    <span className="hidden sm:inline text-muted-foreground">•</span>
                    <span className="text-muted-foreground">Project Type:</span>
                    <span className="font-medium">{selectedProject.project_type}</span>
                    <span className="hidden sm:inline text-muted-foreground">•</span>
                    <span className="text-muted-foreground">Loan Amount:</span>
                    <span className="font-medium">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        maximumFractionDigits: 0,
                      }).format(selectedProject.loan_amount)}
                    </span>
                    {selectedProject.city && selectedProject.state && (
                      <>
                        <span className="hidden sm:inline text-muted-foreground">•</span>
                        <span className="text-muted-foreground">Location:</span>
                        <span className="font-medium">{selectedProject.city}, {selectedProject.state}</span>
                      </>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {selectedProjectId && proceedsData.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <UseOfProceedsTable 
                projectId={selectedProjectId} 
                data={proceedsData}
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
      </main>
    </div>
  );
};

export default UseOfProceeds;
