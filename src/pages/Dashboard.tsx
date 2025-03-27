
import React from 'react';
import Header from '@/components/Header';
import { projects, users } from '@/lib/mockData';
import { Building2, Users as UsersIcon, CreditCard, Calendar } from 'lucide-react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import StatCard from '@/components/dashboard/StatCard';
import RecentProjects from '@/components/dashboard/RecentProjects';
import PortfolioSummary from '@/components/dashboard/PortfolioSummary';

const Dashboard: React.FC = () => {
  const recentProjects = projects.slice(0, 3);
  const totalProjectValue = projects.reduce((sum, project) => sum + project.loan_amount, 0);
  const formattedTotalValue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(totalProjectValue);

  const stats = [
    {
      title: "Total Projects",
      value: projects.length,
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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-6 px-4 md:px-6 max-w-6xl">
        <div className="flex flex-col gap-6">
          <DashboardHeader />

          {/* Stats Section */}
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

          {/* Projects and Portfolio Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <RecentProjects projects={recentProjects} />
            <PortfolioSummary 
              projectsCount={projects.length} 
              formattedTotalValue={formattedTotalValue} 
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
