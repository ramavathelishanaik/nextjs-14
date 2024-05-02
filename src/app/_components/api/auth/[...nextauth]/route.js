import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import apiEndPoints from "../../../../services/apiEndPoints";

export const authOptions = {
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    CredentialsProvider({
      id: "user-login",
      name: "UsernameProvider",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "enter email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "enter password",
        },
        re_login: {
          label: "re_login",
          type: "text",
          placeholder: "Do you want to relogin",
        },
      },
      async authorize(credentials) {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_BASEURL}${apiEndPoints.USER_LOGIN}`,
            {
              email: credentials.email,
              password: credentials.password,
              re_login: JSON.parse(credentials.re_login),
            }
          );

          const user = response.data;

          if (user) {
            return user;
          }
          return null;
        } catch (err) {
          if (
            err.response.data?.message?.message === "user have active session"
          ) {
            throw new Error(JSON.stringify(err.response.data?.message));
          }
          throw new Error(JSON.stringify(err.response.data));
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      // Persist the OAuth access_token to the token right after signin

      if (user) {
        token.accessToken = user.token;
        if (user) token.role = user.user_type;
        // token.refreshToken = user.refresh;
        token.user = user;
      }

      return token;
    },
    session: async ({ session, token }) => {
      // Send properties to the client, like an access_token from a provider.
      if (token) {
        session.accessToken = token.accessToken;
        if (session?.user) session.user.role = token.user_type;
        // session.refreshToken = token.refreshToken;
        session.user = token.user;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
