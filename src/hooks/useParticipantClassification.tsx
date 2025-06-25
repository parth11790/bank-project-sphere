
import { useMemo } from 'react';
import { Project } from '@/types/project';
import { ParticipantClassification, createParticipantClassification } from '@/types/participantTypes';

export const useParticipantClassification = (project: Project) => {
  const classifiedParticipants = useMemo(() => {
    const participants: ParticipantClassification[] = [];
    
    // 1. Borrowing Business (main business)
    if (project.main_business) {
      participants.push(
        createParticipantClassification(
          project.main_business.business_id,
          project.main_business.name,
          'borrowing_business',
          'business',
          project.project_id,
          { 
            email: project.main_business.email,
            metadata: project.main_business
          }
        )
      );
    }
    
    // 2. Business Owners
    if (project.owners) {
      project.owners.forEach(owner => {
        participants.push(
          createParticipantClassification(
            owner.owner_id,
            owner.name,
            'business_owner',
            owner.type as 'individual' | 'business',
            project.project_id,
            {
              email: owner.email,
              ownership_percentage: owner.ownership_percentage,
              parent_business_id: project.main_business?.business_id,
              metadata: owner
            }
          )
        );
        
        // 3. Affiliated Businesses (owned by individual owners)
        if (owner.type === 'individual' && owner.affiliated_businesses) {
          owner.affiliated_businesses.forEach(affiliatedBusiness => {
            participants.push(
              createParticipantClassification(
                affiliatedBusiness.business_id,
                affiliatedBusiness.name,
                'affiliated_business',
                'business',
                project.project_id,
                {
                  email: affiliatedBusiness.email,
                  affiliated_to_owner_id: owner.owner_id,
                  metadata: affiliatedBusiness
                }
              )
            );
          });
        }
      });
    }
    
    // 4. Acquisition Businesses (if they exist in project structure)
    // This would be added when acquisition businesses are part of the project
    
    return participants;
  }, [project]);
  
  const getParticipantsByCategory = (category: ParticipantClassification['category']) => {
    return classifiedParticipants.filter(p => p.category === category);
  };
  
  const getParticipantsByEntityType = (entityType: ParticipantClassification['entity_type']) => {
    return classifiedParticipants.filter(p => p.entity_type === entityType);
  };
  
  return {
    allParticipants: classifiedParticipants,
    borrowingBusinesses: getParticipantsByCategory('borrowing_business'),
    businessOwners: getParticipantsByCategory('business_owner'),
    affiliatedBusinesses: getParticipantsByCategory('affiliated_business'),
    acquisitionBusinesses: getParticipantsByCategory('acquisition_business'),
    acquisitionOwners: getParticipantsByCategory('acquisition_owner'),
    businessEntities: getParticipantsByEntityType('business'),
    individualEntities: getParticipantsByEntityType('individual'),
    getParticipantsByCategory,
    getParticipantsByEntityType
  };
};
