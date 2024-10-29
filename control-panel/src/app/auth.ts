// import axios from "axios";
// import NextAuth, { NextAuthOptions, User } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

//  const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials, req) {
//         // Make a request to your external API to authenticate the user
//         const res = await axios.post("http://localhost:8080/api/login", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(credentials),
//         });
//         const user = await res.data;

//         if (res.status==200 && user) {
//           // Any object returned will be saved in `user` property of the JWT
//           return user;
//         } else {
//           // If you return null or false then the credentials will be rejected
//           return null;
//         }
//       },
//     }),
//   ],

//   session: {
//     strategy: "jwt",
//     maxAge: 30 * 24 * 60 * 60, // 30 days
//     updateAge: 24 * 60 * 60, // 24 hours
//   },

//   jwt: {
//     secret: process.env.NEXTAUTH_SECRET,
//   },

//   callbacks: {
//     async jwt({ token, user }) {
//       // Persist the user's session
//       if (user) {
//         token.user = user;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       // Send properties to the client, like an access_token from a provider.
//       session.user = token.user as User;
//       return session;
//     },
//   },
// };

// export default NextAuth(authOptions);


