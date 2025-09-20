import type { Handler } from "@netlify/functions";

export const handler: Handler = async () => {
  // Expose PUBLIC, client-side environment variables.
  // Never expose secret keys here.
  const authConfig = {
    domain: process.env.VITE_AUTH0_DOMAIN,
    clientId: process.env.VITE_AUTH0_CLIENT_ID,
    audience: process.env.AUTH0_AUDIENCE,
  };

  // Create a list of missing variable names for a clear error message.
  const missingVars: string[] = [];
  if (!authConfig.domain) missingVars.push('VITE_AUTH0_DOMAIN');
  if (!authConfig.clientId) missingVars.push('VITE_AUTH0_CLIENT_ID');
  if (!authConfig.audience) missingVars.push('AUTH0_AUDIENCE');

  if (missingVars.length > 0) {
    const errorMsg = `Server-side Auth0 configuration is incomplete. Missing environment variables: ${missingVars.join(', ')}. Please check the Netlify deployment settings.`;
    console.error(errorMsg);
    return {
        statusCode: 500,
        body: JSON.stringify({ error: "Authentication service is misconfigured on the server." }),
    };
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authConfig),
  };
};
