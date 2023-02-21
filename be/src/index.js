require('dotenv').config()

const express = require('express')
require('express-async-errors')
const cors = require('cors')
const morgan = require('morgan')

const helmet = require('helmet')
const v1Router = require('./routes')
const logger = require('./utils/logger')
const connectToDB = require('./utils/db')

const errorMiddleware = require('./middleware/errorMiddleware')


const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(helmet())
app.use(morgan(process.env.NODE_ENV))
app.use('/v1', v1Router)

errorMiddleware(app)

connectToDB()
app.listen(PORT, () => logger.info(`server listening on port ${PORT}`))