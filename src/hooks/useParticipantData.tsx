
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  getProjectParticipants,
  getBusinessesByOwnerId,
  getAssignedDocuments,
  getAssignedForms,
} from '@/services/supabaseService';

// Define our data types
export interface Document {
  document_id: string;
  name: string;
}

export interface Form {
  form_id: string;
  name: string;
}

export interface Business {
  business_id: string;
  name: string;
  entity_type: string;
  documents: Document[];
  forms: Form[];
}

export interface Participant {
  participant_id: string;
  user_id: string;
  name: string;
  email: string;
  role: string;
  documents: Document[];
  forms: Form[];
  business?: Business;
}

export const useParticipantData = (projectId: string) => {
  const [participants, setParticipants] = useState<Participant[]>([]);

  // Get project participants
  const { data: participantsData, isLoading: participantsLoading, refetch: refetchParticipants } = useQuery({
    queryKey: ['participants', projectId],
    queryFn: () => getProjectParticipants(projectId || ''),
    enabled: !!projectId,
  });

  // Transform participants data to include forms, documents, and businesses
  useEffect(() => {
    const loadParticipantData = async () => {
      if (!participantsData || participantsLoading) return;
      
      const transformedParticipants: Participant[] = [];
      
      for (const participant of participantsData) {
        // Get assigned documents and forms for the individual
        const assignedDocs = await getAssignedDocuments(participant.participant_id);
        const assignedForms = await getAssignedForms(participant.participant_id);
        
        // Format documents and forms for individual
        const documents = assignedDocs.map(doc => ({
          document_id: doc.document.document_id,
          name: doc.document.name
        }));
        
        const forms = assignedForms.map(form => ({
          form_id: form.form.form_id,
          name: form.form.name
        }));
        
        // Get businesses owned by this participant
        const businesses = await getBusinessesByOwnerId(participant.user_id);
        let business: Business | undefined;
        
        if (businesses.length > 0) {
          const businessData = businesses[0]; // Just get the first business for now
          
          // Get assigned documents and forms for the business
          const businessDocs = await getAssignedDocuments(participant.participant_id, businessData.business_id);
          const businessForms = await getAssignedForms(participant.participant_id, businessData.business_id);
          
          business = {
            business_id: businessData.business_id,
            name: businessData.name,
            entity_type: businessData.entity_type,
            documents: businessDocs.map(doc => ({
              document_id: doc.document.document_id,
              name: doc.document.name
            })),
            forms: businessForms.map(form => ({
              form_id: form.form.form_id,
              name: form.form.name
            }))
          };
        }

        transformedParticipants.push({
          participant_id: participant.participant_id,
          user_id: participant.user_id,
          name: participant.user.name,
          email: participant.user.email,
          role: participant.user.role,
          documents,
          forms,
          business
        });
      }
      
      setParticipants(transformedParticipants);
    };
    
    loadParticipantData();
  }, [participantsData, participantsLoading, projectId]);

  // Separate participants by role
  const buyers = participants.filter(p => p.role === 'buyer');
  const sellers = participants.filter(p => p.role === 'seller');
  const bankUsers = participants.filter(p => p.role !== 'buyer' && p.role !== 'seller');

  return {
    participants,
    buyers,
    sellers,
    bankUsers,
    isLoading: participantsLoading,
    refetchParticipants
  };
};
