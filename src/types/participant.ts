
export interface Participant {
  participant_id: string;
  user_id: string;
  name: string;
  email: string;
  role: string;
  forms: Array<{
    form_id: string;
    name: string;
  }>;
  business?: {
    business_id: string;
    name: string;
    entity_type: string;
    title?: string;
    ownership_percentage?: number;
    forms: Array<{
      form_id: string;
      name: string;
    }>;
  };
}

export interface ParticipantWithDetails extends Participant {
  business?: {
    business_id: string;
    name: string;
    entity_type: string;
    title?: string;
    ownership_percentage?: number;
    forms: Array<{
      form_id: string;
      name: string;
    }>;
  };
}
