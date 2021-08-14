const mongoose = require('mongoose')

const detailsSchema = new mongoose.Schema({
    uname: {
        type: String,
        trim: true
    },
    uc: {
        type: String
    },
    degrees: {
        type: String
    },
    foi: {
        type: String
    },
    skills: {
        type: String
    },
    workedAt: {
        type: String
    },
    currentPosition: {
        type: String
    },
    instagram: {
        type: String
    },
    linkedin: {
        type: String
    },
    github: {
        type: String
    },
    facebook: {
        type: String
    },
    bio: {
        type: String
    },
    gender: {
        type: String
    },
    join: {
        type: Boolean
    },
    avatar: {
        type: Buffer
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }

})


const UserDetail = mongoose.model('UserDetail', detailsSchema)

module.exports = UserDetail