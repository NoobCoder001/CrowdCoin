//setup an instance for our campaign factory contract 
import web3 from './web3';  
import CampaignFactory from './build/CampaignFactory.json'; 

const instance = new web3.eth.Contract( 
  JSON.parse(CampaignFactory.interface), 
  '0x0121dF871B92408beD643D5223588a8bfca60878'
); 

export default instance;