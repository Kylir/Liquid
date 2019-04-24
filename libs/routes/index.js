const express = require('express')
const { findAllReposStatus } = require('../mercurial')
const repositories = require('../../data/repositories.json')

let router = express.Router()

router.get('/', (req, res) => {
    findAllReposStatus(repositories).then( status => {
        res.json(status)
    }).catch( err => {
        res.status(500).json({'status':'error', 'err': JSON.stringify(err)})
    })
})

module.exports = router