
export interface User {
  user_id: string;
  name: string;
  email: string;
  role: string;
  bank_id?: string;
  otp_enabled?: boolean;
}

export interface ApiResponse {
  created_at: string;
  id: number;
  [key: string]: any;
}

// Type guard to check if an object is a User
export function isUser(obj: User | ApiResponse): obj is User {
  return 'user_id' in obj && 'name' in obj;
}
