
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Filter, BarChart3, Building, Share2 } from 'lucide-react';
import { getProjectById, getBusinessFinancialData } from '@/services';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Bar, 
  BarChart as RechartBarChart, 
  Line, 
  LineChart, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { toast } from 'sonner';
import { BusinessFinancialData } from '@/types/business'; // Import the BusinessFinancialData type

const CashFlowAnalysis: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedBusiness, setSelectedBusiness] = useState<string>('all');
  const [displayType, setDisplayType] = useState<'table' | 'chart'>('table');
  
  const { data: project, isLoading: projectLoading } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => getProjectById(projectId || ''),
    enabled: !!projectId
  });
  
  const { data: financialData, isLoading: financialLoading } = useQuery({
    queryKey: ['financialData', projectId],
    queryFn: () => getBusinessFinancialData(projectId || ''),
    enabled: !!projectId
  });
  
  const isLoading = projectLoading || financialLoading;
  
  const handleDownload = () => {
    toast.success('Cash flow analysis report downloaded successfully');
  };
  
  const handleShare = () => {
    toast.success('Cash flow analysis report shared successfully');
  };
  
  if (isLoading) {
    return (
      <Layout>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <Skeleton className="h-8 w-64" />
            <div className="flex gap-2">
              <Skeleton className="h-10 w-20" />
              <Skeleton className="h-10 w-20" />
            </div>
          </div>
          
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
      </Layout>
    );
  }
  
  // Cast financialData to the correct type - this is safe now since we import the same type
  const financialDataArray = financialData as BusinessFinancialData[] || [];
  
  const availableBusinesses = financialDataArray.map(business => ({
    id: business.business_id,
    name: business.business_name || 'Unknown Business'
  }));
  
  // Get all available years from all businesses
  const availableYears = Array.from(
    new Set(
      financialDataArray.flatMap(business => 
        business.years ? business.years.map(yearData => yearData.year) : []
      )
    )
  ).sort();
  
  // Filter financial data based on selected business
  const filteredData = selectedBusiness === 'all' 
    ? financialDataArray 
    : financialDataArray.filter(business => business.business_id === selectedBusiness);
  
  // Prepare chart data
  const prepareChartData = (metric: keyof BusinessFinancialData['years'][0]) => {
    const chartData = availableYears.map(year => {
      const yearData: any = { year };
      
      filteredData.forEach(business => {
        if (business.years) {
          const businessYearData = business.years.find(y => y.year === year);
          if (businessYearData) {
            yearData[business.business_name || 'Unknown Business'] = businessYearData[metric];
          }
        }
      });
      
      return yearData;
    });
    
    return chartData;
  };
  
  const revenueChartData = prepareChartData('revenue');
  const profitChartData = prepareChartData('gross_profit');
  const marginChartData = prepareChartData('gross_margin');
  const noiChartData = prepareChartData('total_noi');
  
  // Helper function to format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Helper function to format percentage
  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };
  
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-6"
      >
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate(`/project/${projectId}`)}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-3xl font-bold">Cash Flow Analysis</h1>
            </div>
            <p className="text-muted-foreground">
              Financial analysis for {project?.project_name || 'Project'}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline"
              onClick={handleDownload}
            >
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button 
              variant="outline"
              onClick={handleShare}
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
        
        {/* Filters and Display Controls */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-4">
                <Select 
                  value={selectedBusiness} 
                  onValueChange={setSelectedBusiness}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select Business" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Businesses</SelectItem>
                    {availableBusinesses.map(business => (
                      <SelectItem key={business.id} value={business.id}>
                        {business.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select 
                  value={selectedYear} 
                  onValueChange={setSelectedYear}
                >
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Select Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Years</SelectItem>
                    {availableYears.map(year => (
                      <SelectItem key={year} value={year}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant={displayType === 'table' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setDisplayType('table')}
                >
                  Table
                </Button>
                <Button
                  variant={displayType === 'chart' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setDisplayType('chart')}
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Charts
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Main Content */}
        {displayType === 'table' ? (
          <Card>
            <CardHeader>
              <CardTitle>Financial Data</CardTitle>
              <CardDescription>
                Detailed financial information for {selectedBusiness === 'all' ? 'all businesses' : availableBusinesses.find(b => b.id === selectedBusiness)?.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[180px]">Business</TableHead>
                      <TableHead>Entity Type</TableHead>
                      <TableHead>Year</TableHead>
                      <TableHead className="text-right">Revenue</TableHead>
                      <TableHead className="text-right">Wages</TableHead>
                      <TableHead className="text-right">COGS</TableHead>
                      <TableHead className="text-right">Gross Profit</TableHead>
                      <TableHead className="text-right">Gross Margin</TableHead>
                      <TableHead className="text-right">Other</TableHead>
                      <TableHead className="text-right">Total NOI</TableHead>
                      <TableHead className="text-right">NOM</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.map(business => (
                      business.years?.filter(yearData => selectedYear === 'all' || yearData.year === selectedYear)
                        .map((yearData, yearIndex) => (
                          <TableRow key={`${business.business_id}-${yearData.year}`}>
                            {yearIndex === 0 && (
                              <TableCell rowSpan={selectedYear === 'all' ? business.years?.length || 1 : 1} className="font-medium">
                                {business.business_name || 'Unknown'}
                              </TableCell>
                            )}
                            {yearIndex === 0 && (
                              <TableCell rowSpan={selectedYear === 'all' ? business.years?.length || 1 : 1}>
                                {business.entity_type || 'Unknown'}
                              </TableCell>
                            )}
                            <TableCell>{yearData.year}</TableCell>
                            <TableCell className="text-right font-mono">{formatCurrency(yearData.revenue)}</TableCell>
                            <TableCell className="text-right font-mono">{formatCurrency(yearData.wages)}</TableCell>
                            <TableCell className="text-right font-mono">{formatCurrency(yearData.cogs)}</TableCell>
                            <TableCell className="text-right font-mono">{formatCurrency(yearData.gross_profit)}</TableCell>
                            <TableCell className="text-right font-mono">{formatPercentage(yearData.gross_margin)}</TableCell>
                            <TableCell className="text-right font-mono">{formatCurrency(yearData.other_expenses)}</TableCell>
                            <TableCell className="text-right font-mono">{formatCurrency(yearData.total_noi)}</TableCell>
                            <TableCell className="text-right font-mono">{formatPercentage(yearData.nom)}</TableCell>
                          </TableRow>
                        ))
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            <Tabs defaultValue="revenue">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="revenue">Revenue</TabsTrigger>
                <TabsTrigger value="profit">Gross Profit</TabsTrigger>
                <TabsTrigger value="margin">Margins</TabsTrigger>
                <TabsTrigger value="noi">NOI</TabsTrigger>
              </TabsList>
              
              <TabsContent value="revenue">
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Analysis</CardTitle>
                    <CardDescription>
                      Annual revenue trends for {selectedBusiness === 'all' ? 'all businesses' : availableBusinesses.find(b => b.id === selectedBusiness)?.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartBarChart
                          data={revenueChartData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="year" />
                          <YAxis 
                            tickFormatter={(value) => 
                              new Intl.NumberFormat('en-US', {
                                notation: 'compact',
                                compactDisplay: 'short',
                                style: 'currency',
                                currency: 'USD',
                              }).format(value)
                            }
                          />
                          <Tooltip 
                            formatter={(value) => formatCurrency(value as number)} 
                          />
                          <Legend />
                          {filteredData.map((business, index) => (
                            <Bar 
                              key={business.business_id}
                              dataKey={business.business_name || 'Unknown'} 
                              fill={`hsl(${index * 40}, 70%, 50%)`} 
                            />
                          ))}
                        </RechartBarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="profit">
                <Card>
                  <CardHeader>
                    <CardTitle>Gross Profit Analysis</CardTitle>
                    <CardDescription>
                      Annual gross profit trends for {selectedBusiness === 'all' ? 'all businesses' : availableBusinesses.find(b => b.id === selectedBusiness)?.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartBarChart
                          data={profitChartData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="year" />
                          <YAxis 
                            tickFormatter={(value) => 
                              new Intl.NumberFormat('en-US', {
                                notation: 'compact',
                                compactDisplay: 'short',
                                style: 'currency',
                                currency: 'USD',
                              }).format(value)
                            }
                          />
                          <Tooltip 
                            formatter={(value) => formatCurrency(value as number)} 
                          />
                          <Legend />
                          {filteredData.map((business, index) => (
                            <Bar 
                              key={business.business_id}
                              dataKey={business.business_name || 'Unknown'} 
                              fill={`hsl(${index * 40 + 120}, 70%, 50%)`} 
                            />
                          ))}
                        </RechartBarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="margin">
                <Card>
                  <CardHeader>
                    <CardTitle>Margin Analysis</CardTitle>
                    <CardDescription>
                      Annual margin trends for {selectedBusiness === 'all' ? 'all businesses' : availableBusinesses.find(b => b.id === selectedBusiness)?.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={marginChartData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="year" />
                          <YAxis 
                            tickFormatter={(value) => `${value}%`}
                          />
                          <Tooltip 
                            formatter={(value) => `${value}%`} 
                          />
                          <Legend />
                          {filteredData.map((business, index) => (
                            <Line 
                              key={business.business_id}
                              type="monotone"
                              dataKey={business.business_name || 'Unknown'} 
                              stroke={`hsl(${index * 40 + 200}, 70%, 50%)`} 
                              activeDot={{ r: 8 }}
                            />
                          ))}
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="noi">
                <Card>
                  <CardHeader>
                    <CardTitle>Net Operating Income Analysis</CardTitle>
                    <CardDescription>
                      Annual NOI trends for {selectedBusiness === 'all' ? 'all businesses' : availableBusinesses.find(b => b.id === selectedBusiness)?.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartBarChart
                          data={noiChartData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="year" />
                          <YAxis 
                            tickFormatter={(value) => 
                              new Intl.NumberFormat('en-US', {
                                notation: 'compact',
                                compactDisplay: 'short',
                                style: 'currency',
                                currency: 'USD',
                              }).format(value)
                            }
                          />
                          <Tooltip 
                            formatter={(value) => formatCurrency(value as number)} 
                          />
                          <Legend />
                          {filteredData.map((business, index) => (
                            <Bar 
                              key={business.business_id}
                              dataKey={business.business_name || 'Unknown'} 
                              fill={`hsl(${index * 40 + 280}, 70%, 50%)`} 
                            />
                          ))}
                        </RechartBarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            
            {/* Summary metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {filteredData.map((business) => {
                if (!business.years || business.years.length === 0) {
                  return null;
                }
                
                // Calculate averages across years
                const yearCount = business.years.length;
                const avgRevenue = business.years.reduce((sum, y) => sum + y.revenue, 0) / yearCount;
                const avgProfit = business.years.reduce((sum, y) => sum + y.gross_profit, 0) / yearCount;
                const avgMargin = business.years.reduce((sum, y) => sum + y.gross_margin, 0) / yearCount;
                const avgNOI = business.years.reduce((sum, y) => sum + y.total_noi, 0) / yearCount;
                
                return (
                  <Card key={business.business_id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        {business.business_name || 'Unknown Business'}
                      </CardTitle>
                      <CardDescription className="text-xs">
                        {business.entity_type || 'Unknown Type'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <dl className="grid grid-cols-2 gap-1 text-sm">
                        <dt className="text-muted-foreground">Avg. Revenue:</dt>
                        <dd className="text-right font-mono font-medium">{formatCurrency(avgRevenue)}</dd>
                        
                        <dt className="text-muted-foreground">Avg. Profit:</dt>
                        <dd className="text-right font-mono font-medium">{formatCurrency(avgProfit)}</dd>
                        
                        <dt className="text-muted-foreground">Avg. Margin:</dt>
                        <dd className="text-right font-mono font-medium">{formatPercentage(avgMargin)}</dd>
                        
                        <dt className="text-muted-foreground">Avg. NOI:</dt>
                        <dd className="text-right font-mono font-medium">{formatCurrency(avgNOI)}</dd>
                      </dl>
                    </CardContent>
                  </Card>
                );
              }).filter(Boolean)}
            </div>
          </div>
        )}
      </motion.div>
    </Layout>
  );
};

export default CashFlowAnalysis;
