
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Settings, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const HeaderActions: React.FC = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole') || 'bank_officer';

  return (
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
  );
};

export default HeaderActions;
