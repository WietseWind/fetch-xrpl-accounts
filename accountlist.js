const fs = require('fs')

process.stdout.write('\033c')

fs.readFile(__dirname + '/' + process.argv[2] + '_accounts.json', (err, data) => {
  if (err) {
    console.log('ERROR:')
    console.log('')
    console.log(err)
    console.log('')
    process.exit(1)
  }
  let accounts = JSON.parse(data)
  accounts.map(a => {
    return a.Account
  }).sort().forEach(a => {
    console.log(a)
  })
})
