import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/config/database";
import User from "@/models/User";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    //invoked on successful login
    async signOn({ profile }) {
      await connectDB();
      // check if user exists
      console.log("SignOn email ", profile.email);
      const user = await User.findOne({ email: profile.email });
      if (!user) {
        // truncate username if too long
        const username = profile.name.slice(0, 20);
        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }

      return true;
    },
    // modify the session object
    async session({ session }) {
      await connectDB();
      console.log("session email", session.user.email);
      const user = await User.findOne({ email: session.user.email });
      console.log("User ", user);
      session.user.id = user._id.toString();
      return session;
    },
  },
};
