import React, { createContext, useContext, useState, useCallback } from 'react';
import type { User, UserRole } from '@/types';
import { currentUser } from '@/data/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo credentials
const ADMIN_EMAIL = 'admin@kcau.ac.ke';
const ADMIN_PASSWORD = 'admin123';
const STUDENT_EMAIL = 'student@kcau.ac.ke';
const STUDENT_PASSWORD = 'student123';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string, password: string, role: UserRole): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (role === 'admin') {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        const adminUser: User = {
          ...currentUser,
          email,
          role: 'admin',
          name: 'Admin — Dr. Sarah Kimani',
        };
        setUser(adminUser);
        setIsLoading(false);
        return true;
      }
    } else if (role === 'student') {
      if (email === STUDENT_EMAIL && password === STUDENT_PASSWORD) {
        const studentUser: User = {
          ...currentUser,
          email,
          role: 'student',
          name: 'John Kamau',
        };
        setUser(studentUser);
        setIsLoading(false);
        return true;
      }
    }
    
    setIsLoading(false);
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
