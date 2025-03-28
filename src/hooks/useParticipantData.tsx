
import { useState, useEffect } from 'react';
import { getParticipantsWithDetailsData } from '@/lib/mockDataProvider';
import { Participant, ParticipantWithDetails } from '@/types/participant';

export { Participant, ParticipantWithDetails };

export const useParticipantData = (projectId: string) => {
  const [buyers, setBuyers] = useState<Participant[]>([]);
  const [sellers, setSellers] = useState<Participant[]>([]);
  const [bankUsers, setBankUsers] = useState<Participant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  const fetchParticipants = async () => {
    try {
      setIsLoading(true);
      const participantsData = await getParticipantsWithDetailsData(projectId);
      
      // Split participants into their roles
      const buyersList: Participant[] = [];
      const sellersList: Participant[] = [];
      const bankList: Participant[] = [];
      
      participantsData.forEach(participant => {
        if (participant.role === 'buyer') {
          buyersList.push(participant);
        } else if (participant.role === 'seller') {
          sellersList.push(participant);
        } else {
          bankList.push(participant);
        }
      });
      
      setBuyers(buyersList);
      setSellers(sellersList);
      setBankUsers(bankList);
      setError(null);
    } catch (err) {
      console.error('Error fetching participants:', err);
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    if (projectId) {
      fetchParticipants();
    }
  }, [projectId]);
  
  return { 
    buyers, 
    sellers, 
    bankUsers, 
    isLoading, 
    error,
    refetchParticipants: fetchParticipants
  };
};
