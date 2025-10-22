import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
    interface Session {
      user: {
        id: string;
        email?: string | null;
        name?: string | null;
        image?: string | null;
      }
    }
  }

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: Record<"email" | "password", string> | undefined) { //TODO: Sync with database (i.e. pull creds from database to check)
                if (credentials?.email == "demo@example.com" && credentials?.password == "demo123") {
                    return {
                        id: "demo-user-123",
                        email: "demo@example.com",
                        name: "Demo User"
                    }
                }
                return null;
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = (user as any).id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user && token?.id) {
                (session.user as any).id = token.id as string;
            }
            return session;
        }
    },
    pages: {
        signIn: "/auth/signin"
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET ?? "dev-secret",
}