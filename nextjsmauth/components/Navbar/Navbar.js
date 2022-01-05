import React, { useState, useEffect } from "react"
import { AppBar, Typography, Toolbar, Avatar, Button } from "@material-ui/core"
// import { Link, useHistory, useLocation } from 'react-router-dom';
import Link from "next/link"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import decode from "jwt-decode"
// import memories from "../../images/memories.png"
import * as actionType from "../../redux/constants/actionTypes"
import useStyles from "./styles"
import { parseCookies, destroyCookie } from "nookies"

const Navbar = () => {
  const cookieuser = parseCookies()
  // const [toggle, setToggle] = useState(false)
  const user = cookieuser.user ? JSON.parse(cookieuser.user) : ""

  // if (user) () => router.reload()

  const dispatch = useDispatch()
  // const location = useLocation()
  // const history = useHistory()
  const classes = useStyles()
  const router = useRouter()

  const logout = () => {
    dispatch({ type: actionType.LOGOUT })

    destroyCookie(null, "token")
    destroyCookie(null, "user")

    router.push("/login")

    // setUser(null)
  }

  useEffect(() => {
    // ;() => setToggle(!toggle)
  }, [cookieuser, user])

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        {/* <Typography
          component={Link}
          href="/"
          className={classes.heading}
          variant="h2"
          align="center"
        > */}
        Memories
        {/* </Typography> */}
        {/* <img className={classes.image} src={memories} alt="icon" height="60" /> */}
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user?.email}
              src={user?.imageUrl}
            >
              {/* {user?.name.charAt(0)} */}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user?.name || user?.email}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Link href="/login">
            <Button
              // component={Link}
              // href="/auth"
              variant="contained"
              color="primary"
            >
              Sign In
            </Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
