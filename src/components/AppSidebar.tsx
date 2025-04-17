
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Building2,
  Users,
  BarChart3,
  FileText,
  Home,
  Menu,
  LayoutDashboard,
  FilePlus,
  UserCircle
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from './ui/button';

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole') || 'bank_officer';
  
  // Check if the current path matches or starts with the given path
  const isActivePath = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };
  
  return (
    <Sidebar>
      <SidebarHeader className="flex items-center gap-2 px-4 py-3">
        <Building2 className="h-6 w-6 text-primary" />
        <span className="text-lg font-semibold">Project Sphere</span>
        <div className="ml-auto md:hidden">
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={isActivePath('/projects')}
                  onClick={() => navigate('/projects')}
                  tooltip="All Projects"
                >
                  <LayoutDashboard className="h-5 w-5" />
                  <span>Projects</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={isActivePath('/create-project')}
                  onClick={() => navigate('/create-project')}
                  tooltip="Create New Project"
                >
                  <FilePlus className="h-5 w-5" />
                  <span>New Project</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        {userRole === 'bank_officer' && (
          <SidebarGroup>
            <SidebarGroupLabel>Bank Resources</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => navigate('/users')}
                    isActive={isActivePath('/users')}
                    tooltip="Manage Users"
                  >
                    <Users className="h-5 w-5" />
                    <span>Users</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => navigate('/analytics')}
                    isActive={isActivePath('/analytics')}
                    tooltip="Analytics Dashboard"
                  >
                    <BarChart3 className="h-5 w-5" />
                    <span>Analytics</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => navigate('/documents')}
                    isActive={isActivePath('/documents')}
                    tooltip="Document Templates"
                  >
                    <FileText className="h-5 w-5" />
                    <span>Templates</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <Button 
          variant="outline" 
          className="w-full justify-start"
          onClick={() => navigate("/")}
        >
          <UserCircle className="mr-2 h-4 w-4" />
          Change Role
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
