import Head from "next/head"
// import Header from "../../components/layout/Header"
// import styles from "../styles/Home.module.css"
import { getSession, signIn, useSession, getProviders } from "next-auth/react"
import {
  GoogleLoginButton,
  GithubLoginButton,
  TwitterLoginButton,
  LinkedInLoginButton,
} from "react-social-login-buttons"
import {
  Avatar,
  Button,
  Container,
  Grid,
  Typography,
  CssBaseline,
  makeStyles,
  TextField,
} from "@material-ui/core"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined"
import Link from "next/link"
import TwitterIcon from "@material-ui/icons/Twitter"
import { useState } from "react"
import { useRouter } from "next/router"
import { Alert } from "@material-ui/lab"

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

function Login({ session, providers }) {
  console.log(session, providers)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  // const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  // console.log(session, providers)

  const classes = useStyles()

  if (session) {
    const { user } = session
    const dbUser = {}

    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      password: null,
    }
    // console.log(userData)
  }

  const submitHandler = () => {}

  return (
    <Container component="main" maxWidth="md">
      <Grid container>
        <Grid item sm={5}>
          {/* <Container
            // component="main"
            
            // style={{ marginLeft: "3rem" }}
          > */}
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            {/* {error && <Alert severity="error">{error}</Alert>} */}
            {error && <Alert severity="error">{error}</Alert>}
            <form className={classes.form} noValidate onSubmit={submitHandler}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              {/* {loading && <CircularProgress />} */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/user/forgot" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href={`/user/register`} variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          {/* </Container> */}
        </Grid>
        <Grid item sm={1}></Grid>

        <Grid item xs={5}>
          {/* <Container maxWidth="xs"> */}
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <TwitterIcon />
            </Avatar>
            <Typography
              component="h1"
              variant="h5"
              style={{ marginBottom: "1rem" }}
            >
              Social Login
            </Typography>
            {/* <FacebookLoginButton onClick={() => signIn("facebook")} /> */}
            <GoogleLoginButton onClick={() => signIn("google")} />
            <TwitterLoginButton onClick={() => signIn("twitter")} />
            <LinkedInLoginButton onClick={() => signIn("linkedin")} />
            <GithubLoginButton onClick={() => signIn("github")} />
          </div>
          {/* </Container> */}
        </Grid>
      </Grid>
    </Container>
  )
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx)
  const providers = await getProviders(ctx)

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }
  return {
    props: { session: session, providers: providers },
  }
}

export default Login
