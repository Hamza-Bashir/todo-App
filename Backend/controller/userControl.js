const user = require("../model/userModel")
const {signValid, loginValid} = require("../validation/authValidation")

const bcrypt = require("bcrypt")

const jwt = require("jsonwebtoken")


const signIn = async (req,res)=>{
  try {
    
    const {name,email,password} = req.body

    const {error} = signValid.validate(req.body)

    if(error){
      return res.status(400).json({
        error:error.details[0].message
      })
    }

    const existingUser = await user.findOne({email})

    if(existingUser){
      return res.status(400).json({
        message:"User already exist",
        success:false
      })
    }

    const hashPass = await bcrypt.hash(password, 10)

    const newUser = await user({
      name,
      email,
      password:hashPass
    })
    await newUser.save()
    res.status(200).json({
      message:"User register successfully",
      newUser
    })
  } catch (error) {
    res.status(500).json({
      error:error.message
    })
  }
}

const login = async (req,res)=>{
  try {
    const {email, password} = req.body
    const {error} = loginValid.validate(req.body)
    if(error){
      return res.status(400).json({
        error:error.details[0].message
      })
    }
    const existingUser = await user.findOne({email})

    if(!existingUser){
      return res.status(400).json({
        message:"User not exist",
        success:false
      })
    }

    const isPass = await bcrypt.compare(password, existingUser.password)

    if(!isPass){
      return res.status(400).json({
        message:"Password not corrected",
        success:false
      })
    }

    const token = jwt.sign({_id:existingUser._id}, process.env.jwt_key)

    res.status(200).json({
      message:"Login sucessfully",
      token
    })

  } catch (error) {
    res.status(500).json({
      error:error.message
    })
  }
}

module.exports = {signIn, login}