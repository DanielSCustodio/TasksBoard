import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import firebase from '../../../services/firebaseConnection';

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
        const lastDonate = await firebase
          .firestore()
          .collection('users')
          .doc(String(profile.sub))
          .get()
          .then((snapshot) => {
            if (snapshot.exists) {
              return snapshot.data().lastDonate.toDate();
            } else {
              return null;
            }
          });
        return {
          ...session,
          id: profile.sub,
          donor: lastDonate ? true : false,
          lastDonate: lastDonate,
        };
      } catch (error) {
        return {
          ...session,
          id: null,
          vip: false,
          lastDonate: null,
        };
      }
    },

    async signIn() {
      try {
        return true;
      } catch (error) {
        console.log('Deu erro', error);
        return false;
      }
    },
  },
});
