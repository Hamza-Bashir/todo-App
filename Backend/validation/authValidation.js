const joi = require("joi")

const signValid = joi.object({
  name:joi.string().min(3).max(20).required().messages({
    "string.empty":"Name is required",
    "string.min":'Name must be at least 3 character',
    'string.max':"Name must be less than 20 character"
  }),
  email:joi.string().email().required().messages({
    "string.empty":"Email is required",
    "string.email":"Please enter valid email",
  }),
  password:joi.string().min(5).max(15).required().messages({
    "string.empty":"Password is required",
    "string.min":"Password must be at least 5 character",
    "string.max":"Password must be less than 15 character"
  })
})

const loginValid = joi.object({
  email:joi.string().email().required().messages({
    "string.empty":"Email is required",
    "string.email":"Please enter valid email",
  }),
  password:joi.string().min(5).max(15).required().messages({
    "string.empty":"Password is required",
    "string.min":"Password must be at least 5 character",
    "string.max":"Password must be less than 15 character"
  })
})

module.exports = {signValid, loginValid}