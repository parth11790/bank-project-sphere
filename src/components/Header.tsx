
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userRole = localStorage.getItem('userRole') || 'bank_officer';
  
  // Generate breadcrumbs based on current path
  const generateBreadcrumbs = () => {
    const paths = location.pathname.split('/').filter(Boolean);
    if (paths.length === 0) return null;
    
    return (
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <a onClick={() => navigate('/')}>Home</a>
            </BreadcrumbLink>
          </BreadcrumbItem>
          
          {paths.map((path, index) => {
            // Convert path to readable format
            const formattedPath = path
              .split('-')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');
            
            // Build the full path up to this point
            const fullPath = `/${paths.slice(0, index + 1).join('/')}`;
            
            // If it's the last item, it's the current page
            if (index === paths.length - 1) {
              return (
                <React.Fragment key={path}>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{formattedPath}</BreadcrumbPage>
                  </BreadcrumbItem>
                </React.Fragment>
              );
            }
            
            return (
              <React.Fragment key={path}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <a onClick={() => navigate(fullPath)}>{formattedPath}</a>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    );
  };
  
  return (
    <header className="w-full border-b border-border/40 bg-background/95 backdrop-blur-sm">
      <div className="h-14 flex items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          {generateBreadcrumbs()}
        </div>
        
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 w-[200px] rounded-full bg-secondary/50"
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-4 w-4" />
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
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
              <DropdownMenuItem onClick={() => navigate('/')}>
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
