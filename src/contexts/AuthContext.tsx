import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

// Define the user roles
export type UserRole = 'admin' | 'buyer' | 'seller' | 'bank_officer' | 'loan_specialist' | 'bank_manager';

// Define the user type
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  bank_id?: string | null;
  otp_enabled?: boolean;
}

// Define the auth context shape
interface AuthContextProps {
  user: User | null;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (user: User) => void;
  logout: () => void;
}

// Create the auth context
const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
  setUser: () => {},
  login: () => {},
  logout: () => {},
});

// Create the auth provider
interface AuthProviderProps {
  children: ReactNode;
}

// Update the AuthProvider component to simulate a buyer or seller user
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // For mock implementation, we'll pretend to be a buyer (user_1) by default
  // This will ensure we see projects in the My Projects section
  useEffect(() => {
    const mockUser = {
      id: 'user_1',
      name: 'John Smith',
      email: 'john@example.com',
      role: 'buyer' as UserRole
    };
    
    setUser(mockUser);
    setLoading(false);
  }, []);

  const login = (user: User) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };

  const authValue: AuthContextProps = {
    user,
    loading,
    setUser,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Create the useAuth hook
export const useAuth = () => useContext(AuthContext);
