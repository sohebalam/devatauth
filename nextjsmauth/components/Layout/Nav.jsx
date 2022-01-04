import { Button, Avatar, Container } from "@material-ui/core"

import { fetcher } from "../../lib/fetch"
import { useCurrentUser } from "../../lib/user"
import Link from "next/link"
import { useRouter } from "next/router"
import { useCallback, useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"

import styles from "./Nav.module.css"

// return (
//   <div className={styles.user}>
//     <button
//       className={styles.trigger}
//       ref={avatarRef}
//       onClick={() => setVisible(!visible)}
//     >
//       {/* <Avatar size={32} username={user.username} url={user.profilePicture} /> */}
//     </button>
//     <div
//       ref={menuRef}
//       role="menu"
//       aria-hidden={visible}
//       className={styles.popover}
//     >
//       {visible && (
//         <div className={styles.menu}>
//           <Link passHref href={`/user/${user.username}`}>
//             <a className={styles.item}>Profile</a>
//           </Link>
//           <Link passHref href="/settings">
//             <a className={styles.item}>Settngs</a>
//           </Link>
//           <div className={styles.item} style={{ cursor: "auto" }}>
//             <Container alignItems="center">
//               <span>Theme</span>
//               <ThemeSwitcher />
//             </Container>
//           </div>
//
//         </div>
//       )}
//     </div>
//   </div>
// )

const Nav = () => {
  const menuRef = useRef()
  const avatarRef = useRef()

  const [visible, setVisible] = useState(false)

  const router = useRouter()
  useEffect(() => {
    const onRouteChangeComplete = () => setVisible(false)
    router.events.on("routeChangeComplete", onRouteChangeComplete)
    return () => router.events.off("routeChangeComplete", onRouteChangeComplete)
  })

  useEffect(() => {
    // detect outside click to close menu
    // const onMouseDown = (event) => {
    //   if (
    //     !menuRef.current.contains(event.target) &&
    //     !avatarRef.current.contains(event.target)
    //   ) {
    //     setVisible(false)
    //   }
    // }
    // document.addEventListener("mousedown", onMouseDown)
    // return () => {
    //   document.removeEventListener("mousedown", onMouseDown)
    // }
  }, [])
  const { data: { user } = {}, mutate } = useCurrentUser()

  const onSignOut = useCallback(async () => {
    try {
      await fetcher("/api/auth", {
        method: "DELETE",
      })
      toast.success("You have been signed out")
      mutate({ user: null })
    } catch (e) {
      toast.error(e.message)
    }
  }, [mutate])
  return (
    <nav className={styles.nav}>
      <Container>
        <Link href="/">
          <a>Next.js MongoDB App</a>
        </Link>
        <Container>
          {/* {user ? ( */}
          <>{/* <UserMenu user={user} mutate={mutate} /> */}</>
          {/* ) : ( */}
          <>
            <Button variant="outlined">
              <Link passHref href="/login">
                <Link size="small" type="success" variant="ghost" color="link">
                  Log in
                </Link>
              </Link>
            </Button>

            <Button variant="outlined">
              <Link passHref href="/sign-up">
                {/* <Button size="small" type="success"> */}
                Sign Up
                {/* </Button> */}
              </Link>
            </Button>
          </>
          {/* )} */}
          <button onClick={onSignOut}>Sign out</button>
        </Container>
      </Container>
    </nav>
  )
}

export default Nav
