const ref = require('./firebase')
 
const service = {};
service.create = create;
service.list = list;
service.update = update;
service.getById = getById;
service.delete = _delete;
service.addGroup = addGroup;
 
module.exports = service;
 
function create(param) {
    const {authId, name, birthYear, description, zipCode} = param.body
    const userRef = ref.child('users')
    let output
 
    output = userRef.push({
        authId,
        name,  
        birthYear,      
        description,
        zipCode,
        groups: [],
        events: []
    }).key
 
    output ? console.log('User created: ' + output) : console.log('It was not possible to create a user')
 
    return output
}
 
async function list() {
    const userRef = ref.child('users')
    let output = await (await userRef.get()).val()
 
    output ? console.log('Users listed') : console.log('It was not possible to list users')
 
    return output
}
 
function update(param) {
    const userId = param.params._id
    const {description, zipCode} = param.body
    const userRef = ref.child(`users/${userId}`)
    let output
 
    output = userRef.update({
        description,
        zipCode,
    })
 
    output ? console.log('User updated: ' + userId) : console.log('It was not possible to update the user')
 
    return output
}
 
async function getById(param) {
    const userId = param.params._id
    const userRef = ref.child(`users/${userId}`)
 
    let output = await (await userRef.get()).val()
 
    output ? console.log('Got user ' + userId) : console.log('It was not possible to get user ' + userId)
 
    return output
}
 
function _delete(param) {
    const userId = param.params._id
    const userRef = ref.child(`users/${userId}`)
    let output = false
 
    userRef.remove()
 
    userRef.once('value', snapshot => {
        if(snapshot.exists()) {
            console.log('It was not possible to remove the user')
        }
        else {
            output = true 
            console.log('User removed: ' + userId)
        }
    }) 
 
    return output
}
 
async function addGroup(param) {
    const userId = param.params._id    
    const {groupId: newGroupId} = param.body
    const userRef = ref.child(`users/${userId}`)
    const {groups} =  await (await userRef.get()).val()
    let oldGroups = groups ? groups : [] 
 
    let output
    output = userRef.update({
        "groups": [...oldGroups, newGroupId]       
    })
 
    output ? console.log('New group added to user ' + userId) : console.log('It was not possible to add a group to user')
 
    return output
}
