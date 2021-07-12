//we are only gonna deploy the compiledFactoy.json file
const HDWalletProvider = require('truffle-hdwallet-provider'); 
const Web3 = require('web3');  
const compiledFactory = require('../ethereum/build/CampaignFactory.json'); 

const provider = new HDWalletProvider( 
    'never thunder razor velvet bird insect tackle cotton flat merit mirror fringe', 
    'https://rinkeby.infura.io/v3/e7d7d49203444f32bc0a222f03602ff6'
); 

const web3 = new Web3(provider); 

const deploy = async() => { 
    const accounts = await web3.eth.getAccounts(); 

    console.log('Attempting to deploy from account', accounts[0]); 

    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface)) 
    .deploy({ data: compiledFactory.bytecode }) 
    .send({gas: '4700000', from: accounts[0] }); 
      
    console.log('Contract deployed to', result.options.address);
}; 

deploy();