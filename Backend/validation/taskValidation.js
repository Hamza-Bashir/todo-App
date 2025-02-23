const joi = require("joi")

const taskSchema = joi.object({
  title:joi.string().required().messages({
    "string.empty":"Title must be required"
  }),
  description:joi.string().required().messages({
    "string.empty":"Description must be required"
  })
})

module.exports = taskSchema