const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const userDetailRouter = require('./routers/details')
const cookieParser = require('cookie-parser')
const path = require('path')
const cors = require('cors')
const app = express()

// const buildPath = path.join(__dirname, '../client/build')
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use('/api', userRouter)
app.use('/api', userDetailRouter)

// app.use(express.static(buildPath))

// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
// })
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

module.exports = app