const express = require('express')
const auth = require('../middleware/auth')
const router = express.Router()
const UserDetail = require('../models/details')
const multer = require('multer')
const sharp = require('sharp')


const upload = multer({
    limits: {
        fileSize: 10000000
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image file'))
        }
        cb(undefined, true)
    }
})

router.post('/users/me/details', auth, async (req, res) => {
    try {
        const detail = await UserDetail.findOne({owner: req.user._id})
        const updates = Object.keys(req.body)
        updates.forEach((update) => {
            detail[update] = req.body[update]
        })
        await detail.save()
        res.send(detail)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req,res) => {
    const detail = await UserDetail.findOne({owner: req.user._id})
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    detail.avatar = buffer
    await detail.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})

router.delete('/users/me/avatar', auth, async (req,res) => {
    const detail = await UserDetail.findOne({owner: req.user._id})
    detail.avatar = undefined
    await detail.save()
    res.send()
})

router.get('/users/me/details', auth, async(req,res) => {
    try {
        const detail = await UserDetail.findOne({owner: req.user._id})
        if(!detail) {
            res.status(500).send()
        }
        res.send(detail)
    } catch(e) {
        res.status(400).send(e)
    }
})


module.exports = router