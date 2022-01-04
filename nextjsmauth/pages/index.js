import { Button, Container } from "@material-ui/core"
// import { parseCookies } from "nookies"
import nookies from "nookies"
import jwt from "jsonwebtoken"

import Link from "next/link"
// import styles from './Hero.module.css';

const Hero = () => {
  // console.log(cookies)
  return (
    <Container>
      <div>
        <h1>
          <span>Next.js</span>
          <span>App</span>
        </h1>
      </div>
    </Container>
  )
}

// export async function getServerSideProps(ctx) {
//   const cookies = nookies.get(ctx)
//   console.log(cookies)

//   var decoded = jwt.verify(cookies.token, process.env.JWT_SECRET)
//   console.log(decoded)
//   return {
//     props: { cookies },
//   }
// }

export default Hero
