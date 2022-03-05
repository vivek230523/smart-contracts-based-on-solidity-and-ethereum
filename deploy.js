// deploy code will go here
//truffle/hdwallet-provider is now our new wallet provider which helps us connect infura-API to the web3 while
//simultaneously unlocking(our) account for us and in this we have to specify what network we want to connect to(infura)
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  //acount mneumonic helps us to derive the public key and the private key that is we can get total access
  //to our account through this hdwalletprovider
  'input beef hobby never feed torch lesson network embody brown axis lady',//account mneumonic
  'https://rinkeby.infura.io/v3/0c0747f2c9304ed8b179cf65a1d8ee1c' //link of the network we want to connect too
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hi there!'] })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};
deploy();//we created this function so as to be able to use async await syntax
