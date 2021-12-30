import { Button, Container } from "@material-ui/core"

import { fetcher } from "../lib/fetch"
import { useCurrentUser } from "../lib/user"
import Link from "next/link"
import { useRouter } from "next/router"
import { useCallback, useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"

const Login = () => {
  const emailRef = useRef()
  const passwordRef = useRef()

  const [isLoading, setIsLoading] = useState(false)

  const { data: { user } = {}, mutate, isValidating } = useCurrentUser()
  const router = useRouter()
  useEffect(() => {
    if (isValidating) return
    if (user) router.replace("/feed")
  }, [user, router, isValidating])

  const onSubmit = useCallback(
    async (event) => {
      setIsLoading(true)
      event.preventDefault()
      try {
        const response = await fetcher("/api/auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: emailRef.current.value,
            password: passwordRef.current.value,
          }),
        })
        mutate({ user: response.user }, false)
        toast.success("You have been logged in.")
      } catch (e) {
        toast.error("Incorrect email or password.")
      } finally {
        setIsLoading(false)
      }
    },
    [mutate]
  )

  return (
    <Container>
      <div>
        <h1>Login to App</h1>
        <form onSubmit={onSubmit}>
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
            autoComplete="current-password"
            placeholder="Password"
            aria-label="Password"
            size="large"
            required
          />
          <Button type="success" size="large" loading={isLoading}>
            Log in
          </Button>
        </form>
      </div>
      <div>
        <Link href="/sign-up" passHref>
          <Link color="link" variant="highlight">
            Don&apos;t have an account? Sign Up
          </Link>
        </Link>
      </div>
    </Container>
  )
}

export default Login
