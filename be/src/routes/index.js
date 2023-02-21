const { Router } = require('express')
const userRouter = require('./users')
const v1Router = Router()


v1Router.use('/auth', userRouter)

module.exports=v1Router