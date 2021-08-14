const express = require('express')
const User = require('../models/user')
const router = express.Router()
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')
const jwt = require('jsonwebtoken')
const UserDetail = require('../models/details')




router.post('/users', async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        const detail = new UserDetail({ join: true, owner: user._id })
        await detail.save()
        const {authToken, refreshToken} = await user.generateAuthToken()
        res.status(201).send({user, authToken, refreshToken})
    } catch(e) {
        res.status(400).send(e)
    }
    
})


router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        // const authToken = await user.generateToken()
        const {authToken, refreshToken} = await user.generateAuthToken()
        res.send({ user, authToken, refreshToken })
    } catch(e) {
        res.status(400).send()
    } 
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.authToken !== req.authToken
        })

        await req.user.save()

        res.send()
    } catch(e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req,res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch(e) {
        res.status(500).send()
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch(error) {
        res.status(400).send(error)
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
        
    } catch(error) {
        res.status(500).send()
    }
})

router.get('/users', async (req, res) => {
    try {
        const users = await User.find()
        const myusers = JSON.parse(JSON.stringify(users))
        for(let i=0;i<users.length;i++) {
            await users[i].populate('details').execPopulate()
            myusers[i].details = users[i].details[0]
        }
        res.send(myusers)
    } catch(e) {
        res.status(500).send(e)
    }
})


router.get('/users/status', auth, async (req, res) => {
    try {
        res.send()
    } catch(e) {
        res.status(401).send(e)
    }
})
router.get('/users/profile/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const user = await User.findOne({_id})
        if(!user) {
            res.status(404).send({"error": "User not found"})
        }
        const myuser = JSON.parse(JSON.stringify(user))
        await user.populate('details').execPopulate()
        myuser.details = user.details
        
        res.send(myuser)
    } catch(e) {
        res.status(500).send(e)
    }
})


router.get('/users/refreshToken', async(req, res) => {
    try {
        const rt = req.header('refreshToken')
        const decoded =  await jwt.verify(rt, process.env.JWT_SECRET)
        const user = await User.findOne({_id: decoded._id, 'tokens.refreshToken': rt})
        user.tokens = user.tokens.filter((token) => {
            return token.refreshToken !== rt
        })
        const {authToken, refreshToken} = await user.generateAuthToken()
        await user.save()
        res.send({authToken, refreshToken})
    } catch(e) {
        res.status(400).send(e)
    }
})



module.exports = router