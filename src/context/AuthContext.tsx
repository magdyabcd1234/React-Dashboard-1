import React, { createContext, useContext, useState } from 'react';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  company?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, remember?: boolean) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USERS: Record<string, AuthUser> = {
  'admin@apex.com': {
    id: 'usr-admin-01',
    name: 'Alex Morgan',
    email: 'alex@company.com',
    role: 'Chief Executive Officer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    company: 'ApexDash Enterprise',
  },
  'sarah@apex.com': {
    id: 'usr-sarah-02',
    name: 'Sarah Connor',
    email: 'sarah.c@cloudtech.io',
    role: 'Operations Director',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    company: 'CloudTech Solutions',
  },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const savedUser = localStorage.getItem('apex_auth_user');
      const token = localStorage.getItem('apex_auth_token');
      if (savedUser && token) {
        return JSON.parse(savedUser);
      }
    } catch {
      localStorage.removeItem('apex_auth_user');
      localStorage.removeItem('apex_auth_token');
    }
    return null;
  });
  const [isLoading] = useState<boolean>(false);

  const login = async (
    email: string,
    password: string,
    remember: boolean = true
  ): Promise<{ success: boolean; error?: string }> => {
    // Artificial small delay for realistic UX feedback
    await new Promise((resolve) => setTimeout(resolve, 600));

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      return { success: false, error: 'Please enter both email and password' };
    }

    if (password.length < 4) {
      return { success: false, error: 'Password must be at least 4 characters long' };
    }

    // Match demo user or construct dynamic profile for custom email
    let authenticatedUser: AuthUser;

    if (DEMO_USERS[normalizedEmail]) {
      authenticatedUser = DEMO_USERS[normalizedEmail];
    } else {
      const namePart = normalizedEmail.split('@')[0];
      const formattedName = namePart
        .split('.')
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join(' ');

      authenticatedUser = {
        id: `usr-${Date.now()}`,
        name: formattedName || 'Authorized User',
        email: normalizedEmail,
        role: 'Enterprise Administrator',
        avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80`,
        company: 'Apex Operations',
      };
    }

    const fakeToken = `token_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    if (remember) {
      localStorage.setItem('apex_auth_user', JSON.stringify(authenticatedUser));
      localStorage.setItem('apex_auth_token', fakeToken);
    } else {
      sessionStorage.setItem('apex_auth_user', JSON.stringify(authenticatedUser));
      sessionStorage.setItem('apex_auth_token', fakeToken);
    }

    setUser(authenticatedUser);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem('apex_auth_user');
    localStorage.removeItem('apex_auth_token');
    sessionStorage.removeItem('apex_auth_user');
    sessionStorage.removeItem('apex_auth_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
