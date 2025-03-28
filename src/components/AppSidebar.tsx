
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Building2,
  BarChart3,
  Users as UsersIcon,
  FileText,
  Home,
  CreditCard,
  Menu
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
  
  const mainMenuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: Home,
    },
    {
      title: "Projects",
      path: "/projects",
      icon: Building2,
    },
    {
      title: "Participants",
      path: "/participants",
      icon: UsersIcon,
    },
  ];
  
  const analysisMenuItems = [
    {
      title: "Cash Flow Analysis",
      path: "/cash-flow-analysis",
      icon: BarChart3,
    },
    {
      title: "Use of Proceeds",
      path: "/use-of-proceeds",
      icon: CreditCard,
    },
    {
      title: "Forms & Documents",
      path: "/forms",
      icon: FileText,
    },
  ];
  
  return (
    <Sidebar>
      <SidebarHeader className="flex items-center gap-2 px-4 py-2">
        <Building2 className="h-6 w-6 text-primary" />
        <span className="text-lg font-bold">Bank Project Sphere</span>
        <div className="ml-auto md:hidden">
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    isActive={location.pathname === item.path}
                    onClick={() => navigate(item.path)}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Analysis</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {analysisMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    isActive={location.pathname === item.path}
                    onClick={() => navigate(item.path)}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <Button 
          variant="outline" 
          className="w-full justify-start"
          onClick={() => navigate("/")}
        >
          <Menu className="mr-2 h-4 w-4" />
          Change Role
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
