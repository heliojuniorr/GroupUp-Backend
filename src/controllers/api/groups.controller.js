const express = require("express")
const router = express.Router()
const groupsService = require("../../services/groups.service")

router.post('/', createGroup)
router.get('/', listGroups)
router.put('/:_id', updateGroup)
router.get('/:_id', getGroupById)
router.delete('/:_id', deleteGroup)
router.put('/members/:_id', addGroupMembers)
router.delete('/members/:_id', removeGroupMember)

module.exports = router

function createGroup(request, response) {
    let output
    output = groupsService.create(request)
    return output ? response.status(201).send() : response.status(500).send()
}

async function listGroups(request, response) {
    let output = await groupsService.list()
    return response.json(output)
}

function updateGroup(request, response) {
    let output = false
    output = groupsService.update(request)
    return output ? response.status(201).send() : response.status(500).send()
}

async function getGroupById(request, response) {    
    let output = await groupsService.getById(request)
    return response.json(output)
}

function deleteGroup(request, response) {
    let output = false
    output = groupsService.delete(request)
    return output ? response.status(201).send() : response.status(500).send()
}

function addGroupMembers(request, response) {
    let output
    output = groupsService.addMember(request)
    return output ? response.status(201).send() : response.status(500).send()
}

function removeGroupMember(request, response) {
    let output
    output = groupsService.removeMember(request)
    return output ? response.status(201).send() : response.status(500).send()
}