import { apiServices } from "@/services/apiServices";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Received credentials:", credentials);

      if (!credentials?.email || !credentials?.password) {
    throw new Error("Email and password are required.");
  }

  const res = await apiServices.login(credentials.email, credentials.password);

        console.log("Backend response:", res);
        console.log("NextAuth Secret:", process.env.NEXTAUTH_SECRET);

        if (res.message === "success") {
          return {
            id: res.user.email,
            name: res.user.name,
            email: res.user.email,
            role: res.user.role,
            token: res.token,
          };
        }

        return null;
      },
    }),
  ],

  pages: {
    signIn: "/auth/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      console.log("JWT callback:", { token, user });
      if (user) {
        token.accessToken = user.token;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      console.log("Session callback:", { session, token });

      session.user.name = token.name as string;
      session.user.email = token.email as string;
      session.user.role = token.role as string;
      session.accessToken = token.accessToken as string;

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  debug: true,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
