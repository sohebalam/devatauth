import User from "../models/userModel"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const social = async (req, res) => {
  const { googleId, email, givenName, familyName } = req.body.result

  // console.log(email, firstName, lastName)

  try {
    const oldUser = await User.findOne({ email })

    if (oldUser) {
      const token = jwt.sign(
        { email: oldUser.email, id: oldUser._id, name: oldUser.name },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      )
      return res.status(200).json({
        token,
        user: {
          email: email,
          id: oldUser.socialId,
          name: oldUser.name,
        },
      })
    }
    const result = await User.create({
      socialId: googleId,
      email,
      name: `${givenName} ${familyName}`,
      password: "",
    })

    const token = jwt.sign(
      { email: result.email, id: result._id, name: result.name },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    )

    // res.status(201).json({ token })
    res.status(200).json({
      token,
      user: {
        email: email,
        id: result.socialId,
        name: result.name,
      },
    })
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" })

    console.log(error)
  }
}

export const signin = async (req, res) => {
  const { email, password } = req.body

  // console.log(email, password)

  try {
    const oldUser = await User.findOne({ email })

    // console.log(oldUser)

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" })

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password)
    // console.log(isPasswordCorrect)

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" })

    const token = jwt.sign(
      { email: oldUser.email, id: oldUser._id, name: oldUser.name },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    )
    // const user = { email: oldUser.email, id: JSON.stringify(oldUser._id) }

    // const { email, id } = user

    res.status(200).json({
      token,
      user: {
        email: oldUser.email,
        id: JSON.stringify(oldUser._id),
        name: oldUser.name,
      },
    })
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" })
  }
}
export const signup = async (req, res) => {
  console.log(req.method)
  const { email, password, firstName, lastName } = req.body

  console.log(email, password, firstName, lastName)

  try {
    const oldUser = await User.findOne({ email })

    if (oldUser) return res.status(400).json({ message: "User already exists" })

    const hashedPassword = await bcrypt.hash(password, 12)

    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    })

    const token = jwt.sign(
      { email: result.email, id: result._id, name: result.name },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    )

    res
      .status(201)
      .json({
        user: { email: result.email, id: result._id, name: result.name },
        token,
      })
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" })

    console.log(error)
  }
}
// export default async (req,res)=>{
//   const {email,password} = req.body
//   try{
//      if(!email || !password){
//        return res.status(422).json({error:"please ass all the fields"})
//      }
//    const user = await User.findOne({email})
//    if(!user){
//        return res.status(404).json({error:"user dont exists with that email"})
//    }
//      const doMatch =  await bcrypt.compare(password,user.password)
//      if(doMatch){
//         const token =  jwt.sign({userId:user._id},process.env.JWT_SECRET,{
//              expiresIn:"7d"
//          })
//          const {name,role,email} = user
//          res.status(201).json({token,user:{name,role,email}})
//      }else{
//         return res.status(401).json({error:"email or password dont match"})
//      }
//   }catch(err){
//       console.log(err)
//   }
// }
