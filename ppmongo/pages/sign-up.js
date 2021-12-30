import { Button, Container } from "@material-ui/core"

import { fetcher } from "../lib/fetch"
import { useCurrentUser } from "../lib/user"
import Link from "next/link"
import { useRouter } from "next/router"
import { useCallback, useRef, useState } from "react"
import toast from "react-hot-toast"

const SignUp = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const usernameRef = useRef()
  const nameRef = useRef()

  const { mutate } = useCurrentUser()

  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const onSubmit = useCallback(
    async (e) => {
      console.log(
        emailRef.current.value,
        nameRef.current.value,
        passwordRef.current.value,
        usernameRef.current.value
      )
      e.preventDefault()
      try {
        setIsLoading(true)
        const response = await fetcher("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: emailRef.current.value,
            name: nameRef.current.value,
            password: passwordRef.current.value,
            username: usernameRef.current.value,
          }),
        })
        mutate({ user: response.user }, false)
        toast.success("Your account has been created")
        router.replace("/feed")
      } catch (e) {
        toast.error(e.message)
      } finally {
        setIsLoading(false)
      }
    },
    [mutate, router]
  )

  return (
    <Container>
      <div>
        <h1>Join Now</h1>
        <form onSubmit={onSubmit}>
          <Container>
            <p>Your login</p>
            <div />
          </Container>
          <input
            ref={emailRef}
            autoComplete="email"
            placeholder="Email Address"
            aria-label="Email Address"
            size="large"
            required
          />

          <input
            ref={passwordRef}
            autoComplete="new-password"
            placeholder="Password"
            aria-label="Password"
            size="large"
            required
          />

          <Container>
            <p>About you</p>
            <div />
          </Container>
          <input
            ref={usernameRef}
            autoComplete="username"
            placeholder="Username"
            aria-label="Username"
            size="large"
            required
          />

          <input
            ref={nameRef}
            autoComplete="name"
            placeholder="Your name"
            aria-label="Your name"
            size="large"
            required
          />
          <Button type="success" size="large">
            Sign up
          </Button>
        </form>
      </div>
      <div>
        <Link href="/login" passHref>
          <Link color="link" variant="highlight">
            Already have an account? Log in
          </Link>
        </Link>
      </div>
    </Container>
  )
}

export default SignUp
