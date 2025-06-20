
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, UserCircle, Store, Settings as SettingsIcon } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const Index: React.FC = () => {
  const navigate = useNavigate();
  
  const handleRoleSelection = (role: string) => {
    localStorage.setItem('userRole', role);
    toast.success(`Logged in as ${role === 'bank_officer' ? 'Lender Experience' : role === 'buyer' ? 'Buyer' : role === 'seller' ? 'Seller' : 'Admin'}`);
    
    if (role === 'admin_settings') {
      navigate('/admin-settings');
    } else if (role === 'lender_settings') {
      navigate('/lender-settings');
    } else {
      navigate('/projects');
    }
  };

  const roleOptions = [
    {
      id: 'bank_officer',
      title: 'Lender Experience',
      icon: Building2,
      description: 'Manage loan projects and underwriting'
    },
    {
      id: 'admin_settings',
      title: 'Admin Settings',
      icon: SettingsIcon,
      description: 'Configure application-wide settings'
    },
    {
      id: 'lender_settings',
      title: 'Lender Settings',
      icon: SettingsIcon,
      description: 'Manage loan settings and requirements'
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div 
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Project <span className="text-primary">Sphere</span>
          </h1>
          <p className="text-sm text-muted-foreground">Select your role to continue</p>
        </div>
        
        <Card className="border-border/30 overflow-hidden">
          <CardContent className="p-0">
            {roleOptions.map((role, index) => (
              <Button 
                key={role.id}
                variant="ghost" 
                className={`w-full justify-start h-auto py-4 px-6 text-left rounded-none ${index !== roleOptions.length - 1 ? 'border-b border-border/20' : ''}`}
                onClick={() => handleRoleSelection(role.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <role.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{role.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{role.description}</p>
                  </div>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>
        
        <p className="text-center text-xs text-muted-foreground mt-8">
          © {new Date().getFullYear()} Project Sphere. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
};

export default Index;
