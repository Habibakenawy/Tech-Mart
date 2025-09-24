import { apiServices } from "@/services/apiServices";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Received credentials:", credentials);

        const res = await apiServices.login(
          credentials?.email,
          credentials?.password
        );

        console.log("Backend response:", res);
        console.log("NextAuth Secret:", process.env.NEXTAUTH_SECRET);


        if (res.message === "success") {
          // ✅ Flatten the user object
          return {
            id: res.user.email, // or backend _id if available
            name: res.user.name,
            email: res.user.email,
            role: res.user.role,
            token: res.token,
          };
        }

        return null; // Sign in failed
      },
    }),
  ],

  pages: {
    signIn: "/auth/login", // custom login page
  },

  callbacks: {
    async jwt({ token, user }) {
      console.log("JWT callback:", { token, user });

      // First login
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
});

export { handler as GET, handler as POST };
