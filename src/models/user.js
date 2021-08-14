const mongoose = require('mongoose')
const {default: validator} = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const UserDetail = require('./details')
const Blog = require('./blog')


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Email is invalid!!')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    tokens: [{
        authToken: {
            type: String,
            requried: true
        },
        refreshToken: {
            type: String,
            requried: true
        }
    }]
}, {
    timestamps: true
})

userSchema.virtual('details', {
    ref: 'UserDetail',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const authToken = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, {expiresIn: '24h'})
    const refreshToken = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, {expiresIn: '25h'})
    user.tokens = user.tokens.concat({ authToken, refreshToken })
    await user.save()

    return {authToken, refreshToken}

}




userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if(!user) {
        throw new Error('Invalid email')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        throw new Error('The credentials are invalid')
    }

    return user
}


//hash the password before saving
userSchema.pre('save', async function(next) {
    const user = this

    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

userSchema.pre('remove', async function (next) {
    const user = this
    await Blog.deleteMany({owner: user._id})
    await UserDetail.deleteOne({owner: user._id})

    next()
})



const User = mongoose.model('User', userSchema)

module.exports = User