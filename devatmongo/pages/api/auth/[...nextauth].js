import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"
// import { html, text } from "../../../lib/htmlEmail"
// import nodemailer from "nodemailer"
import connectDB from "../../../connectDB"
import Users from "../../../models/userModel"
import bcrypt from "bcryptjs"

export default NextAuth({
  secret: process.env.SECRET,

  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        const email = credentials.email
        const password = credentials.password

        const user = await Users.findOne({ email })
        if (user) return loginUser({ password, user })

        return registerUser({ email, password })
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    session: async (session, user) => {
      // const resUser = await Users.findById(user.sub)
      // session.emailVerified = resUser.emailVerified
      session?.userId = user?.sub
      return Promise.resolve(session)
    },
  },
  adapter: MongoDBAdapter(clientPromise),
})

const loginUser = async ({ password, user }) => {
  if (!user.password) {
    throw new Error("Accounts have to login with OAuth or Email.")
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw new Error("Password Incorrect.")
  }

  if (!user.emailVerified) {
    throw new Error("Success! Check your email.")
  }

  return user
}

const registerUser = async ({ email, password }) => {
  const hashPass = await bcrypt.hash(password, 12)
  const newUser = new Users({ email, password: hashPass })
  await newUser.save()
  throw new Error("Success! Check your email.")
}
