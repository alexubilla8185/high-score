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
    // Netlify Identity widget is loaded from a script tag in index.html
    const netlifyIdentity = window.netlifyIdentity;

    if (!netlifyIdentity) {
      console.warn("Netlify Identity widget script not loaded or found.");
      setAuthReady(true); // Prevent app from hanging on a loading screen.
      return;
    }

    const handleLogin = (user: any) => {
      setUser(user);
      netlifyIdentity.close(); // Close the modal on login
    };

    const handleLogout = () => {
      setUser(null);
    };

    const handleInit = (user: any) => {
      setUser(user);
      setAuthReady(true);
    };

    // --- Attach Event Listeners ---
    netlifyIdentity.on('login', handleLogin);
    netlifyIdentity.on('logout', handleLogout);
    netlifyIdentity.on('init', handleInit);

    // --- Init Netlify Identity ---
    // This must be called after listeners are attached
    netlifyIdentity.init();

    // --- Cleanup ---
    // Remove the specific listeners on component unmount
    return () => {
      netlifyIdentity.off('login', handleLogin);
      netlifyIdentity.off('logout', handleLogout);
      netlifyIdentity.off('init', handleInit);
    };
  }, []);

  const login = () => {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.open();
    }
  };

  const logout = () => {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.logout();
    }
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
