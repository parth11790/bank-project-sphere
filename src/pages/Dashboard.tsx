
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import ProjectCard from '@/components/ProjectCard';
import { useToast } from '@/hooks/use-toast';
import { projects, users, getUseOfProceedsForProject } from '@/lib/mockData';
import { ArrowRight, ArrowUpRight, BarChart3, Building2, Users as UsersIcon, CreditCard, Calendar, ChevronUp, ChevronDown } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { toast } = useToast();
  const recentProjects = projects.slice(0, 3);
  const totalProjectValue = projects.reduce((sum, project) => sum + project.loan_amount, 0);
  const formattedTotalValue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(totalProjectValue);

  const handleEdit = (projectId: string) => {
    toast({
      title: "Edit Project",
      description: `Editing project ${projectId} (Demo only)`,
    });
  };

  const handleDelete = (projectId: string) => {
    toast({
      title: "Delete Project",
      description: `Deleting project ${projectId} (Demo only)`,
      variant: "destructive",
    });
  };

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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
            <p className="text-muted-foreground">An overview of your banking projects and activities</p>
          </motion.div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden border-border/50 hover-lift">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="p-2 w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                        <stat.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className={`flex items-center text-xs font-medium ${stat.positive ? 'text-green-500' : 'text-red-500'}`}>
                        {stat.positive ? <ChevronUp className="h-3 w-3 mr-1" /> : <ChevronDown className="h-3 w-3 mr-1" />}
                        {stat.change}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold mb-1">{stat.value}</div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Recent Projects Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="h-full border-border/50">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Recent Projects</CardTitle>
                      <CardDescription>Your latest banking projects</CardDescription>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to="/projects" className="flex items-center gap-1">
                        View All <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {recentProjects.map((project, index) => (
                      <motion.div
                        key={project.project_id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                      >
                        <Link to={`/project/${project.project_id}`}>
                          <ProjectCard
                            project={project}
                            onEdit={() => handleEdit(project.project_id)}
                            onDelete={() => handleDelete(project.project_id)}
                          />
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Card className="h-full border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle>Portfolio Summary</CardTitle>
                  <CardDescription>Current loan portfolio analysis</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col h-[calc(100%-80px)] justify-between">
                  <div className="flex-1 flex items-center justify-center">
                    <div className="w-full h-64 relative flex items-center justify-center bg-muted/30 rounded-lg">
                      <BarChart3 className="h-16 w-16 text-muted-foreground/50" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Chart visualization</p>
                          <p className="text-xs text-muted-foreground/70">(Demo only)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="bg-muted/30 rounded-lg p-3">
                      <div className="text-sm text-muted-foreground mb-1">Projects</div>
                      <div className="text-2xl font-bold">{projects.length}</div>
                    </div>
                    <div className="bg-primary/10 rounded-lg p-3">
                      <div className="text-sm text-primary/80 mb-1">Total Value</div>
                      <div className="text-xl font-bold text-primary">{formattedTotalValue}</div>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full mt-6" asChild>
                    <Link to="/use-of-proceeds" className="flex items-center justify-center gap-1">
                      Financial Details <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
