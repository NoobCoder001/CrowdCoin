//setup an instance of web3 (different from previous projects)
import Web3 from 'web3'; 

let web3; 

if (typeof window !== 'undefined' && window.web3 !== 'undefined') {  //our code is executed in the browser and metamask is present
  //we are in browser and metamask is running 
  web3 = new Web3(window.web3.currentProvider);   
} else { 
  //we are on the server *OR* the user is not running metamask 
  const provider = new Web3.providers.HttpProvider(  
    'https://rinkeby.infura.io/v3/e7d7d49203444f32bc0a222f03602ff6'
  ); 

  web3 = new Web3(provider);
}

export default web3;

