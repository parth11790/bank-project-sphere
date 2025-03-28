import React from 'react';
import { 
  Building2, 
  Users as UsersIcon, 
  CreditCard, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
  AlertCircle
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { getProjects } from '@/services';
import { users } from '@/lib/mockData';
import { Skeleton } from '@/components/ui/skeleton';
import { Project, LoanType, getLoanAmount } from '@/types/project';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import StatCard from '@/components/dashboard/StatCard';
import RecentProjects from '@/components/dashboard/RecentProjects';
import PortfolioSummary from '@/components/dashboard/PortfolioSummary';
import { Progress } from '@/components/ui/progress';
import { 
  ChartContainer, 
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent 
} from '@/components/ui/chart';
import { 
  Area, 
  AreaChart, 
  CartesianGrid, 
  ResponsiveContainer, 
  Line, 
  LineChart, 
  XAxis, 
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { data: projects, isLoading: projectsLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects
  });
  
  if (projectsLoading) {
    return (
      <Layout>
        <div className="flex flex-col gap-6">
          <DashboardHeader />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Skeleton className="h-60 w-full lg:col-span-2" />
            <Skeleton className="h-60 w-full" />
          </div>
        </div>
      </Layout>
    );
  }
  
  const projectsArray = (projects || []) as Project[];
  const recentProjects = projectsArray.slice(0, 3);
  
  const totalProjectValue = projectsArray.reduce((sum, project) => {
    return sum + project.loan_types.reduce((loanSum, loan) => {
      return loanSum + getLoanAmount(loan);
    }, 0);
  }, 0);
  
  const formattedTotalValue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(totalProjectValue);

  const stats = [
    {
      title: "Total Projects",
      value: projectsArray.length,
      icon: Building2,
      change: "+12%",
      positive: true,
    },
    {
      title: "Active Users",
      value: users.length,
      icon: UsersIcon,
      change: "+5%",
      positive: true,
    },
    {
      title: "Total Portfolio Value",
      value: formattedTotalValue,
      icon: CreditCard,
      change: "+18%",
      positive: true,
    },
    {
      title: "Upcoming Deadlines",
      value: "3",
      icon: Calendar,
      change: "-2",
      positive: false,
    },
  ];

  const monthlyData = [
    { name: 'Jan', value: 400000 },
    { name: 'Feb', value: 600000 },
    { name: 'Mar', value: 500000 },
    { name: 'Apr', value: 700000 },
    { name: 'May', value: 900000 },
    { name: 'Jun', value: 800000 },
    { name: 'Jul', value: 1100000 },
    { name: 'Aug', value: totalProjectValue },
  ];

  const statusData = [
    { name: 'Active', value: 4 },
    { name: 'Pending', value: 2 },
    { name: 'Completed', value: 1 },
  ];
  
  const COLORS = ['#0088FE', '#FFBB28', '#00C49F'];

  const pendingTasks = [
    { id: 1, title: "Review Downtown Office Purchase", dueDate: "Today", priority: "High" },
    { id: 2, title: "Sign Restaurant Expansion Documents", dueDate: "Tomorrow", priority: "Medium" },
    { id: 3, title: "Approve Equipment Financing", dueDate: "Aug 21", priority: "Low" },
  ];

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-6"
      >
        <DashboardHeader />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              change={stat.change}
              positive={stat.positive}
              index={index}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Portfolio Growth</CardTitle>
              <CardDescription>Monthly portfolio value in USD</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer 
                config={{
                  area: { label: "Portfolio Value" },
                  grid: {}
                }}
                className="h-80"
              >
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" />
                  <YAxis 
                    tickFormatter={(value) => 
                      new Intl.NumberFormat('en-US', {
                        notation: 'compact',
                        compactDisplay: 'short',
                        currency: 'USD',
                        style: 'currency'
                      }).format(value)
                    }
                  />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip 
                    formatter={(value) => 
                      new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      }).format(value as number)
                    }
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#8884d8" 
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Project Status</CardTitle>
              <CardDescription>Distribution by status</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <PieChart width={200} height={200}>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <RecentProjects projects={recentProjects} className="lg:col-span-2" />
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Pending Tasks</CardTitle>
              <CardDescription>Tasks requiring your attention</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              {pendingTasks.map((task) => (
                <div key={task.id} className="flex items-start gap-4 rounded-lg border p-3">
                  <div className={`mt-0.5 rounded-full p-1 ${
                    task.priority === 'High' ? 'bg-destructive/20 text-destructive' :
                    task.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-500' :
                    'bg-green-500/20 text-green-500'
                  }`}>
                    {task.priority === 'High' ? (
                      <AlertCircle className="h-4 w-4" />
                    ) : task.priority === 'Medium' ? (
                      <Clock className="h-4 w-4" />
                    ) : (
                      <Calendar className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{task.title}</p>
                    <div className="flex items-center pt-2">
                      <Calendar className="mr-1 h-3 w-3 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">Due: {task.dueDate}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => navigate('/tasks')}>
                View All Tasks
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Completion Progress</CardTitle>
              <CardDescription>Overall completion status of active projects</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {recentProjects.map((project, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{project.project_name}</p>
                      <p className="text-xs text-muted-foreground">
                        {Math.floor(Math.random() * 40) + 60}% complete
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => navigate(`/project/${project.project_id}`)}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <Progress value={Math.floor(Math.random() * 40) + 60} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </Layout>
  );
};

export default Dashboard;
