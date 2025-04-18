
import React from 'react';
import Layout from '@/components/Layout';
import { DropdownManager } from '@/components/admin/DropdownManager';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const AdminSettings = () => {
  const navigate = useNavigate();
  
  return (
    <Layout>
      <div className="container mx-auto py-6 space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/settings')}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">Admin Settings</h1>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold">Dropdown Values Management</h2>
            <p className="text-muted-foreground">
              Manage the values available in various dropdown menus throughout the application
            </p>
          </div>
          <DropdownManager />
        </div>
      </div>
    </Layout>
  );
};

export default AdminSettings;
