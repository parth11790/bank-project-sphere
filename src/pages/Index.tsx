
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, UserCircle, Store } from 'lucide-react';
import { toast } from 'sonner';

const Index: React.FC = () => {
  const navigate = useNavigate();
  
  const handleRoleSelection = (role: string) => {
    localStorage.setItem('userRole', role);
    toast.success(`Logged in as ${role === 'bank_officer' ? 'Bank User' : role === 'buyer' ? 'Buyer' : 'Seller'}`);
    navigate('/projects');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-medium mb-2">Project Sphere</h1>
          <p className="text-sm text-muted-foreground">Select your role to continue</p>
        </div>
        
        <Card className="border-border/30">
          <CardContent className="p-6 space-y-4">
            <Button 
              variant="outline" 
              className="w-full justify-start h-12 text-base"
              onClick={() => handleRoleSelection('bank_officer')}
            >
              <Building2 className="h-5 w-5 mr-3" />
              <span>Bank User</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start h-12 text-base"
              onClick={() => handleRoleSelection('buyer')}
            >
              <UserCircle className="h-5 w-5 mr-3" />
              <span>Buyer</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start h-12 text-base"
              onClick={() => handleRoleSelection('seller')}
            >
              <Store className="h-5 w-5 mr-3" />
              <span>Seller</span>
            </Button>
          </CardContent>
        </Card>
        
        <p className="text-center text-xs text-muted-foreground mt-8">
          © {new Date().getFullYear()} Project Sphere. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Index;
