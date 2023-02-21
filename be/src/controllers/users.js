const Joi = require('joi')
const UserModel = require('../models/user')
const { generateToken } = require('../utils/jwt')


const register = async (req, res) => {
    const schema = Joi.object({
        username: Joi.string().min(2).required(),
        password: Joi.string().required()
    })

    const { username, password } = await schema.validateAsync(req.body, {
        allowUnknown: true,
        stripUnknown: true
    })
    

    const existingUser = await UserModel.findOne({ username }).exec()
    if(existingUser) {
        res.status(401).json({error: 'duplicate username'})
        return
    }

    const user = new UserModel({ username, password })
    await user.hashPassword()
    await user.save()


    const token = generateToken({ id: user.id, username })
    res.status(201).json({ username, token })
}

const login = async (req, res) => {
    const { username, password } = req.body
    const user = await UserModel.findOne({ username }).exec()
    if(!user) {
        res.status(401).json({error: 'Invalid username or password'})
        return
    }
    if(!user.validatePassword(password)){
        res.status(401).json({error: 'Invalid username or password'})
        return
    }
   
    const token = generateToken({ id: user.id, username })
  
    res.json({ username, token })
}

module.exports = {
    register,
    login
}