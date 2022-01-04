import Head from "next/head"
import Nav from "../Navbar/Navbar"
// import Nav from "./Nav"
import { Container } from "@material-ui/core"

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Next.js MongoDB App</title>
      </Head>
      <Container>
        <Nav />
        {children}
      </Container>
    </>
  )
}

export default Layout
