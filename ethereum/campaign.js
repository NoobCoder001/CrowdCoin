//setup an instance for our campaign contract 
import web3 from './web3';  
import Campaign from './build/Campaign.json'; 

//this function will generate a local copy/instance(JS only) of campaign (deployed on blockchain) when the address is provided
export default (address) => { 
    return new web3.eth.Contract( 
        JSON.parse(Campaign.interface), 
        address
    );
}
