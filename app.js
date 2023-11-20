const Web3 = require('web3');
const fs = require('fs');
const path = require('path');

// Load the compiled contract ABI and bytecode
const contractPath = path.resolve(__dirname, 'build', 'contracts', 'Insurance.json');
const contractData = JSON.parse(fs.readFileSync(contractPath, 'utf8'));
const abi = contractData.abi;
const bytecode = contractData.bytecode;

// Connect to the local Ethereum node (Ganache in this case)
const web30 = new Web3.Web3(Web3.givenProvider || 'http://127.0.0.1:7545');
// const web3 = new Web3('http://127.0.0.1:7545');

// Replace these values with your actual contract address and private key
const contractAddress = '0x8EF9d3EcbBAc422Adf534Dfcde1fF95817067fE6';
const privateKey = '0xa35beab2a7f11a21492aebc16882534252fe5f6d1fb5b8b8e6d9910d5ef98504';

// Create a new web3 contract instance
const insuranceContract = new web30.eth.Contract(abi, contractAddress);

// Example functions to interact with the smart contract
async function purchasePolicy(premiumInEther) {
    const premiumInWei = web30.utils.toWei(premiumInEther.toString(), 'ether');
  const accounts = await web30.eth.getAccounts();
  const transaction = insuranceContract.methods.purchasePolicy(premiumInWei);
  const gas = await transaction.estimateGas({ from: accounts[0] });
  const result = await transaction.send({ from: accounts[0], gas });
  console.log('Purchase Policy Transaction Hash:', result.transactionHash);
}

async function fileClaim(amountInEther) {
    const amountInWei = web30.utils.toWei(amountInEther.toString(), 'ether');
  const accounts = await web30.eth.getAccounts();
  const transaction = insuranceContract.methods.fileClaim(amountInWei);
  const gas = await transaction.estimateGas({ from: accounts[0] });
  const result = await transaction.send({ from: accounts[0], gas });
  console.log('File Claim Transaction Hash:', result.transactionHash);
}

// Add more functions as needed to interact with your smart contract

// Example usage
async function main() {
  try {
    await purchasePolicy(0.1); // Example premium amount
    await fileClaim(0.05); // Example claim amount
    // Call other functions as needed
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();
