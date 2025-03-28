
export interface Participant {
  participant_id: string;
  user_id: string;
  project_id: string;
  user: {
    name: string;
    email: string;
    role: string;
  };
}

export interface ApiResponse {
  created_at: string;
  id: number;
  [key: string]: any;
}

// Type guard to check if an object is a Participant
export function isParticipant(obj: Participant | ApiResponse): obj is Participant {
  return 'participant_id' in obj && 'user_id' in obj && 'user' in obj;
}
