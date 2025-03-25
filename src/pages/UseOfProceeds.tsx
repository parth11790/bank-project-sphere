
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import UseOfProceedsTable from '@/components/UseOfProceedsTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { projects, getUseOfProceedsForProject, getProjectById } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';
import { ChevronLeft, Download, FileSpreadsheet } from 'lucide-react';

const UseOfProceeds: React.FC = () => {
  const { toast } = useToast();
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.project_id || '');
  const selectedProject = getProjectById(selectedProjectId);
  const proceedsData = getUseOfProceedsForProject(selectedProjectId);

  const handleSave = (updatedData: any) => {
    toast({
      title: "Data Saved",
      description: "Use of proceeds data has been updated (Demo only)",
    });
  };

  const handleExport = () => {
    toast({
      title: "Export Initiated",
      description: "Exporting data to spreadsheet (Demo only)",
    });
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
                <Link to="/dashboard" className="flex items-center gap-1">
                  <ChevronLeft className="h-4 w-4" />
                  <span>Back to Dashboard</span>
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
                <CardTitle className="text-xl">Project Selection</CardTitle>
                <CardDescription>Choose a project to view or edit its use of proceeds</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="w-full sm:w-64">
                    <Select value={selectedProjectId} onValueChange={setSelectedProjectId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a project" />
                      </SelectTrigger>
                      <SelectContent>
                        {projects.map(project => (
                          <SelectItem key={project.project_id} value={project.project_id}>
                            {project.project_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {selectedProject && (
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm">
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
                    </div>
                  )}
                </div>
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
                  There is no financial data available for this project. Please select a different project or create new data.
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
