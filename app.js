const express = require('express')
const app = express()

require('dotenv').config()

const connectDB = require('./db/connection')
app.use(express.json())
const product = require('./router/product')
const notFoundMiddleware = require('./middleware/notFoundMiddleware')
const port = process.env.PORT || 3000
app.use('/products', product)
app.use(notFoundMiddleware)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is running at ${port}`))
    } catch (error) {
        console.log(error);
    }
}

start()