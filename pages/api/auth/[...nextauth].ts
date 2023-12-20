// import NextAuth, { NextAuthOptions } from "next-auth";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import prisma from "@/lib/prisma";
// import GoogleProvider from "next-auth/providers/google";

// export const authOptions: NextAuthOptions = {
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     }),
//   ],
// };

// export default NextAuth(authOptions);

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

// Define the user type (adjust according to your user data structure)
interface User {
  id: string;
  name: string;
  email: string;
}

// NextAuth options configuration
const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const user = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/local`,
            {
              identifier: credentials?.username,
              password: credentials?.password,
            },
          );
          if (user.data) {
            return user.data;
          } else {
            return null;
          }
        } catch (error) {
          const errorMessage =
            error.response.data.message[0].messages[0].message;
          throw new Error(errorMessage);
        }
      },
    }),
  ],
  database: process.env.NEXT_PUBLIC_DATABASE_URL,
  session: {
    jwt: true,
  },
  callbacks: {
    jwt: async (token, user) => {
      if (user) {
        token.jwt = user.jwt;
        token.user = user.user;
      }
      return Promise.resolve(token);
    },
    session: async (session, token) => {
      session.jwt = token.jwt;
      session.user = token.user;
      return Promise.resolve(session);
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
};

// NextAuth handler
export default (req: NextApiRequest, res: NextApiResponse) =>
  // @ts-ignore
  NextAuth(req, res, authOptions);
