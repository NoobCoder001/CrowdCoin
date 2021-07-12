//setup an instance for our campaign factory contract 
import web3 from './web3';  
import CampaignFactory from './build/CampaignFactory.json'; 

const instance = new web3.eth.Contract( 
  JSON.parse(CampaignFactory.interface), 
  '0xdc68087B024B42f9831d2DB3e35473Ba8fFb50F1'
); 

export default instance;