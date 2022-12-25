import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";

const verifyToken = (token: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.MAGIC_LINK_JWT_SECRET, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      return resolve({
        id: decoded?.sub,
        name: "Test McFakeson",
        email: "test@mail.com",
      } as User);
    });
  });
};

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    error: "/auth/error", // Error code passed in query string as ?error=
  },
  providers: [
    CredentialsProvider({
      name: "Magic Link",
      credentials: {
        token: { label: "Token", type: "text" },
      },
      async authorize(credentials, req) {
        if (!credentials) return null;

        const user = await verifyToken(credentials.token);
        return user ? user : null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
});
