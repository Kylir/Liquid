
const util = require('util')
const exec = util.promisify(require('child_process').exec)

// All the hg commands we have
const hgCommands = {
  'in': 'hg in -q --template "{branch}: {desc}<br>"',
  'out': 'hg out -q --template "{branch}: {desc}<br>"',
  'status': 'hg status -m -a',
  'branch': 'hg branch'
}

/**
 * Extract status for a given repo.
 * Uses global constant `hgCommands` for mercurial commands.
 * 
 * @param {Object} repo the repo object with a name and a path
 * @returns {Object} status object with the name, boolean for incoming, boolean for outgoing,
 * boolean for local changes, branch name
 */
async function findRepoStatus (repo) {
  let incomings = await executeCommand(hgCommands['in'], repo.path)
  // split the commit and remove the last which is always an empty string.
  incomings = incomings.split('<br>')
  incomings.pop()
  
  let outgoings = await executeCommand(hgCommands['out'], repo.path)
  // split the commit and remove the last which is always an empty string.
  outgoings = outgoings.split('<br>')
  outgoings.pop()
  
  let uncommited = await executeCommand(hgCommands['status'], repo.path)
  uncommited = uncommited.split('\n')
  uncommited.pop()

  console.log(uncommited)

  const branch = await executeCommand(hgCommands['branch'], repo.path)

  return {name: repo.name, incomings, outgoings, uncommited, currentBranch: branch}
}

/**
 * Retrieves the status for all the given repos
 * @param {Array} repos All the repos we want to scan 
 */
async function findAllReposStatus (repos) {
  return await Promise.all(repos.map(async repo => {
    return await findRepoStatus (repo)
  }))
}

/**
 * Execute a mercurial command and return the result string or empty string if the command fails.
 * @param {string} command the hg command to execute 
 * @param {string} path the path of the repository
 */
async function executeCommand (command, path) {
  let stdout
  try {
    const ret = await exec(command, {cwd: path})
    stdout = ret.stdout
  } catch (err) {
    stdout = err.stdout
  }
  return stdout
}

module.exports = { findAllReposStatus }
