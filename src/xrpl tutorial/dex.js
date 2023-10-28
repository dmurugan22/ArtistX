const xrpl = require('xrpl')
const BigNumber = require('bignumber.js')

// Wrap code in an async function so we can use await
async function main() {

    // Define the network client
    const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233")
    await client.connect()

    // ... custom code goes here

    // Disconnect when done (If you omit this, Node.js won't end the process)
    await client.disconnect()
}

main()