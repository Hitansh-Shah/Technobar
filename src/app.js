const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const userDetailRouter = require('./routers/details')
const cookieParser = require('cookie-parser')
const path = require('path')
const cors = require('cors')
const app = express()


app.use(express.static(path.join(__dirname, '../client/build')));
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use('/api', userRouter)
app.use('/api', userDetailRouter)


app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

module.exports = app