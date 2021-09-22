const ref = require('./firebase')

const service = {};
service.create = create;
service.list = list;
service.update = update;
service.getById = getById;
service.delete = _delete;

module.exports = service;

function create(param) {
    const {name, authorId, description, zipCode} = param.body
    const groupRef = ref.child('groups')
    let output

    output = groupRef.push({
        name,
        authorId,
        description,
        zipCode,
        members: [authorId]
    }).key

    output ? console.log('Group created: ' + output) : console.log('It was not possible to create a group')

    return output
}

async function list() {
    const groupRef = ref.child('groups')
    let output = await (await groupRef.get()).val()

    output ? console.log('Groups listed') : console.log('It was not possible to list groups')

    return output
}

function update(param) {
    const groupId = param.params._id
    const {name, description, zipCode} = param.body
    const groupRef = ref.child(`groups/${groupId}`)
    let output

    output = groupRef.update({
        name,
        description,
        zipCode,
    })

    output ? console.log('Group updated: ' + groupId) : console.log('It was not possible to update the group')

    return output
}

async function getById(param) {
    const groupId = param.params._id
    const groupRef = ref.child(`groups/${groupId}`)

    let output = await (await groupRef.get()).val()

    output ? console.log('Got group ' + groupId) : console.log('It was not possible to get group ' + groupId)

    return output
}

function _delete(param) {
    const groupId = param.params._id
    const groupRef = ref.child(`groups/${groupId}`)
    let output = false

    groupRef.remove()

    groupRef.once('value', snapshot => {
        if(snapshot.exists()) {
            console.log('It was not possible to remove the group')
        }
        else {
            output = true 
            console.log('Group removed: ' + groupId)
        }
    }) 

    return output
}