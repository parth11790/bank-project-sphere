
// Participant sections configuration based on your table structure
export interface ParticipantSectionConfig {
  business_information: boolean;
  forms: boolean;
  ownership: boolean;
  affiliated_business_ownership: boolean;
}

export const PARTICIPANT_SECTION_CONFIG: Record<string, ParticipantSectionConfig> = {
  'borrowing_business': {
    business_information: true,
    forms: true,
    ownership: true,
    affiliated_business_ownership: true
  },
  'owner_individual': {
    business_information: false,
    forms: true,
    ownership: false,
    affiliated_business_ownership: true
  },
  'owner_business': {
    business_information: true,
    forms: true,
    ownership: true,
    affiliated_business_ownership: true
  },
  'affiliated_business': {
    business_information: true,
    forms: true,
    ownership: true,
    affiliated_business_ownership: false
  },
  'acquisition_business': {
    business_information: true,
    forms: true,
    ownership: true,
    affiliated_business_ownership: true
  },
  'seller_individual': {
    business_information: false,
    forms: true,
    ownership: false,
    affiliated_business_ownership: false
  },
  'seller_business': {
    business_information: true,
    forms: true,
    ownership: false, // Based on your table showing ???
    affiliated_business_ownership: false
  }
};

export const getParticipantSections = (participantType: string): ParticipantSectionConfig => {
  return PARTICIPANT_SECTION_CONFIG[participantType] || {
    business_information: false,
    forms: false,
    ownership: false,
    affiliated_business_ownership: false
  };
};
