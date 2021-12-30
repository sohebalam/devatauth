import { passport } from "../../lib/auth"
import { auths, database } from "../../middlewares"
import { ncOpts } from "../../lib/nc"
import nc from "next-connect"

const handler = nc(ncOpts)

handler.use(database, ...auths)

handler.post(passport.authenticate("local"), (req, res) => {
  res.json({ user: req.user })
})

handler.delete(async (req, res) => {
  await req.session.destroy()
  res.status(204).end()
})

export default handler
