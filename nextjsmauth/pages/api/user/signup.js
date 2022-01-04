import nc from "next-connect"
import connectDB from "../../../connectDB"

import onError from "../../../middlewares/errors"

import { signup } from "../../../controllers/userCont"

const router = nc({ onError })

connectDB()

// console.log(req.method)

router.post(signup)

export default router
