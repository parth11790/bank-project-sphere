
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronLeft, Download, Filter } from 'lucide-react';
import { projects, businesses, getBusinessById, getBusinessByOwnerId, getUserById } from '@/lib/mockData';
import { toast } from 'sonner';

const CashFlowAnalysis: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState<string>("2023");
  
  // Find the project by ID
  const project = projects.find(p => p.project_id === projectId);
  
  // If project doesn't exist, redirect to the projects list
  if (!project) {
    return <Navigate to="/projects" replace />;
  }
  
  // Get the seller participants from this project
  const sellerParticipants = project.participants?.filter(p => {
    const user = getUserById(p.userId);
    return user && user.role === 'seller';
  }) || [];
  
  // Get the businesses for these sellers
  const sellerBusinesses = sellerParticipants.map(p => {
    const user = getUserById(p.userId);
    if (user && user.business) {
      const business = businesses.find(b => b.name === user.business);
      return business;
    }
    return null;
  }).filter(Boolean);
  
  const years = ["2021", "2022", "2023"];
  
  const handleExport = () => {
    toast("Exporting cash flow data (Demo only)");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-6 px-4 md:px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/project/dashboard/${projectId}`)}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back to Project
                </Button>
              </div>
              <h1 className="text-3xl font-bold mt-4">Cash Flow Analysis</h1>
              <p className="text-muted-foreground">{project.project_name}</p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={handleExport} className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle>Business Cash Flow Summary</CardTitle>
                  <CardDescription>Financial performance of seller businesses</CardDescription>
                </div>
                <Tabs defaultValue={selectedYear} onValueChange={setSelectedYear} className="w-[200px]">
                  <TabsList className="grid grid-cols-3">
                    {years.map(year => (
                      <TabsTrigger key={year} value={year}>{year}</TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">Business</TableHead>
                      <TableHead>Entity Type</TableHead>
                      <TableHead className="text-right">Revenue</TableHead>
                      <TableHead className="text-right">Wages</TableHead>
                      <TableHead className="text-right">COGS</TableHead>
                      <TableHead className="text-right">Gross Profit</TableHead>
                      <TableHead className="text-right">Gross Margin</TableHead>
                      <TableHead className="text-right">Other Expenses</TableHead>
                      <TableHead className="text-right">Total NOI</TableHead>
                      <TableHead className="text-right">NOM %</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sellerBusinesses.map((business) => {
                      if (!business) return null;
                      const financialData = business.financial_data[selectedYear as keyof typeof business.financial_data];
                      
                      if (!financialData) {
                        return (
                          <TableRow key={business.business_id}>
                            <TableCell className="font-medium">{business.name}</TableCell>
                            <TableCell>{business.entity_type}</TableCell>
                            <TableCell colSpan={8} className="text-center text-muted-foreground">
                              No financial data available for {selectedYear}
                            </TableCell>
                          </TableRow>
                        );
                      }
                      
                      const grossMargin = (financialData.gross_profit / financialData.revenue * 100).toFixed(1);
                      
                      return (
                        <TableRow key={business.business_id}>
                          <TableCell className="font-medium">{business.name}</TableCell>
                          <TableCell>{business.entity_type}</TableCell>
                          <TableCell className="text-right">
                            {financialData.revenue.toLocaleString('en-US', {
                              style: 'currency',
                              currency: 'USD',
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            })}
                          </TableCell>
                          <TableCell className="text-right">
                            {financialData.wages.toLocaleString('en-US', {
                              style: 'currency',
                              currency: 'USD',
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            })}
                          </TableCell>
                          <TableCell className="text-right">
                            {financialData.cogs.toLocaleString('en-US', {
                              style: 'currency',
                              currency: 'USD',
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            })}
                          </TableCell>
                          <TableCell className="text-right">
                            {financialData.gross_profit.toLocaleString('en-US', {
                              style: 'currency',
                              currency: 'USD',
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            })}
                          </TableCell>
                          <TableCell className="text-right">{grossMargin}%</TableCell>
                          <TableCell className="text-right">
                            {financialData.other_expenses.toLocaleString('en-US', {
                              style: 'currency',
                              currency: 'USD',
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            })}
                          </TableCell>
                          <TableCell className="text-right">
                            {financialData.total_noi.toLocaleString('en-US', {
                              style: 'currency',
                              currency: 'USD',
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            })}
                          </TableCell>
                          <TableCell className="text-right">{financialData.nom_percentage}%</TableCell>
                        </TableRow>
                      );
                    })}
                    
                    {sellerBusinesses.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={10} className="text-center py-6 text-muted-foreground">
                          No seller businesses found for this project
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              
              {sellerBusinesses.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">Trend Analysis</h3>
                  <p className="text-muted-foreground mb-4">
                    The financial data shows that 
                    {sellerBusinesses.map(b => b?.name).join(' and ')} 
                    maintained healthy profit margins over the last three years,
                    with consistent growth in revenue and net operating income.
                    This indicates good operational stability and financial health.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default CashFlowAnalysis;
