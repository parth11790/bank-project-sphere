
import { ParticipantWithDetails } from './participant';

export interface ParticipantProgress {
  userId: string;
  role: string;
  documents: { assigned: number; completed: number };
  forms: { assigned: number; completed: number };
}

export interface ActivityItem {
  id: string;
  text: string;
  time: string;
  type: 'document' | 'form' | 'status' | 'warning';
}

export interface DashboardData {
  stats: {
    buyers: number;
    sellers: number;
    documents: {
      total: number;
      completed: number;
    };
    forms: {
      total: number;
      completed: number;
    }
  };
  recentActivity: ActivityItem[];
  participants: ParticipantProgress[];
}

export const generateProjectDashboardData = (participantsData: ParticipantWithDetails[]): DashboardData => {
  // Calculate dashboard data
  const dashboardData: DashboardData = {
    stats: {
      buyers: participantsData.filter(p => p.role === 'buyer').length || 0,
      sellers: participantsData.filter(p => p.role === 'seller').length || 0,
      documents: {
        total: 15,
        completed: 6
      },
      forms: {
        total: 8,
        completed: 3
      }
    },
    recentActivity: [
      { 
        id: '1', 
        text: 'John Doe uploaded Proof of Income', 
        time: '2 hours ago',
        type: 'document'
      },
      { 
        id: '2', 
        text: 'Jane Smith completed Personal Information form', 
        time: '4 hours ago',
        type: 'form'
      },
      { 
        id: '3', 
        text: `You assigned 3 new documents to Participant`,
        time: '1 day ago',
        type: 'status'
      },
      { 
        id: '4', 
        text: 'Property Deed document was rejected', 
        time: '2 days ago',
        type: 'warning'
      }
    ],
    participants: participantsData.map(p => {
      const docsAssigned = Math.floor(Math.random() * 8) + 3;
      const docsCompleted = Math.floor(Math.random() * docsAssigned);
      const formsAssigned = Math.floor(Math.random() * 6) + 2;
      const formsCompleted = Math.floor(Math.random() * formsAssigned);
      
      return {
        userId: p.participant_id,
        role: p.role,
        documents: { assigned: docsAssigned, completed: docsCompleted },
        forms: { assigned: formsAssigned, completed: formsCompleted }
      };
    })
  };

  return dashboardData;
};
