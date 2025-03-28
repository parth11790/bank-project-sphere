
export interface Participant {
  participant_id: string;
  user_id: string;
  name: string;
  email: string;
  role: string;
  documents?: Array<{
    document_id: string;
    name: string;
  }>;
  forms?: Array<{
    form_id: string;
    name: string;
  }>;
  business?: {
    business_id: string;
    name: string;
    entity_type: string;
    documents?: Array<{
      document_id: string;
      name: string;
    }>;
    forms?: Array<{
      form_id: string;
      name: string;
    }>;
  };
}

export interface ApiResponse {
  created_at: string;
  id: number;
  [key: string]: any;
}

// Type guard to check if an object is a Participant
export function isParticipant(obj: Participant | ApiResponse): obj is Participant {
  return 'participant_id' in obj && 'user_id' in obj;
}
