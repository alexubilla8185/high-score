import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GameProvider } from './context/GameContext';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { Auth0Provider } from '@auth0/auth0-react';

// IMPORTANT: These values must be replaced by your Auth0 configuration.
// It's recommended to use environment variables that are substituted during your build process.
// The variable names used here (`VITE_...`, `AUTH0_...`) are based on the user's provided screenshot.
const auth0Domain = process.env.VITE_AUTH0_DOMAIN;
const auth0ClientId = process.env.VITE_AUTH0_CLIENT_ID;
const auth0Audience = process.env.AUTH0_AUDIENCE;

if (!auth0Domain || !auth0ClientId || !auth0Audience) {
  const errorElement = document.getElementById('root');
  if (errorElement) {
    errorElement.innerHTML = `
      <div style="font-family: sans-serif; padding: 2rem; text-align: center; color: #FF0060; background-color: #111; height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <h1 style="font-size: 2rem; margin-bottom: 1rem;">Auth0 Configuration Error</h1>
        <p style="font-size: 1.1rem; max-width: 600px; line-height: 1.6;">
          Authentication is not configured correctly. Please ensure the following environment variables are set in your deployment environment:
        </p>
        <ul style="list-style: none; padding: 0; margin: 1.5rem 0; background-color: #222; border-radius: 8px; padding: 1.5rem; text-align: left;">
          <li style="margin-bottom: 0.5rem;"><strong>VITE_AUTH0_DOMAIN</strong></li>
          <li style="margin-bottom: 0.5rem;"><strong>VITE_AUTH0_CLIENT_ID</strong></li>
          <li><strong>AUTH0_AUDIENCE</strong></li>
        </ul>
        <p style="font-size: 0.9rem; color: #888;">These variables are required to initialize the Auth0 SDK.</p>
      </div>
    `;
  }
  throw new Error(
    "Auth0 environment variables are not configured. Please set VITE_AUTH0_DOMAIN, VITE_AUTH0_CLIENT_ID, and AUTH0_AUDIENCE."
  );
}


const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={auth0Domain}
      clientId={auth0ClientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: auth0Audience,
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
