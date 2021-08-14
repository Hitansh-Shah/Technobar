const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../src/models/user')

const user1Id = new mongoose.Types.ObjectId()
const user1 = {
    _id: user1Id,
    name: 'demo1',
    email: 'demo@example.com',
    password: 'demoPass',
    tokens: [{
        token: jwt.sign({ _id: user1Id}, process.env.JWT_SECRET)
    }]
}

const user2Id = new mongoose.Types.ObjectId()
const user2 = {
    _id: user2Id,
    name: 'demo2',
    email: 'demo2@example.com',
    password: 'Abcd@123',
    tokens: [{
        token: jwt.sign({ _id: user2Id}, process.env.JWT_SECRET)
    }]
}


const setupTestDatabase = async () => {
    await User.deleteMany()
    await new User(user1).save()
    await new User(user2).save()
}

module.exports = {
    user1,
    user1Id,
    user2,
    user2Id,
    setupTestDatabase
}