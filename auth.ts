import NextAuth from "next-auth"
import Github from "next-auth/providers/github"
import { client } from "./sanity/lib/client"
import { AUTHOR_BY_GITHUB } from "./sanity/lib/queries"
import { writeClient } from "./sanity/lib/write-cient"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Github],
  callbacks: {
    async signIn({
      user: { name, email, image },
      account, profile
    }) {
      if(profile == undefined) return false;
      const { id, login, bio } = profile;
      const existingUser = await client.fetch(AUTHOR_BY_GITHUB, { id }, { useCdn: false });

      if(!existingUser){
        await writeClient.create({
          _type: 'author',
          id, name,
          username: login,
          email, image,
          bio: bio || ''
        });
      }

      return true;
    },
    async jwt({ token, account, profile }){
      if(account && profile){
        const user = await client.fetch(AUTHOR_BY_GITHUB, {
          id: profile?.id
        }, { useCdn: false });

        token.id = user?._id;
      }

      return token;
    },
    async session({ session, token }){
      Object.assign(session, { id: token.id })
      return session
    }
  }
})