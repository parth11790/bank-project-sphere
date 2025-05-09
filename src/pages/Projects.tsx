import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProjectList from '@/components/ProjectList';
import { getProjects } from '@/services';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { Project } from '@/types/project';
import Layout from '@/components/Layout';
import { Plus, SlidersHorizontal } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import ProjectStatusCards from '@/components/dashboard/ProjectStatusCards';
const Projects: React.FC = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const {
    data: projects,
    isLoading
  } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects
  });
  if (isLoading) {
    return <Layout>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <Skeleton className="h-8 w-40 mb-1" />
            <div className="flex gap-2">
              <Skeleton className="h-9 w-32" />
              <Skeleton className="h-9 w-24" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <Skeleton className="h-20" />
            <Skeleton className="h-20" />
            <Skeleton className="h-20" />
            <Skeleton className="h-20" />
          </div>
          
          <Skeleton className="h-[400px] w-full" />
        </div>
      </Layout>;
  }
  const projectsArray = Array.isArray(projects) ? projects as Project[] : [];
  const filteredProjects = statusFilter === "all" ? projectsArray : projectsArray.filter(project => project.status === statusFilter);
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    const dateA = new Date(a.created_at).getTime();
    const dateB = new Date(b.created_at).getTime();
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  // Project statistics for dashboard cards
  const totalProjects = projectsArray.length;
  const activeProjects = projectsArray.filter(project => project.status === 'active').length;
  const pendingProjects = projectsArray.filter(project => project.status === 'pending').length;
  const totalValue = projectsArray.reduce((sum, project) => sum + (project.loan_amount || 0), 0);
  return <Layout>
      <motion.div className="space-y-6" initial={{
      opacity: 0,
      y: 10
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.3
    }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-1">Projects</h1>
            <p className="text-sm text-muted-foreground">Manage and track all your projects</p>
          </div>
          
          <Button onClick={() => navigate('/create-project')} className="sm:w-auto w-full">
            <Plus className="mr-2 h-4 w-4" /> New Project
          </Button>
        </div>
        
        <ProjectStatusCards totalProjects={totalProjects} activeProjects={activeProjects} pendingProjects={pendingProjects} totalValue={totalValue} />

        <div className="flexitems-center justify-between mb">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortOrder} onValueChange={value => setSortOrder(value as 'asc' | 'desc')}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desc">Newest First</SelectItem>
              <SelectItem value="asc">Oldest First</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <ProjectList projects={sortedProjects} />
      </motion.div>
    </Layout>;
};
export default Projects;