import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: 'read:user',
    }),

    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorizationUrl:
        'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
    }),
  ],

  callbacks: {
    async session(session, profile) {
      try {
        return {
          ...session,
          id: profile.sub,
        };
      } catch (error) {
        return {
          ...session,
          id: null,
        };
      }
    },

    async signIn(user, account, profile) {
      const { email } = user;
      try {
        return true;
      } catch (error) {
        console.log('Deu erro', error);
        return false;
      }
    },
  },
});
