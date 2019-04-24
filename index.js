const express = require('express')
const app = express()
const port = 3000

const routes = require('./libs/routes')

app.use(express.static('client'))

app.use('/api', routes)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))