
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectList from '@/components/ProjectList';
import { getProjects } from '@/services';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { Project } from '@/types/project';
import Layout from '@/components/Layout';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

const Projects: React.FC = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <Skeleton className="h-8 w-40 mb-1" />
              <Skeleton className="h-4 w-64" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-9 w-32" />
              <Skeleton className="h-9 w-24" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Skeleton className="h-20" />
            <Skeleton className="h-20" />
            <Skeleton className="h-20" />
          </div>
          
          <Skeleton className="h-96 w-full" />
        </div>
      </Layout>
    );
  }
  
  const projectsArray = Array.isArray(projects) ? projects as Project[] : [];
  
  const filteredProjects = statusFilter === "all" 
    ? projectsArray 
    : projectsArray.filter(project => project.status === statusFilter);
  
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    const dateA = new Date(a.created_at).getTime();
    const dateB = new Date(b.created_at).getTime();
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });
  
  const totalProjects = projectsArray.length;
  const activeProjects = projectsArray.filter(project => project.status === 'active').length;
  const pendingProjects = projectsArray.filter(project => project.status === 'pending').length;
  
  const formattedTotalValue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(projectsArray.reduce((sum, project) => sum + (project.loan_amount || 0), 0));
  
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-medium mb-1">Projects</h1>
          <p className="text-sm text-muted-foreground">Manage and track all your projects</p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Card className="border-border/30">
            <CardContent className="p-3">
              <p className="text-xs text-muted-foreground mb-1">Total Projects</p>
              <p className="text-lg font-medium">{totalProjects}</p>
            </CardContent>
          </Card>
          
          <Card className="border-border/30">
            <CardContent className="p-3">
              <p className="text-xs text-muted-foreground mb-1">Active</p>
              <p className="text-lg font-medium">{activeProjects}</p>
            </CardContent>
          </Card>
          
          <Card className="border-border/30">
            <CardContent className="p-3">
              <p className="text-xs text-muted-foreground mb-1">Pending</p>
              <p className="text-lg font-medium">{pendingProjects}</p>
            </CardContent>
          </Card>
          
          <Card className="border-border/30">
            <CardContent className="p-3">
              <p className="text-xs text-muted-foreground mb-1">Total Value</p>
              <p className="text-lg font-medium">{formattedTotalValue}</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex justify-end">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <ProjectList projects={sortedProjects} />
      </div>
    </Layout>
  );
};

export default Projects;
