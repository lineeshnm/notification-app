const express = require('express')
const Notification = require('../models/notofication')
const auth = require('../middleware/auth')
const router = new express.Router()

// router.post('/notifications', auth, async (req, res) => {
router.post('/notifications', async (req, res) => {
    // console.log(req.body)
    const notification = new Notification({
        ...req.body,
        // owner: req.user._id
    })
    try {
        await notification.save()
        res.status(201).send(notification)
    } catch (e) {
        res.status(400).send(e)
    }
})

// router.get('/notifications', auth, async (req, res) => {
router.get('/notifications', async (req, res) => {
    const match = {}
    const sort = {}
    // console.log(req)

    // if (req.query.completed) {
    //     match.completed = req.query.completed === 'true'
    // }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }
    // console.log(req.user)
    try {
        const notifications = await Notification.find({})
        res.send(notifications)
    } catch (e) {
        res.status(500).send()
    }
})

// router.get('/notifications/:id', auth, async (req, res) => {
router.get('/notifications/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const notification = await Notification.findOne({_id})
        // const notification = await Notification.findOne({_id, owner: req.user._id})
        if (!notification) {
            return res.status(404).send()
        }
        res.send(notification)
    } catch (e) {
        res.status(500).send()
    }
})

// router.patch('/notifications/:id', auth, async (req, res) => {
router.patch('/notifications/:id', async (req, res) => {
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['notification_type', 'message', 'status']
    const isValidOperaton = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperaton) {
        return res.status(400).send({error: 'Invalid field to update!'})
    }
    try {
        // Legacy way to support middleware
        const notification = await Notification.findOne({_id})
        // const notification = await Notification.findOne({_id, owner: req.user._id})
        // const task = await Task.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true})
        if(!notification) {
            return res.status(404).send()
        }
        updates.forEach((update) => notification[update] = req.body[update])
        await notification.save()
        res.send(notification)
    } catch (e) {
        res.status(400).send(e)
    }
})

// router.delete('/notifications/:id',auth,  async (req, res) => {
router.delete('/notifications/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const notification = await Notification.findOneAndDelete({_id})
        // const notification = await Notification.findOneAndDelete({_id, owner: req.user._id})
        if (!notification) {
            return res.status(404).send()
        }
        res.send(notification)
    } catch (e) {
        res.status(500).send()
    }
})


module.exports = router