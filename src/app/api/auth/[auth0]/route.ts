import { handleAuth, handleLogin, handleLogout, handleCallback } from '@auth0/nextjs-auth0/server';

export const GET = handleAuth({
  login: handleLogin({
    returnTo: '/dashboard',
  }),
  logout: handleLogout({
    returnTo: '/',
  }),
  callback: handleCallback({
    afterCallback: async (req, session) => {
      return session;
    },
  }),
});
