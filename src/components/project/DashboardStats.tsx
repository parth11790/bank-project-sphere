
import React from 'react';
import { Users, FileText, ClipboardCheck } from 'lucide-react';
import StatCard from './StatCard';

interface DashboardStatsProps {
  buyersCount: number;
  sellersCount: number;
  documents: {
    total: number;
    completed: number;
  };
  forms: {
    total: number;
    completed: number;
  };
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ 
  buyersCount, 
  sellersCount, 
  documents, 
  forms 
}) => {
  const documentsProgress = (documents.completed / documents.total) * 100;
  const formsProgress = (forms.completed / forms.total) * 100;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard 
        title="Participants"
        value={`${buyersCount + sellersCount}`}
        description={`${buyersCount} Buyers, ${sellersCount} Sellers`}
        icon={<Users className="h-4 w-4" />}
      />
      <StatCard 
        title="Documents"
        value={`${documents.completed}/${documents.total}`}
        description="Documents uploaded"
        icon={<FileText className="h-4 w-4" />}
        progress={documentsProgress}
      />
      <StatCard 
        title="Forms"
        value={`${forms.completed}/${forms.total}`}
        description="Forms completed"
        icon={<ClipboardCheck className="h-4 w-4" />}
        progress={formsProgress}
      />
    </div>
  );
};

export default DashboardStats;
