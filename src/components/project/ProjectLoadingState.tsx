
import React from 'react';
import Layout from '@/components/Layout';
import { Skeleton } from '@/components/ui/skeleton';

const ProjectLoadingState: React.FC = () => {
  return (
    <Layout>
      <div className="grid gap-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-10 w-24" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-32 md:col-span-2" />
          <Skeleton className="h-32" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>
      </div>
    </Layout>
  );
};

export default ProjectLoadingState;
