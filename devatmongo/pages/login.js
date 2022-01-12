import { getProviders, getSession } from "next-auth/react"

const Login = ({ session, providers }) => {
  console.log(providers, session)
  if (session) return null
  return (
    <div>
      <h1>Login </h1>
    </div>
  )
}

export default Login

export async function getServerSideProps(ctx) {
  return {
    props: {
      session: await getSession(ctx),
      providers: await getProviders(ctx),
    },
  }
}
