import { Avatar } from "@material-ui/core"
import { Container } from "@material-ui/core"
import styles from "./UserHeader.module.css"

const UserHeader = ({ user }) => {
  return (
    <Container className={styles.root} alignItems="center">
      <div className={styles.avatar}>
        <Avatar size={168} username={user.username} url={user.profilePicture} />
      </div>
      <h1>
        <div className={styles.name}>{user.name}</div>
        <div className={styles.username}>@{user.username}</div>
      </h1>
      <p className={styles.bio}>{user.bio}</p>
    </Container>
  )
}

export default UserHeader
