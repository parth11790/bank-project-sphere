
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, UserCircle, Store } from 'lucide-react';

const Index: React.FC = () => {
  const navigate = useNavigate();
  
  const handleRoleSelection = (role: string) => {
    // Simply navigate to projects page with the selected role
    navigate('/projects');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <div className="text-center mb-8">
          <div className="flex justify-center">
            <div className="rounded-full bg-primary/10 p-3 mb-3">
              <Building2 className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold">Bank Project Sphere</h1>
          <p className="text-muted-foreground">Choose your role to continue</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Select Role</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                variant="outline" 
                size="lg" 
                className="flex flex-col items-center h-auto p-6 gap-3"
                onClick={() => handleRoleSelection('bank_officer')}
              >
                <Building2 className="h-10 w-10" />
                <span className="text-lg">Bank User</span>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="flex flex-col items-center h-auto p-6 gap-3"
                onClick={() => handleRoleSelection('buyer')}
              >
                <UserCircle className="h-10 w-10" />
                <span className="text-lg">Buyer</span>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="flex flex-col items-center h-auto p-6 gap-3"
                onClick={() => handleRoleSelection('seller')}
              >
                <Store className="h-10 w-10" />
                <span className="text-lg">Seller</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Index;
