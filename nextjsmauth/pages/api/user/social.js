import nc from "next-connect"
import connectDB from "../../../connectDB"

import onError from "../../../middlewares/errors"

import { social } from "../../../controllers/userCont"

const router = nc({ onError })

connectDB()

// console.log(req.method)

router.post(social)

export default router
