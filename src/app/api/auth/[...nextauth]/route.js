import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { dbConnection } from "../../../mongodb";
import User from "../../../../../models/User";

export const authOptions = {
    adapter: MongoDBAdapter(
        dbConnection().then(({ mongoClient }) => mongoClient), {
        collections: {
            Users: "User",
            Accounts: "Account",
            Sessions: "Session"
        }
    }
    ),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async session({ session }) {
            const dbUser = await User.findOne({ email: session.user.email });

            if (dbUser) {
                session.user.id = dbUser._id;
                session.user.role = dbUser.role;
            }

            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
