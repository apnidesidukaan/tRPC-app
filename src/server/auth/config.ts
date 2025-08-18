import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { db } from "~/server/db";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const authConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        mobile: { label: "Mobile", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.mobile) return null;

        const user = await db.user.findUnique({
          where: { mobile: credentials.mobile },
        });

        if (!user) return null;

        // const valid = await compare(credentials.password, user.passwordHash);
        // if (!valid) return null;

        return { id: user.id, name: user.name, email: user.email };
      },
    }),
  ],
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt", // 👈 forces JWT sessions instead of DB
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.mobile = user.mobile;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.mobile = token.mobile as string;
      }
      return session;
    },
  },

};
