
// Define the participant categories and entity types
export type ParticipantCategory = 
  | 'borrowing_business'
  | 'business_owner' 
  | 'affiliated_business'
  | 'acquisition_business'
  | 'acquisition_owner';

export type EntityType = 'individual' | 'business';

export interface ParticipantClassification {
  participant_id: string;
  name: string;
  email?: string;
  category: ParticipantCategory;
  entity_type: EntityType;
  
  // For business owners and acquisition owners
  ownership_percentage?: number;
  parent_business_id?: string; // Which business they own
  
  // For affiliated businesses
  affiliated_to_owner_id?: string; // Which owner owns this business
  
  // Navigation and display
  info_route: string; // Where to navigate for this participant's info
  display_section: 'business' | 'personal';
}

// Helper functions for participant classification
export const getInfoRoute = (participant: ParticipantClassification, projectId: string): string => {
  if (participant.entity_type === 'business') {
    return `/business/${participant.participant_id}`;
  } else {
    return `/project/participants/${projectId}/personal-info/${participant.participant_id}`;
  }
};

export const getDisplaySection = (entityType: EntityType): 'business' | 'personal' => {
  return entityType === 'business' ? 'business' : 'personal';
};

export const createParticipantClassification = (
  id: string,
  name: string,
  category: ParticipantCategory,
  entityType: EntityType,
  projectId: string,
  options?: {
    email?: string;
    ownership_percentage?: number;
    parent_business_id?: string;
    affiliated_to_owner_id?: string;
  }
): ParticipantClassification => {
  const infoRoute = entityType === 'business' 
    ? `/business/${id}` 
    : `/project/participants/${projectId}/personal-info/${id}`;
    
  return {
    participant_id: id,
    name,
    email: options?.email,
    category,
    entity_type: entityType,
    ownership_percentage: options?.ownership_percentage,
    parent_business_id: options?.parent_business_id,
    affiliated_to_owner_id: options?.affiliated_to_owner_id,
    info_route: infoRoute,
    display_section: getDisplaySection(entityType)
  };
};
