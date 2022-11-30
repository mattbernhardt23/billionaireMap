const express = require('express')
const next = require('next')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()


app
    .prepare()
    .then(() => {
        // Connect to Database
        connectDB()

        const server = express()

        server.use(express.json())
        server.use(express.urlencoded({extended: false}))

        server.get('*', (req, res) => {
            return handle(req, res)
        })

        server.use('/api/users', require('./routes/userRoutes') )
        server.use('/api/billionaires', require('./routes/billionaireRoutes') )
        server.use(errorHandler)

        server.listen(PORT, () => console.log(`Server listening on ${PORT}`))       
    })
    .catch(ex => {
        conosle.error(ex.stack);
        process.exit(1)
    })





