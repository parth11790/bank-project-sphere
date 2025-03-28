
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Building2, LogOut, Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from '@/contexts/AuthContext';

const Header: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Link to="/projects" className="flex items-center gap-2">
            <Building2 className="h-6 w-6" />
            <span className="text-xl font-bold tracking-tight">Bank Project Sphere</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/projects" className="text-sm font-medium transition-colors hover:text-primary">
            Projects
          </Link>
          {user && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          )}
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <Link to="/projects" className="flex items-center gap-2 mt-4" onClick={() => setOpen(false)}>
              <Building2 className="h-6 w-6" />
              <span className="text-xl font-bold tracking-tight">Bank Project Sphere</span>
            </Link>
            <div className="mt-8 flex flex-col gap-4">
              <Link 
                to="/projects"
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setOpen(false)}
              >
                Projects
              </Link>
              {user && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                  className="justify-start px-0 text-sm font-medium transition-colors hover:text-primary flex items-center gap-1"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
