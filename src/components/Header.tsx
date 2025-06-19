
import React from 'react';
import { useNavigate, useLocation, useParams, useSearchParams } from 'react-router-dom';
import { Search, User, Settings, ChevronDown, Building2, UserCircle, FileText, FolderOpen, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { getProjectById } from '@/services';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [searchParams] = useSearchParams();
  const userRole = localStorage.getItem('userRole') || 'bank_officer';
  
  // Get project data for accurate breadcrumbs
  const { data: project } = useQuery({
    queryKey: ['project', params.projectId],
    queryFn: () => getProjectById(params.projectId || ''),
    enabled: !!params.projectId
  });
  
  const generateBreadcrumbs = () => {
    const paths = location.pathname.split('/').filter(Boolean);
    if (paths.length === 0) return null;
    
    const breadcrumbs = [];
    
    // Always start with Home
    breadcrumbs.push(
      <BreadcrumbItem key="home">
        <BreadcrumbLink onClick={() => navigate('/')} className="flex items-center gap-1 cursor-pointer">
          <FolderOpen className="h-3 w-3" />
          Home
        </BreadcrumbLink>
      </BreadcrumbItem>
    );
    
    // Handle specific route patterns
    if (paths[0] === 'projects') {
      breadcrumbs.push(
        <BreadcrumbSeparator key="sep-projects" />,
        <BreadcrumbItem key="projects">
          <BreadcrumbPage className="flex items-center gap-1">
            <Building2 className="h-3 w-3" />
            Projects
          </BreadcrumbPage>
        </BreadcrumbItem>
      );
      return (
        <Breadcrumb className="hidden md:flex">
          <BreadcrumbList>{breadcrumbs}</BreadcrumbList>
        </Breadcrumb>
      );
    }
    
    // Handle project-related pages
    if (params.projectId && project) {
      breadcrumbs.push(
        <BreadcrumbSeparator key="sep-projects" />,
        <BreadcrumbItem key="projects">
          <BreadcrumbLink onClick={() => navigate('/projects')} className="flex items-center gap-1 cursor-pointer">
            <Building2 className="h-3 w-3" />
            Projects
          </BreadcrumbLink>
        </BreadcrumbItem>,
        <BreadcrumbSeparator key="sep-project" />,
        <BreadcrumbItem key="project">
          <BreadcrumbLink onClick={() => navigate(`/project/${params.projectId}`)} className="flex items-center gap-1 cursor-pointer">
            <Building2 className="h-3 w-3" />
            {project.project_name}
          </BreadcrumbLink>
        </BreadcrumbItem>
      );
      
      // Add specific page breadcrumbs based on current route
      if (paths.includes('business')) {
        breadcrumbs.push(
          <BreadcrumbSeparator key="sep-business" />,
          <BreadcrumbItem key="business">
            <BreadcrumbPage className="flex items-center gap-1">
              <Building2 className="h-3 w-3" />
              Business Information
            </BreadcrumbPage>
          </BreadcrumbItem>
        );
      } else if (paths.includes('participants')) {
        breadcrumbs.push(
          <BreadcrumbSeparator key="sep-participants" />,
          <BreadcrumbItem key="participants">
            {params.participantId ? (
              <BreadcrumbLink onClick={() => navigate(`/project/participants/${params.projectId}`)} className="flex items-center gap-1 cursor-pointer">
                <UserCircle className="h-3 w-3" />
                Participants
              </BreadcrumbLink>
            ) : (
              <BreadcrumbPage className="flex items-center gap-1">
                <UserCircle className="h-3 w-3" />
                Participants
              </BreadcrumbPage>
            )}
          </BreadcrumbItem>
        );
        
        if (params.participantId) {
          breadcrumbs.push(
            <BreadcrumbSeparator key="sep-participant" />,
            <BreadcrumbItem key="participant">
              <BreadcrumbPage className="flex items-center gap-1">
                <UserCircle className="h-3 w-3" />
                Personal Information
              </BreadcrumbPage>
            </BreadcrumbItem>
          );
        }
      } else if (paths.includes('use-of-proceeds')) {
        breadcrumbs.push(
          <BreadcrumbSeparator key="sep-proceeds" />,
          <BreadcrumbItem key="proceeds">
            <BreadcrumbPage className="flex items-center gap-1">
              <FileText className="h-3 w-3" />
              Use of Proceeds
            </BreadcrumbPage>
          </BreadcrumbItem>
        );
      } else if (paths.includes('cash-flow')) {
        breadcrumbs.push(
          <BreadcrumbSeparator key="sep-cashflow" />,
          <BreadcrumbItem key="cashflow">
            <BreadcrumbPage className="flex items-center gap-1">
              <FileText className="h-3 w-3" />
              Cash Flow Analysis
            </BreadcrumbPage>
          </BreadcrumbItem>
        );
      } else if (paths.includes('analysis')) {
        breadcrumbs.push(
          <BreadcrumbSeparator key="sep-analysis" />,
          <BreadcrumbItem key="analysis">
            <BreadcrumbPage className="flex items-center gap-1">
              <FileText className="h-3 w-3" />
              Analysis
            </BreadcrumbPage>
          </BreadcrumbItem>
        );
      } else if (paths.includes('documentation')) {
        breadcrumbs.push(
          <BreadcrumbSeparator key="sep-docs" />,
          <BreadcrumbItem key="docs">
            <BreadcrumbPage className="flex items-center gap-1">
              <FileText className="h-3 w-3" />
              Documentation
            </BreadcrumbPage>
          </BreadcrumbItem>
        );
      } else if (paths.includes('loan')) {
        breadcrumbs.push(
          <BreadcrumbSeparator key="sep-loan" />,
          <BreadcrumbItem key="loan">
            <BreadcrumbPage className="flex items-center gap-1">
              <FileText className="h-3 w-3" />
              Loan Details
            </BreadcrumbPage>
          </BreadcrumbItem>
        );
      }
      
      return (
        <Breadcrumb className="hidden md:flex">
          <BreadcrumbList>{breadcrumbs}</BreadcrumbList>
        </Breadcrumb>
      );
    }
    
    // Handle form pages
    if (paths[0] === 'form') {
      const formName = searchParams.get('name') || 'Form';
      const participantName = searchParams.get('participant') || 'Participant';
      
      breadcrumbs.push(
        <BreadcrumbSeparator key="sep-form" />,
        <BreadcrumbItem key="form">
          <BreadcrumbPage className="flex items-center gap-1">
            <FileText className="h-3 w-3" />
            {formName} - {participantName}
          </BreadcrumbPage>
        </BreadcrumbItem>
      );
      
      return (
        <Breadcrumb className="hidden md:flex">
          <BreadcrumbList>{breadcrumbs}</BreadcrumbList>
        </Breadcrumb>
      );
    }
    
    // Handle admin/settings pages
    if (paths[0] === 'admin-settings') {
      breadcrumbs.push(
        <BreadcrumbSeparator key="sep-admin" />,
        <BreadcrumbItem key="admin">
          <BreadcrumbPage className="flex items-center gap-1">
            <Settings className="h-3 w-3" />
            Admin Settings
          </BreadcrumbPage>
        </BreadcrumbItem>
      );
    } else if (paths[0] === 'lender-settings') {
      breadcrumbs.push(
        <BreadcrumbSeparator key="sep-lender" />,
        <BreadcrumbItem key="lender">
          <BreadcrumbPage className="flex items-center gap-1">
            <Settings className="h-3 w-3" />
            Lender Settings
          </BreadcrumbPage>
        </BreadcrumbItem>
      );
    }
    
    return (
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>{breadcrumbs}</BreadcrumbList>
      </Breadcrumb>
    );
  };
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="h-14 flex items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          {generateBreadcrumbs()}
        </div>
        
        <div className="flex items-center gap-3">
          {/* Consolidated settings dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span className="hidden md:inline">Settings</span>
                <ChevronDown className="h-3 w-3 opacity-70" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigate('/admin-settings')}>
                Application Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/lender-settings')}>
                Lender Settings
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary/80 transition-colors">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <User className="h-4 w-4" />
                </motion.div>
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem className="text-sm">
                Signed in as <strong>{userRole === 'bank_officer' ? 'Bank User' : userRole === 'buyer' ? 'Buyer' : 'Seller'}</strong>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/profile')}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/settings')}>
                Settings
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/')} className="text-destructive focus:text-destructive">
                Change Role
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
