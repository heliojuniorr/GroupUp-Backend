const express = require("express")
const router = express.Router()
const eventsService = require("../../services/events.service")

router.post('/', createEvent)
router.get('/', listEvents)
router.put('/:_id', updateEvent)
router.get('/:_id', getEvent)
router.delete('/:_id', deleteEvent)

module.exports = router

function createEvent(request, response) {
    let output
    output = eventsService.create(request)
    return output ? response.status(201).send() : response.status(500).send()
}

async function listEvents(request, response) {
    let output = await eventsService.list()
    return response.json(output)
}

function updateEvent(request, response) {
    let output = false
    output = eventsService.update(request)
    return output ? response.status(201).send() : response.status(500).send()
}

async function getEvent(request, response) {
    let output = await eventsService.getById(request)
    return response.json(output)
}

function deleteEvent(request, response) {
    let output = false
    output = eventsService.delete(request)
    return output ? response.status(201).send() : response.status(500).send()
}