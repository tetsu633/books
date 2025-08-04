import NextAuth, { User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { createUser, loginUser } from '@/services/auth';

const handler = NextAuth({
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        name: { label: 'Name', type: 'text' },
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          if (credentials.name) {
            const user = await createUser({
              name: credentials.name,
              email: credentials.email,
              password: credentials.password,
            });

            if (user) {
              return {
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password,
              };
            }
          } else {
            const user = await loginUser({
              email: credentials.email,
              password: credentials.password,
            });

            if (user) {
              return {
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password,
              };
            }
          }
        } catch (error) {
          console.error(error);
          return null;
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.password = user.password;
      }

      return token;
    },
    async session({ session, token }) {
      if (token.sub) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
      }

      return session;
    },
  },
});

export { handler as GET, handler as POST };
