
import React from 'react';
import { 
  Building2, 
  Users as UsersIcon, 
  CreditCard, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
  AlertCircle,
  ChevronRight
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProjects } from '@/services';
import { users } from '@/lib/mockData';
import { Skeleton } from '@/components/ui/skeleton';
import { Project, getLoanAmount } from '@/types/project';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import StatCard from '@/components/dashboard/StatCard';
import RecentProjects from '@/components/dashboard/RecentProjects';
import PortfolioSummary from '@/components/dashboard/PortfolioSummary';
import { Progress } from '@/components/ui/progress';
import { PortfolioGrowthChart } from '@/components/dashboard/PortfolioGrowthChart';
import { ProjectStatusChart } from '@/components/dashboard/ProjectStatusChart';
import { PendingTasksList } from '@/components/dashboard/PendingTasksList';
import { ProjectProgressList } from '@/components/dashboard/ProjectProgressList';

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
          <PortfolioGrowthChart monthlyData={monthlyData} className="lg:col-span-2" />
          <ProjectStatusChart statusData={statusData} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <RecentProjects projects={recentProjects} className="lg:col-span-2" />
          <PendingTasksList tasks={pendingTasks} onViewAll={() => navigate('/tasks')} />
        </div>

        <ProjectProgressList projects={recentProjects} />
      </motion.div>
    </Layout>
  );
};

export default Dashboard;
