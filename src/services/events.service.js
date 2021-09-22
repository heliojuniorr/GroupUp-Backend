const ref = require('./firebase')

const service = {};
service.create = create;
service.list = list;
service.update = update;
service.getById = getById;
service.delete = _delete;

module.exports = service;

function create(param) {
    const {name, authorId, description, address, limit, cost} = param.body
    const eventRef = ref.child('events')
    let output

    output = eventRef.push({
        name,
        authorId,
        description,
        address,
        limit,
        cost,
        members: [authorId]
    }).key

    output ? console.log('Event created: ' + output) : console.log('It was not possible to create a event')

    return output
}

async function list() {
    const eventRef = ref.child('events')
    let output = await (await eventRef.get()).val()

    output ? console.log('Events listed') : console.log('It was not possible to list events')

    return output
}

function update(param) {
    const eventId = param.params._id
    const {name, description, address, limit, cost} = param.body
    const eventRef = ref.child(`events/${eventId}`)
    let output

    output = eventRef.update({
        name,
        description,
        address,
        limit,
        cost
    })

    output ? console.log('Event updated: ' + eventId) : console.log('It was not possible to update the event')

    return output
}

async function getById(param) {
    const eventId = param.params._id
    const eventRef = ref.child(`events/${eventId}`)

    let output = await (await eventRef.get()).val()

    output ? console.log('Got event ' + eventId) : console.log('It was not possible to get event ' + eventId)

    return output
}

function _delete(param) {
    const eventId = param.params._id
    const eventRef = ref.child(`events/${eventId}`)
    let output = false

    eventRef.remove()

    eventRef.once('value', snapshot => {
        if(snapshot.exists()) {
            console.log('It was not possible to remove the event')
        }
        else {
            output = true 
            console.log('Event removed: ' + eventId)
        }
    }) 

    return output
}