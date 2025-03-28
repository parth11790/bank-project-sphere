
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChevronLeft, Download, FileSpreadsheet } from 'lucide-react';
import { toast } from 'sonner';
import { useQuery } from '@tanstack/react-query';
import { getProjectById, getProjectParticipants, getBusinessesByOwnerId, getBusinessFinancialData } from '@/services';
import { Skeleton } from '@/components/ui/skeleton';
import { Business, isBusiness } from '@/types/business';
import { Project, isProject } from '@/types/project';
import { Participant, isParticipant } from '@/types/participant';

const CashFlowAnalysis: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [years, setYears] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch project details
  const { data: projectData, isLoading: projectLoading } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => getProjectById(projectId || ''),
    enabled: !!projectId,
  });

  // Fetch project participants
  const { data: participantsData, isLoading: participantsLoading } = useQuery({
    queryKey: ['participants', projectId],
    queryFn: () => getProjectParticipants(projectId || ''),
    enabled: !!projectId,
  });

  // Load businesses and their financial data
  useEffect(() => {
    const loadBusinessData = async () => {
      if (!participantsData || participantsLoading) return;

      // Get seller participants only
      const sellers = participantsData.filter(p => isParticipant(p) && p.user.role === 'seller');
      if (sellers.length === 0) {
        setIsLoading(false);
        return;
      }

      const allBusinesses: Business[] = [];
      const allYears = new Set<string>();

      // For each seller, get their businesses
      for (const seller of sellers) {
        const sellerBusinesses = await getBusinessesByOwnerId(seller.user_id);
        
        // For each business, fetch financial data
        for (const business of sellerBusinesses) {
          if (!isBusiness(business)) continue;
          
          const financialData = await getBusinessFinancialData(business.business_id);
          
          // Add years to our set of years
          financialData.forEach(data => allYears.add(data.year));
          
          // Add business with its financial data
          allBusinesses.push({
            ...business,
            financial_data: financialData.reduce((acc, curr) => {
              acc[curr.year] = {
                revenue: curr.revenue,
                wages: curr.wages,
                cogs: curr.cogs,
                gross_profit: curr.gross_profit,
                other_expenses: curr.other_expenses,
                total_noi: curr.total_noi,
                nom_percentage: curr.nom_percentage
              };
              return acc;
            }, {} as Record<string, any>)
          });
        }
      }

      // Sort years chronologically
      const sortedYears = Array.from(allYears).sort();
      
      setBusinesses(allBusinesses);
      setYears(sortedYears);
      setIsLoading(false);
    };

    loadBusinessData();
  }, [participantsData, participantsLoading, projectId]);

  const handleExport = () => {
    toast.success("Exporting cash flow data (Demo only)");
  };

  const project: Project | null = projectData && isProject(projectData) ? projectData : null;

  if (projectLoading || isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-6 px-4 md:px-6 max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-10 w-32" />
          </div>
          <div className="mt-8">
            <Skeleton className="h-96 w-full" />
          </div>
        </main>
      </div>
    );
  }

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
              <h1 className="text-3xl font-bold mb-1">Cash Flow Analysis</h1>
              <p className="text-muted-foreground">
                {project?.project_name || 'Project'} - Financial data for all seller businesses
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" asChild>
                <Link to={`/project/${projectId}`} className="flex items-center gap-1">
                  <ChevronLeft className="h-4 w-4" />
                  <span>Back to Project</span>
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleExport} 
                className="flex items-center gap-1"
              >
                <Download className="h-4 w-4" />
                <span>Export</span>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {businesses.length > 0 ? (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Business Financial Data</CardTitle>
                  <CardDescription>
                    Combined financial data for all seller businesses involved in this project
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableCaption>Financial data for seller businesses</TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[250px]">Business</TableHead>
                          <TableHead>Entity Type</TableHead>
                          {years.map(year => (
                            <TableHead key={year} className="text-right">{year}</TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {businesses.map(business => (
                          <React.Fragment key={business.business_id}>
                            {/* Revenue row */}
                            <TableRow>
                              <TableCell className="font-medium" rowSpan={9}>
                                {business.name}
                              </TableCell>
                              <TableCell rowSpan={9}>{business.entity_type}</TableCell>
                              <TableCell className="font-medium" colSpan={years.length + 1}>
                                Revenue
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              {years.map(year => {
                                const yearData = business.financial_data?.[year];
                                return (
                                  <TableCell key={`${business.business_id}-revenue-${year}`} className="text-right">
                                    {yearData ? new Intl.NumberFormat('en-US', {
                                      style: 'currency',
                                      currency: 'USD',
                                      maximumFractionDigits: 0,
                                    }).format(yearData.revenue) : '-'}
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                            
                            {/* Wages row */}
                            <TableRow>
                              <TableCell className="font-medium" colSpan={years.length + 1}>
                                Wages
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              {years.map(year => {
                                const yearData = business.financial_data?.[year];
                                return (
                                  <TableCell key={`${business.business_id}-wages-${year}`} className="text-right">
                                    {yearData ? new Intl.NumberFormat('en-US', {
                                      style: 'currency',
                                      currency: 'USD',
                                      maximumFractionDigits: 0,
                                    }).format(yearData.wages) : '-'}
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                            
                            {/* COGS row */}
                            <TableRow>
                              <TableCell className="font-medium" colSpan={years.length + 1}>
                                COGS
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              {years.map(year => {
                                const yearData = business.financial_data?.[year];
                                return (
                                  <TableCell key={`${business.business_id}-cogs-${year}`} className="text-right">
                                    {yearData ? new Intl.NumberFormat('en-US', {
                                      style: 'currency',
                                      currency: 'USD',
                                      maximumFractionDigits: 0,
                                    }).format(yearData.cogs) : '-'}
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                            
                            {/* Gross Profit row */}
                            <TableRow>
                              <TableCell className="font-medium" colSpan={years.length + 1}>
                                Gross Profit
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              {years.map(year => {
                                const yearData = business.financial_data?.[year];
                                return (
                                  <TableCell key={`${business.business_id}-gross-profit-${year}`} className="text-right">
                                    {yearData ? new Intl.NumberFormat('en-US', {
                                      style: 'currency',
                                      currency: 'USD',
                                      maximumFractionDigits: 0,
                                    }).format(yearData.gross_profit) : '-'}
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                            
                            {/* Gross Margin row */}
                            <TableRow>
                              <TableCell className="font-medium" colSpan={years.length + 1}>
                                Gross Margin
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              {years.map(year => {
                                const yearData = business.financial_data?.[year];
                                const grossMargin = yearData && yearData.revenue > 0 
                                  ? (yearData.gross_profit / yearData.revenue * 100) 
                                  : 0;
                                
                                return (
                                  <TableCell key={`${business.business_id}-gross-margin-${year}`} className="text-right">
                                    {yearData ? `${grossMargin.toFixed(2)}%` : '-'}
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                            
                            {/* Other Expenses row */}
                            <TableRow>
                              <TableCell className="font-medium" colSpan={years.length + 1}>
                                Other Expenses
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              {years.map(year => {
                                const yearData = business.financial_data?.[year];
                                return (
                                  <TableCell key={`${business.business_id}-other-expenses-${year}`} className="text-right">
                                    {yearData ? new Intl.NumberFormat('en-US', {
                                      style: 'currency',
                                      currency: 'USD',
                                      maximumFractionDigits: 0,
                                    }).format(yearData.other_expenses) : '-'}
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                            
                            {/* Total NOI row */}
                            <TableRow>
                              <TableCell className="font-medium" colSpan={years.length + 1}>
                                Total NOI
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              {years.map(year => {
                                const yearData = business.financial_data?.[year];
                                return (
                                  <TableCell key={`${business.business_id}-total-noi-${year}`} className="text-right">
                                    {yearData ? new Intl.NumberFormat('en-US', {
                                      style: 'currency',
                                      currency: 'USD',
                                      maximumFractionDigits: 0,
                                    }).format(yearData.total_noi) : '-'}
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                            
                            {/* NOM row */}
                            <TableRow>
                              <TableCell className="font-medium" colSpan={years.length + 1}>
                                NOM
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              {years.map(year => {
                                const yearData = business.financial_data?.[year];
                                return (
                                  <TableCell key={`${business.business_id}-nom-${year}`} className="text-right">
                                    {yearData ? `${yearData.nom_percentage.toFixed(2)}%` : '-'}
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                          </React.Fragment>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <div className="p-3 rounded-full bg-muted/50 mb-4">
                    <FileSpreadsheet className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No Financial Data Available</h3>
                  <p className="text-muted-foreground text-center max-w-md mb-6">
                    No seller businesses with financial data found for this project.
                  </p>
                  <div className="flex gap-3">
                    <Button variant="outline" asChild>
                      <Link to={`/project/${projectId}`}>Back to Project</Link>
                    </Button>
                    <Button asChild>
                      <Link to={`/project/participants/${projectId}`}>Add Sellers</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default CashFlowAnalysis;
