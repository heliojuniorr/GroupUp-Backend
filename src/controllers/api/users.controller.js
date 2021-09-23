const express = require("express")
const router = express.Router()
const usersService = require("../../services/users.service")
 
router.post('/', createUser)
router.get('/', listUsers)
router.put('/:_id', updateUser)
router.get('/:_id', getUserById)
router.delete('/:_id', deleteUser)
router.put('/groups/:_id', addGroup)
 
module.exports = router
 
function createUser(request, response) {
    let output
    output = usersService.create(request)
    return output ? response.status(201).send() : response.status(500).send()
}
 
async function listUsers(request, response) {
    let output = await usersService.list()
    return response.json(output)
}
 
function updateUser(request, response) {
    let output = false
    output = usersService.update(request)
    return output ? response.status(201).send() : response.status(500).send()
}
 
async function getUserById(request, response) {    
    let output = await usersService.getById(request)
    return response.json(output)
}
 
function deleteUser(request, response) {
    let output = false
    output = usersService.delete(request)
    return output ? response.status(201).send() : response.status(500).send()
}
 
function addGroup(request, response) {
    let output
    output = usersService.addGroup(request)
    return output ? response.status(201).send() : response.status(500).send()
}
