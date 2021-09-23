const express = require("express")

const app = express()

app.use(express.json())

app.use('/api/groups', require('./controllers/api/groups.controller'))  
app.use('/api/events', require('./controllers/api/events.controller'))
app.use('/api/users', require('./controllers/api/users.controller'))

app.listen(3333)

console.log('Application started')

console.log('Server running on localhost:3333')