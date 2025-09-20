import React, { createContext, useContext, useState, useEffect, FC, ReactNode } from 'react';

// This declares the global netlifyIdentity object that comes from the CDN script
declare global {
  interface Window {
    netlifyIdentity: any;
  }
}

interface AuthContextType {
  user: any | null;
  login: () => void;
  logout: () => void;
  authReady: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const netlifyIdentity = window.netlifyIdentity;

    // --- Login Event ---
    netlifyIdentity.on('login', (user: any) => {
      setUser(user);
      netlifyIdentity.close(); // Close the modal on login
    });

    // --- Logout Event ---
    netlifyIdentity.on('logout', () => {
      setUser(null);
    });
    
    // --- Init Event ---
    // This fires when the script has loaded and has checked if a user is logged in.
    netlifyIdentity.on('init', (user: any) => {
      setUser(user);
      setAuthReady(true);
    });

    // --- Init Netlify Identity ---
    netlifyIdentity.init();

    // --- Cleanup ---
    return () => {
      netlifyIdentity.off('login');
      netlifyIdentity.off('logout');
      netlifyIdentity.off('init');
    };
  }, []);

  const login = () => {
    window.netlifyIdentity.open();
  };

  const logout = () => {
    window.netlifyIdentity.logout();
  };

  const contextValue = { user, login, logout, authReady };

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
