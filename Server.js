const express = require('express');

const Web3 = require('web3');

const SlotMachineContract = require('./SlotMachineContract.json');

// Initialize Express app

const app = express();

app.use(express.json());

// Initialize Web3

const web3 = new Web3('<HEDERA_NETWORK_ENDPOINT>'); // Replace with the Hedera network endpoint

// Load the contract

const contractAddress = '<CONTRACT_ADDRESS>'; // Replace with the deployed contract address

const slotMachineContract = new web3.eth.Contract(SlotMachineContract.abi, contractAddress);

// API endpoint to retrieve odds

app.get('/odds', async (req, res) => {

  try {

    const odds = await slotMachineContract.methods.getOdds().call();

    res.json({ odds });

  } catch (error) {

    res.status(500).json({ error: 'Failed to retrieve odds' });

  }

});

// API endpoint to retrieve betting amount

app.get('/betting-amount', async (req, res) => {

  try {

    const bettingAmount = await slotMachineContract.methods.getBettingAmount().call();

    res.json({ bettingAmount });

  } catch (error) {

    res.status(500).json({ error: 'Failed to retrieve betting amount' });

  }

});

// API endpoint to set odds (requires contract owner)

app.post('/odds', async (req, res) => {

  const { newOdds } = req.body;

  try {

    // Perform the contract transaction to set odds

    const accounts = await web3.eth.getAccounts();

    await slotMachineContract.methods.setOdds(newOdds).send({ from: accounts[0] });

    res.json({ success: true });

  } catch (error) {

    res.status(500).json({ error: 'Failed to set odds' });

  }

});

// API endpoint to set betting amount (requires contract owner)

app.post('/betting-amount', async (req, res) => {

  const { newBettingAmount } = req.body;

  try {

    // Perform the contract transaction to set betting amount

    const accounts = await web3.eth.getAccounts();

    await slotMachineContract.methods.setBettingAmount(newBettingAmount).send({ from: accounts[0] });

    res.json({ success: true });

  } catch (error) {

    res.status(500).json({ error: 'Failed to set betting amount' });

  }

});

// Start the server

const port = 3000;

app.listen(port, () => {

  console.log(`Server is running on port ${port}`);

});

