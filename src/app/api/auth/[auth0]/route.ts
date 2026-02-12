import { handleAuth, handleLogin, handleLogout, handleCallback } from '@auth0/nextjs-auth0';

export const GET = handleAuth({
  login: handleLogin({
    returnTo: '/dashboard',
  }),
  logout: handleLogout({
    returnTo: '/',
  }),
  callback: handleCallback({
    afterCallback: async (req, session) => {
      // Optionally sync user to Supabase here
      return session;
    },
  }),
});
