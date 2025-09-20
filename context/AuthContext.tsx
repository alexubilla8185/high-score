import React, { createContext, useContext, FC, ReactNode } from 'react';
import { useAuth0, User } from '@auth0/auth0-react';

interface AuthContextType {
  user: User | undefined;
  login: () => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  getAccessTokenSilently: (options?: any) => Promise<string>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { 
    user, 
    loginWithRedirect, 
    logout: auth0Logout, 
    isAuthenticated, 
    isLoading,
    getAccessTokenSilently 
  } = useAuth0();

  const login = () => {
    loginWithRedirect();
  };

  const logout = () => {
    auth0Logout({ logoutParams: { returnTo: window.location.origin } });
  };

  const contextValue = { user, login, logout, isAuthenticated, isLoading, getAccessTokenSilently };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
