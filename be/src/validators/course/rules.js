const Joi = require('joi')

const schema = Joi.object({
    name: Joi.string().min(2).required(),
    code: Joi.string().regex(/^[a-zA-Z]+[0-9]+$/).message('Invalid code format').required(),
    description: Joi.string()
})

const courseValidation = (validateInfo) => {
    return schema.validateAsync(validateInfo, {
        allowUnknown: true,
        stripUnknown: true
    })
}
module.exports = courseValidation
