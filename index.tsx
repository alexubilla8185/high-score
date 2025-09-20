import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GameProvider } from './context/GameContext';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { Auth0Provider } from '@auth0/auth0-react';
import Logo from './components/Logo';

interface AuthConfig {
  domain: string;
  clientId: string;
  audience: string;
}

const AppInitializer: React.FC = () => {
  const [config, setConfig] = useState<AuthConfig | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAuthConfig = async () => {
      try {
        const response = await fetch('/.netlify/functions/auth-config');
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `Failed to load authentication configuration. Status: ${response.status}`);
        }
        const authConfig: AuthConfig = await response.json();
        if (!authConfig.domain || !authConfig.clientId || !authConfig.audience) {
          throw new Error('Incomplete authentication configuration received from server.');
        }
        setConfig(authConfig);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred during initialization.');
      }
    };

    fetchAuthConfig();
  }, []);

  if (error) {
    return (
      <div style={{fontFamily: 'sans-serif', padding: '2rem', textAlign: 'center', color: '#FF0060', backgroundColor: '#111', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <h1 style={{fontSize: '2rem', marginBottom: '1rem'}}>Initialization Error</h1>
        <p style={{fontSize: '1.1rem', maxWidth: '600px', lineHeight: '1.6'}}>
          Could not initialize the application. Please check the deployment configuration.
        </p>
        <p style={{fontFamily: 'monospace', marginTop: '1rem', padding: '1rem', backgroundColor: '#222', borderRadius: '8px', color: '#ffa0a0', maxWidth: '100%', overflowWrap: 'break-word'}}>
          {error}
        </p>
      </div>
    );
  }

  if (!config) {
    return (
      <div style={{backgroundColor: '#000', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <Logo className="w-32 h-32 animate-spin-slow" />
        <p style={{marginTop: '1rem', fontSize: '1.125rem', color: '#00DFA2', animation: 'pulse-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'}}>
          Connecting to Cosmic Servers...
        </p>
      </div>
    );
  }

  return (
    <React.StrictMode>
      <Auth0Provider
        domain={config.domain}
        clientId={config.clientId}
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: config.audience,
        }}
      >
        <ToastProvider>
          <AuthProvider>
            <GameProvider>
              <App />
            </GameProvider>
          </AuthProvider>
        </ToastProvider>
      </Auth0Provider>
    </React.StrictMode>
  );
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(<AppInitializer />);
