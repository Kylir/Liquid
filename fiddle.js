const hg = require('./libs/mercurial')
const repos = require('./data/repositories.json')

hg.findAllReposStatus(repos).then( status => {
    console.log(JSON.stringify(status))
})
