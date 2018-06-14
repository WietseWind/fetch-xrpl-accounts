const RippleClient = require('rippled-ws-client')
const JSONStream = require('JSONStream')
const fs = require('fs')

process.stdout.write('\033c')

let transformStream = JSONStream.stringify('[', ', ', ']')

new RippleClient(typeof process.argv[3] === 'undefined' ? 'wss://s1.ripple.com' : process.argv[3]).then(connection => {
  const fetchAccounts = (atLedger) => {
    let filename = atLedger + '_accounts.json'
    let outputStream = fs.createWriteStream(__dirname + '/' + filename)
    transformStream.pipe(outputStream)
    outputStream.on('finish', () => {
      console.log('Done! Wrote JSON to:', __dirname + '/' + filename)
    })
    
    console.log('Fetching account data for ledger: ', atLedger)

    return new Promise((resolve, reject) => {
      let accounts = []  
      const fetchChunk = (atMarker) => {
        connection.send({ 
          command: 'ledger_data', 
          type: 'account',
          ledger_index: atLedger,
          marker: atMarker,
          limit: 100000
        }).then(response => {
          if (typeof response.marker !== 'undefined' && atMarker !== response.marker) {
            fetchChunk(response.marker)
          } else {
            transformStream.end()
            resolve(accounts)
          }
          if (typeof response.state !== 'undefined' && response.state !== null && response.state.length > 0) {
            response.state.forEach(a => {
              accounts.push(a)
              transformStream.write(a)
            })
          }
          process.stdout.write('> ' + accounts.length + "\r")
        })      
      }
      fetchChunk()
    })
  }

  fetchAccounts(typeof process.argv[2] === 'undefined' ? 'closed' : parseInt(process.argv[2])).then(accounts => {
    console.log('')
    console.log('Done, retrieved # accounts: ', accounts.length)
    connection.close()
  }).catch(console.log)

}).catch(e => {
  console.log('ERROR!')
  console.log('')
  console.log(e)
  console.log('')
})