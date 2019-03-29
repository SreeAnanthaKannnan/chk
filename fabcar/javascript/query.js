/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { FileSystemWallet, Gateway } = require('fabric-network');
const fs = require('fs');
const path = require('path');

const ccpPath = path.resolve(__dirname, '..', '..', 'basic-network', 'connection.json');
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);

 function queryrecord(fun,key) {
    return new Promise(async (resolve, reject) => {
    try {
         //var key="1"
        console.log(key,fun,"key");
        // Create a new file system based wallet for managing identities.
        // const walletPath = path.join(process.cwd(), 'wallet');
        const walletPath = "/home/rpqb-desk-001/fabric-samples/fabcar/javascript/wallet"
        const wallet = new FileSystemWallet(walletPath);
      
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('user1');
        if (!userExists) {
            console.log('An identity for the user "user1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'user1', discovery: { enabled: false } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('fabcar');

        // Evaluate the specified transaction.
        // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
        // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
        const result = await contract.evaluateTransaction(fun,key);
        console.log(`Transaction has been evaluated, result is: ${result}`);
        var record = await JSON.parse(result)
        return resolve(record);

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
})
}
 function queryallrecords() {
    return new Promise(async (resolve, reject) => {
    try {

        // Create a new file system based wallet for managing identities.
        // const walletPath = path.join(process.cwd(), 'wallet');
        const walletPath =  "/home/rpqb-desk-001/fabric-samples/fabcar/javascript/wallet"

        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('user1');
        if (!userExists) {
            console.log('An identity for the user "user1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'user1', discovery: { enabled: false } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('fabcar');

        // Evaluate the specified transaction.
        // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
        // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
        var result = await contract.evaluateTransaction('queryAllCars');
        console.log(`Transaction has been evaluated 1, result is: ${result.toString()}`);
        var record=JSON.stringify(result)
       console.log(result)
        return resolve({record})
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
})
}

// queryrecord();
// queryallrecords();
module.exports={
    queryrecord:queryrecord,
    queryallrecords:queryallrecords
}

