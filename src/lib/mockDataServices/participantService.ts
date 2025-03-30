
import { Participant, ParticipantWithDetails } from '@/types/participant';
import { projects, users, businesses, individualFormsData, businessFormsData, individualDocumentsData, businessDocumentsData } from '../mockData';
import { User } from '@/types/user';

// Helper to get a random sample of items
const sampleItems = <T>(array: T[], count: number): T[] => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Helper to generate random title
const getRandomTitle = (): string => {
  const titles = ['CEO', 'President', 'Owner', 'Managing Partner', 'Director', 'Founder', 'Managing Member'];
  return titles[Math.floor(Math.random() * titles.length)];
};

// Helper to generate random ownership percentage
const getRandomOwnership = (): number => {
  return Math.floor(Math.random() * 80) + 20; // 20-100%
};

// Mock participant data
export const getProjectParticipantsData = async (projectId: string): Promise<Participant[]> => {
  const project = projects.find(p => p.project_id === projectId);
  if (!project) return [];
  
  return project.participants.map(participant => {
    const user = users.find(u => u.user_id === participant.userId);
    return {
      participant_id: `part_${participant.userId}`,
      user_id: participant.userId,
      name: user?.name || 'Unknown',
      email: user?.email || 'unknown@example.com',
      role: participant.role,
      documents: [],
      forms: []
    };
  });
};

// Mock detailed participant data for participants page
export const getParticipantsWithDetailsData = async (projectId: string): Promise<ParticipantWithDetails[]> => {
  const project = projects.find(p => p.project_id === projectId);
  if (!project) return [];
  
  return project.participants.map(participant => {
    const user = users.find(u => u.user_id === participant.userId);
    if (!user) return null;
    
    // Find if this participant has any businesses 
    const userBusinesses = businesses.filter(b => b.owner_id === user.user_id);
    
    // For bank roles, don't include business
    const isBankRole = ['bank_officer', 'loan_specialist', 'bank_manager'].includes(participant.role);
    
    // Assign forms and documents - more for buyers and sellers
    const formCount = isBankRole ? 0 : (participant.role === 'buyer' ? 3 : 2);
    const docCount = isBankRole ? 0 : (participant.role === 'buyer' ? 2 : 1);
    
    const individualForms = sampleItems(individualFormsData, formCount);
    const individualDocs = sampleItems(individualDocumentsData, docCount);
    
    // Always include a business for buyers and sellers unless they don't have one
    const hasBusiness = userBusinesses.length > 0 && !isBankRole;
    
    return {
      participant_id: `part_${participant.userId}`,
      user_id: participant.userId,
      name: user.name,
      email: user.email,
      role: participant.role,
      documents: individualDocs,
      forms: individualForms,
      business: hasBusiness ? {
        business_id: userBusinesses[0].business_id,
        name: userBusinesses[0].name,
        entity_type: userBusinesses[0].entity_type,
        title: getRandomTitle(),
        ownership_percentage: getRandomOwnership(),
        documents: sampleItems(businessDocumentsData, docCount + 1),
        forms: sampleItems(businessFormsData, formCount + 1),
      } : undefined
    };
  }).filter(Boolean) as ParticipantWithDetails[];
};
