import NextAuth from "next-auth";
import db from "@/db/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
    
    
  },

  adapter: PrismaAdapter(db),
  secret: process.env.SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
  
      },
      async authorize(credentials) {
        // check to see if email and password is there
        if (!credentials?.email || !credentials?.password) {
          throw new Error("من فضلك ادخل الإيميل وكلمة المرور");
        }

        // check to see if user exists
        const user = await db.users.findUnique({
          where: {
            email: credentials?.email,
            
          },
          include:{permissions:true}
        });

        // if no user was found
        if (!user || !user?.password) {
          throw new Error("هذا الحساب غير موجود");
        }

        // check to see if password matches
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        // if password does not match
        if (!passwordMatch) {
          throw new Error("خطأ في المرور ");
        }

        return user;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 1 * 60 * 60, // 30 days
    updateAge: 3* 1 * 60 * 60, // 30 days
   // 24 hours
  
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    
    async jwt({ token, user }) {
      // Persist the user's session
      if (user) {
        
        token.user = user;
      
      } 
     
  
      return token;
    },
    async session({ session, token }) {
      
      // Send properties to the client, like an access_token from a provider.
      session.user= token.user as User;
      
      return session;
    },
  },


  // debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
