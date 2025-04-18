
import React from 'react';
import Layout from '@/components/Layout';
import { DropdownManager } from '@/components/admin/DropdownManager';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const AdminSettings = () => {
  const navigate = useNavigate();
  
  return (
    <Layout>
      <div className="container mx-auto py-6 space-y-6">
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
        
        <div className="grid gap-6">
          <DropdownManager />
        </div>
      </div>
    </Layout>
  );
};

export default AdminSettings;
